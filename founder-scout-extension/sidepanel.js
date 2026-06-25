const CANDIDATE_PATHS = [
  "/about",
  "/about-us",
  "/company",
  "/team",
  "/our-team",
  "/leadership",
  "/ueber-uns",
  "/uber-uns",
  "/impressum"
];

const FOUNDER_TERMS = [
  "founder",
  "co-founder",
  "cofounder",
  "founding partner",
  "gründ",
  "gruend"
];

const FALSE_FOUNDER_ROLES = [
  "founders associate",
  "founder associate",
  "associate to the founder",
  "assistant to the founder",
  "founder's associate"
];

const CURRENT_ROLE_TERMS = [
  "ceo",
  "chief executive",
  "managing director",
  "geschäftsführer",
  "geschaeftsfuehrer",
  "founder",
  "co-founder",
  "cofounder"
];

const BLOCKED_HOSTS = new Set([
  "accounts.google.com",
  "chrome.google.com",
  "chromewebstore.google.com"
]);

const RESEARCH_ENDPOINT = "http://127.0.0.1:8787/research";

const extensionApiAvailable =
  typeof chrome !== "undefined" &&
  Boolean(chrome.tabs?.query) &&
  Boolean(chrome.scripting?.executeScript);

const elements = {
  domain: document.querySelector("#domain"),
  extractButton: document.querySelector("#extractButton"),
  status: document.querySelector("#status"),
  statusText: document.querySelector("#statusText"),
  results: document.querySelector("#results"),
  companyName: document.querySelector("#companyName"),
  formed: document.querySelector("#formed"),
  website: document.querySelector("#website"),
  summary: document.querySelector("#summary"),
  founderList: document.querySelector("#founderList"),
  founderEmpty: document.querySelector("#founderEmpty"),
  emailCopyRow: document.querySelector("#emailCopyRow"),
  emailList: document.querySelector("#emailList"),
  copyEmailsButton: document.querySelector("#copyEmailsButton"),
  founderTemplate: document.querySelector("#founderTemplate")
};

elements.extractButton.addEventListener("click", extractStartup);
elements.copyEmailsButton.addEventListener("click", copyEmails);

if (extensionApiAvailable) {
  chrome.tabs.onActivated.addListener(updateActiveDomain);
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.active && changeInfo.url) updateActiveDomain();
  });

  updateActiveDomain();
} else {
  elements.domain.textContent = "example-startup.com";
}

async function updateActiveDomain() {
  const tab = await getActiveTab();
  if (!tab?.url) return;

  try {
    elements.domain.textContent = new URL(tab.url).hostname.replace(/^www\./, "");
  } catch {
    elements.domain.textContent = "Unsupported page";
  }
}

async function extractStartup() {
  if (!extensionApiAvailable) {
    renderResult({
      companyName: "Example Startup",
      formed: "2021",
      summary: "Example Startup builds workflow software that helps small operations teams manage repetitive back-office work.",
      website: "https://example-startup.com/",
      founders: [
        {
          name: "Maya Shah",
          role: "Co-Founder & CEO",
          email: "maya@example-startup.com",
          current: true,
          sourceUrl: "https://example-startup.com/about"
        },
        {
          name: "Jon Bell",
          role: "Founder",
          email: "jon@example-startup.com",
          current: false,
          sourceUrl: "https://example-startup.com/company-history"
        }
      ],
      sources: [
        "https://example-startup.com/",
        "https://example-startup.com/about",
        "https://example-startup.com/company-history"
      ]
    });
    setStatus("Preview data rendered.", "ready");
    return;
  }

  setStatus("Reading the current website…", "busy");
  elements.extractButton.disabled = true;

  try {
    const tab = await getActiveTab();
    assertSupportedTab(tab);

    const activePage = await readActivePage(tab.id);
    const origin = new URL(activePage.url).origin;
    const linkedCandidates = findCandidateLinks(activePage.html, origin);
    const localePrefix = getLocalePrefix(activePage.url);
    const candidateUrls = unique([
      ...linkedCandidates,
      ...CANDIDATE_PATHS.flatMap((path) => [
        `${origin}${path}`,
        localePrefix ? `${origin}${localePrefix}${path}` : ""
      ])
    ]).slice(0, 12);

    setStatus("Checking company and team pages…", "busy");
    const fetchedPages = await fetchCandidatePages(candidateUrls, origin);
    const pages = [activePage, ...fetchedPages];
    const localResult = analyzePages(pages);
    let result = localResult;
    let usedGoogleSearch = false;

    setStatus("Searching Google with Gemini…", "busy");
    try {
      const researched = await researchWithGemini(localResult);
      result = mergeResearch(localResult, researched);
      usedGoogleSearch = true;
    } catch (error) {
      console.warn("Gemini research unavailable:", error.message);
    }

    renderResult(result);
    setStatus(
      usedGoogleSearch
        ? "Researched with Gemini and Google Search."
        : `Local extraction only. Start the Gemini server for web search.`,
      "ready"
    );
  } catch (error) {
    setStatus(error.message || "Extraction failed.", "error");
  } finally {
    elements.extractButton.disabled = false;
  }
}

async function researchWithGemini(localResult) {
  const response = await fetch(RESEARCH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      website: localResult.website,
      companyName: localResult.companyName,
      summary: localResult.summary
    }),
    signal: AbortSignal.timeout(50_000)
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `Gemini server returned ${response.status}`);
  }
  return payload;
}

function mergeResearch(localResult, researched) {
  const domain = new URL(localResult.website).hostname.replace(/^www\./, "");
  const researchedFounders = Array.isArray(researched.founders)
    ? researched.founders
      .map((founder) => normalizeResearchedFounder(founder, domain, localResult.website))
      .filter(Boolean)
    : [];

  return {
    ...localResult,
    companyName: cleanText(researched.companyName) || localResult.companyName,
    formed: researched.formed && researched.formed !== "Not found"
      ? researched.formed
      : localResult.formed,
    summary: cleanText(researched.summary) || localResult.summary,
    founders: researchedFounders.length ? dedupeFounders(researchedFounders) : localResult.founders,
    sources: unique([
      ...localResult.sources,
      ...(researched.sources || []).map((source) => source.url)
    ])
  };
}

function normalizeResearchedFounder(founder, domain, fallbackSourceUrl) {
  const name = cleanPersonName(founder?.name);
  const role = cleanText(founder?.role);
  if (!name || !containsFounderTerm(role)) return null;

  const publicEmail = cleanText(founder.publicEmail).toLowerCase();
  return {
    name,
    role,
    current: founder.current === true,
    email: isEmail(publicEmail) ? publicEmail : inferEmail(name, domain),
    emailType: isEmail(publicEmail) ? "Public" : "Inferred",
    sourceUrl: fallbackSourceUrl,
    confidence: 0.98
  };
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

function assertSupportedTab(tab) {
  if (!tab?.id || !tab.url) {
    throw new Error("No active webpage found.");
  }

  const url = new URL(tab.url);
  if (!["http:", "https:"].includes(url.protocol) || BLOCKED_HOSTS.has(url.hostname)) {
    throw new Error("Open a public company website, then try again.");
  }
}

async function readActivePage(tabId) {
  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId },
    func: () => ({
      url: location.href,
      title: document.title,
      html: document.documentElement.outerHTML
    })
  });

  return parsePage(result.html, result.url, result.title);
}

async function fetchCandidatePages(urls, origin) {
  const pages = [];

  for (const url of urls) {
    try {
      const response = await fetch(url, {
        credentials: "omit",
        redirect: "follow",
        signal: AbortSignal.timeout(4500)
      });

      if (!response.ok) continue;
      const finalUrl = new URL(response.url);
      if (finalUrl.origin !== origin) continue;

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("text/html")) continue;

      const html = await response.text();
      if (html.length > 2_000_000) continue;
      pages.push(parsePage(html, response.url, ""));
    } catch {
      // Candidate pages are optional. The active page remains usable.
    }
  }

  return dedupePages(pages);
}

function parsePage(html, url, fallbackTitle) {
  const documentNode = new DOMParser().parseFromString(html, "text/html");
  documentNode.querySelectorAll("script:not([type='application/ld+json']), style, noscript, svg").forEach((node) => node.remove());

  const title = cleanText(documentNode.querySelector("title")?.textContent) || fallbackTitle || "";
  const description =
    getMeta(documentNode, "meta[name='description']") ||
    getMeta(documentNode, "meta[property='og:description']") ||
    "";
  const siteName = getMeta(documentNode, "meta[property='og:site_name']");
  const headings = Array.from(documentNode.querySelectorAll("h1, h2, h3"))
    .map((node) => cleanText(node.textContent))
    .filter(Boolean)
    .slice(0, 80);
  const paragraphs = Array.from(documentNode.querySelectorAll("p"))
    .map((node) => cleanText(node.textContent))
    .filter((text) => text.length >= 35 && text.length <= 700)
    .slice(0, 140);
  const text = cleanText(documentNode.body?.innerText || documentNode.body?.textContent || "").slice(0, 180_000);
  const jsonLd = parseJsonLd(html);
  const founderSignals = extractFounderSignals(documentNode);
  const linkedEmails = Array.from(documentNode.querySelectorAll("a[href^='mailto:']"))
    .map((anchor) => anchor.getAttribute("href").replace(/^mailto:/i, "").split("?")[0].trim().toLowerCase());
  const textEmails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  const publicEmails = unique([...linkedEmails, ...textEmails.map((email) => email.toLowerCase())])
    .filter(isEmail);

  return {
    url,
    title,
    description,
    siteName,
    headings,
    paragraphs,
    text,
    jsonLd,
    founderSignals,
    publicEmails,
    html
  };
}

function extractFounderSignals(documentNode) {
  const signals = [];
  const roleElements = Array.from(documentNode.querySelectorAll("h1, h2, h3, h4, h5, h6, p, span, strong, b, div"))
    .filter((node) => {
      const text = cleanText(node.textContent);
      return text.length >= 3 && text.length <= 140 && containsFounderTerm(text);
    })
    .slice(0, 80);

  for (const roleElement of roleElements) {
    let container = roleElement.parentElement;

    for (let depth = 0; container && depth < 4; depth += 1, container = container.parentElement) {
      const containerText = cleanText(container.textContent);
      if (containerText.length > 600) break;
      const signalCountBeforeContainer = signals.length;

      const nameElements = container.querySelectorAll("h1, h2, h3, h4, h5, h6, strong, b, [itemprop='name']");
      for (const nameElement of nameElements) {
        if (nameElement === roleElement || roleElement.contains(nameElement)) continue;
        const name = cleanPersonName(nameElement.textContent);
        if (!name) continue;

        signals.push({
          name,
          role: cleanText(roleElement.textContent),
          confidence: 0.9
        });
      }

      if (signals.length > signalCountBeforeContainer) break;
    }
  }

  return dedupeFounders(signals);
}

function getMeta(documentNode, selector) {
  return cleanText(documentNode.querySelector(selector)?.getAttribute("content"));
}

function parseJsonLd(html) {
  const documentNode = new DOMParser().parseFromString(html, "text/html");
  const values = [];

  for (const script of documentNode.querySelectorAll("script[type='application/ld+json']")) {
    try {
      const parsed = JSON.parse(script.textContent);
      values.push(...flattenJsonLd(parsed));
    } catch {
      // Invalid structured data is common and should not block extraction.
    }
  }

  return values;
}

function flattenJsonLd(value) {
  if (Array.isArray(value)) return value.flatMap(flattenJsonLd);
  if (!value || typeof value !== "object") return [];
  const graph = Array.isArray(value["@graph"]) ? value["@graph"].flatMap(flattenJsonLd) : [];
  return [value, ...graph];
}

function findCandidateLinks(html, origin) {
  const documentNode = new DOMParser().parseFromString(html, "text/html");
  const candidates = [];

  for (const anchor of documentNode.querySelectorAll("a[href]")) {
    const label = cleanText(anchor.textContent).toLowerCase();
    const href = anchor.getAttribute("href");
    if (!href) continue;

    try {
      const url = new URL(href, origin);
      if (url.origin !== origin) continue;
      const signal = `${label} ${url.pathname}`.toLowerCase();
      if (/(about|company|team|leadership|co[- ]?founder|funding|funded|seed|invest|press|über-uns|ueber-uns|impressum)/i.test(signal)) {
        url.hash = "";
        url.search = "";
        candidates.push(url.href);
      }
    } catch {
      // Ignore malformed links.
    }
  }

  return unique(candidates);
}

function analyzePages(pages) {
  const homepage = pages[0];
  const websiteUrl = new URL(homepage.url);
  const domain = websiteUrl.hostname.replace(/^www\./, "");
  const organizations = pages.flatMap((page) =>
    page.jsonLd.filter((entry) => {
      const types = asArray(entry["@type"]).map((type) => String(type).toLowerCase());
      return types.some((type) => ["organization", "corporation", "localbusiness"].includes(type));
    })
  );

  const companyName =
    cleanText(organizations.find((entry) => entry.name)?.name) ||
    cleanCompanyName(homepage.siteName) ||
    cleanCompanyName(homepage.title) ||
    domain.split(".")[0];

  const summary = selectSummary(homepage, organizations, companyName);
  const formed = findFoundedDate(pages, organizations);
  const founders = findFounders(pages, organizations, domain);

  return {
    companyName,
    formed,
    summary,
    website: `${websiteUrl.origin}/`,
    founders,
    sources: unique([
      homepage.url,
      ...founders.map((founder) => founder.sourceUrl),
      ...pages.filter((page) => page.url !== homepage.url).map((page) => page.url)
    ]).slice(0, 10)
  };
}

function selectSummary(homepage, organizations, companyName) {
  const structuredDescription = organizations
    .map((entry) => cleanText(entry.description))
    .find((text) => isUsefulSummary(text, companyName));

  if (structuredDescription) return trimSentence(structuredDescription, 420);
  if (isUsefulSummary(homepage.description, companyName)) return trimSentence(homepage.description, 420);

  const paragraph = homepage.paragraphs.find((text) => isUsefulSummary(text, companyName));
  return paragraph ? trimSentence(paragraph, 420) : "No reliable company summary found on the public pages checked.";
}

function isUsefulSummary(text, companyName) {
  if (!text || text.length < 45) return false;
  const lower = text.toLowerCase();
  const blocked = ["cookie", "privacy policy", "all rights reserved", "javascript", "newsletter"];
  return !blocked.some((term) => lower.includes(term)) &&
    (lower.includes(companyName.toLowerCase()) || /\b(we|our|platform|company|helps|provides|builds|offers)\b/i.test(text));
}

function findFoundedDate(pages, organizations) {
  const structured = organizations
    .map((entry) => entry.foundingDate)
    .find(Boolean);
  if (structured) return normalizeFoundedValue(String(structured));

  const patterns = [
    /\b(?:founded|established|launched|formed|incorporated)\b[^.!?\n]{0,80}\b((?:19|20)\d{2})\b/i,
    /\b(?:since)\s+((?:19|20)\d{2})\b/i,
    /\b(?:gegründet|gegruendet)\b[^.!?\n]{0,80}\b((?:19|20)\d{2})\b/i
  ];

  for (const page of pages) {
    for (const pattern of patterns) {
      const match = page.text.match(pattern);
      if (match) return match[1];
    }
  }

  return "Not found";
}

function normalizeFoundedValue(value) {
  const year = value.match(/\b(?:19|20)\d{2}\b/);
  return year ? year[0] : value;
}

function findFounders(pages, organizations, domain) {
  const candidates = [];

  for (const organization of organizations) {
    for (const founder of asArray(organization.founder || organization.founders)) {
      const name = cleanPersonName(typeof founder === "string" ? founder : founder?.name);
      if (!name) continue;
      candidates.push({
        name,
        role: cleanText(founder?.jobTitle) || "Founder",
        sourceUrl: findPageForJsonLd(pages, organization),
        confidence: 0.95
      });
    }
  }

  for (const page of pages) {
    for (const person of page.jsonLd) {
      const types = asArray(person["@type"]).map((type) => String(type).toLowerCase());
      const role = cleanText(person.jobTitle || person.roleName);
      if (!types.includes("person") || !containsFounderTerm(role)) continue;

      const name = cleanPersonName(person.name);
      if (!name) continue;
      candidates.push({
        name,
        role,
        sourceUrl: page.url,
        confidence: 0.94
      });
    }
  }

  for (const page of pages) {
    for (const signal of page.founderSignals) {
      candidates.push({
        ...signal,
        sourceUrl: page.url
      });
    }

    const snippets = collectFounderSnippets(page);
    for (const snippet of snippets) {
      candidates.push(...extractPeopleFromSnippet(snippet, page.url));
    }
  }

  return dedupeFounders(candidates)
    .filter((founder) => founder.name.split(/\s+/).length >= 2)
    .map((founder) => ({
      ...founder,
      role: founder.role || "Founder",
      ...resolveFounderEmail(founder.name, pages, domain),
      current: isCurrentFounder(founder.role, founder.sourceUrl)
    }))
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 8);
}

function resolveFounderEmail(name, pages, domain) {
  const firstName = getFirstName(name);
  const publicEmail = pages
    .flatMap((page) => page.publicEmails)
    .find((email) => {
      const [localPart, emailDomain] = email.split("@");
      return emailDomain === domain && normalizeEmailPart(localPart).startsWith(firstName);
    });

  if (publicEmail) {
    return {
      email: publicEmail,
      emailType: "Public"
    };
  }

  return {
    email: inferEmail(name, domain),
    emailType: "Inferred"
  };
}

function collectFounderSnippets(page) {
  const textBlocks = [...page.headings, ...page.paragraphs];
  const textSnippets = page.text
    .split(/(?<=[.!?])\s+|\n+/)
    .filter((text) => containsFounderTerm(text) && text.length <= 500);

  return unique(
    [...textBlocks, ...textSnippets]
      .map(cleanText)
      .filter((text) => containsFounderTerm(text) && text.length <= 500)
  );
}

function containsFounderTerm(text) {
  const lower = text.toLowerCase();
  if (FALSE_FOUNDER_ROLES.some((role) => lower.includes(role))) return false;
  return /\b(?:co[- ]?founder|founder|founding partner|gründer(?:in)?|gruender(?:in)?)\b/i.test(text);
}

function extractPeopleFromSnippet(snippet, sourceUrl) {
  const results = [];
  const normalized = snippet.replace(/[|•·]/g, " ");
  const rolePattern = /(co[- ]?founder|founder|founding partner|gründer(?:in)?|gruender(?:in)?)(?:\s*(?:&|and|und)\s*(ceo|chief executive officer|managing director|geschäftsführer|geschaeftsfuehrer))?/i;
  const roleMatch = normalized.match(rolePattern);
  const executiveRoleMatch = normalized.match(/\b(CEO|CTO|COO|CSO|chief executive officer|managing director|geschäftsführer|geschaeftsfuehrer)\b/i);
  const founderRole = roleMatch ? titleCaseRole(roleMatch[1]) : "Founder";
  const role = executiveRoleMatch
    ? `${titleCaseRole(executiveRoleMatch[1])} and ${founderRole}`
    : founderRole;

  const namePatterns = [
    /(?:founded by|co[- ]?founded by|founders?(?:\s+are|\s*:)|gegründet von|gegruendet von)\s+([A-ZÀ-ÖØ-Ý][\p{L}'’-]+(?:\s+[A-ZÀ-ÖØ-Ý][\p{L}'’-]+){1,3}(?:\s*(?:,|and|&|und)\s*[A-ZÀ-ÖØ-Ý][\p{L}'’-]+(?:\s+[A-ZÀ-ÖØ-Ý][\p{L}'’-]+){1,3})*)/giu,
    /((?:(?:Dr|Prof|Mr|Mrs|Ms)\.?\s+)?[A-ZÀ-ÖØ-Ý][\p{L}'’-]+(?:\s+[A-ZÀ-ÖØ-Ý][\p{L}'’-]+){1,3})\s*[,–—-]\s*(?:CEO|CTO|COO|CSO|chief executive officer|managing director|geschäftsführer|geschaeftsfuehrer)?\s*(?:&|and|und)?\s*(?:co[- ]?founder|founder|founding partner|gründer(?:in)?|gruender(?:in)?)/giu,
    /([A-ZÀ-ÖØ-Ý][\p{L}'’-]+(?:\s+[A-ZÀ-ÖØ-Ý][\p{L}'’-]+){1,3})\s*[,–—-]\s*(?:co[- ]?founder|founder|founding partner|gründer(?:in)?|gruender(?:in)?)/giu,
    /(?:co[- ]?founder|founder|founding partner|gründer(?:in)?|gruender(?:in)?)\s*[,–—-]?\s*([A-ZÀ-ÖØ-Ý][\p{L}'’-]+(?:\s+[A-ZÀ-ÖØ-Ý][\p{L}'’-]+){1,3})/giu
  ];

  for (const pattern of namePatterns) {
    for (const match of normalized.matchAll(pattern)) {
      const rawNames = match[1].split(/\s*(?:,|&|and|und)\s*/i);
      for (const rawName of rawNames) {
        const name = cleanPersonName(rawName);
        if (!name) continue;
        results.push({
          name,
          role,
          sourceUrl,
          confidence: 0.78
        });
      }
    }
  }

  return results;
}

function cleanPersonName(value) {
  const name = cleanText(value)
    .replace(/^(?:dr|prof|mr|mrs|ms)\.?\s+/i, "")
    .replace(/\s+(?:is|was|are|were|who|and the).*$/i, "")
    .replace(/[.,;:]+$/, "");

  if (!name || name.length < 4 || name.length > 80) return "";
  if (/\b(company|team|startup|founder|about|welcome|founded|together|joined|with|built|created)\b/i.test(name)) return "";
  if (!/^[\p{L}'’.-]+(?:\s+[\p{L}'’.-]+){1,3}$/u.test(name)) return "";
  if (!name.split(/\s+/).every((part) => /^[A-ZÀ-ÖØ-Ý]/u.test(part))) return "";
  return name;
}

function inferEmail(name, domain) {
  const firstName = getFirstName(name);
  return firstName ? `${firstName}@${domain}` : "";
}

function getFirstName(name) {
  const withoutTitle = cleanText(name).replace(/^(?:dr|prof|mr|mrs|ms)\.?\s+/i, "");
  return normalizeEmailPart(withoutTitle.split(/\s+/)[0]);
}

function normalizeEmailPart(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toLowerCase();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isCurrentFounder(role, sourceUrl) {
  const lower = role.toLowerCase();
  const currentExecutiveRole = CURRENT_ROLE_TERMS
    .filter((term) => !["founder", "co-founder", "cofounder"].includes(term))
    .some((term) => lower.includes(term));
  const currentCompanyPage = /\/(?:(?:[a-z]{2}(?:-[a-z]{2})?)\/)?(?:about|about-us|company|team|our-team|leadership|ueber-uns|uber-uns|impressum)(?:\/|$)/i
    .test(new URL(sourceUrl).pathname);

  return currentExecutiveRole || (currentCompanyPage && containsFounderTerm(role));
}

function getLocalePrefix(urlValue) {
  try {
    const [firstSegment] = new URL(urlValue).pathname.split("/").filter(Boolean);
    return /^[a-z]{2}(?:-[a-z]{2})?$/i.test(firstSegment || "") ? `/${firstSegment}` : "";
  } catch {
    return "";
  }
}

function findPageForJsonLd(pages, organization) {
  return pages.find((page) => page.jsonLd.includes(organization))?.url || pages[0].url;
}

function dedupeFounders(founders) {
  const byName = new Map();

  for (const founder of founders) {
    const key = founder.name.toLowerCase();
    const existing = byName.get(key);
    if (!existing || founder.confidence > existing.confidence) {
      byName.set(key, founder);
    }
  }

  return [...byName.values()];
}

function dedupePages(pages) {
  const byUrl = new Map();
  for (const page of pages) {
    const url = new URL(page.url);
    url.hash = "";
    if (!byUrl.has(url.href)) byUrl.set(url.href, page);
  }
  return [...byUrl.values()];
}

function renderResult(result) {
  elements.companyName.textContent = result.companyName;
  elements.formed.textContent = result.formed;
  elements.website.textContent = result.website;
  elements.website.href = result.website;
  elements.summary.textContent = result.summary;
  elements.founderList.replaceChildren();

  for (const founder of result.founders) {
    const fragment = elements.founderTemplate.content.cloneNode(true);
    fragment.querySelector(".founder-line").textContent = `${founder.name} (${founder.role})`;
    elements.founderList.append(fragment);
  }

  elements.founderEmpty.hidden = result.founders.length > 0;
  const emails = unique(result.founders.map((founder) => founder.email));
  elements.emailList.textContent = emails.join(", ");
  elements.emailCopyRow.hidden = emails.length === 0;
  elements.copyEmailsButton.textContent = "Copy";

  elements.results.hidden = false;
}

async function copyEmails() {
  const emails = elements.emailList.textContent;
  if (!emails) return;

  try {
    await navigator.clipboard.writeText(emails);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = emails;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }

  elements.copyEmailsButton.textContent = "Copied";
  window.setTimeout(() => {
    elements.copyEmailsButton.textContent = "Copy";
  }, 1200);
}

function setStatus(message, state) {
  elements.statusText.textContent = message;
  elements.status.className = `status ${state}`;
}

function cleanCompanyName(value) {
  if (!value) return "";
  return cleanText(value)
    .split(/\s+[|–—-]\s+/)[0]
    .replace(/\b(?:homepage|official site|website)\b/gi, "")
    .trim();
}

function titleCaseRole(value) {
  return cleanText(value)
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bCeo\b/g, "CEO");
}

function trimSentence(value, maxLength) {
  const text = cleanText(value);
  if (text.length <= maxLength) return text;
  const shortened = text.slice(0, maxLength);
  const sentenceEnd = Math.max(shortened.lastIndexOf("."), shortened.lastIndexOf("!"), shortened.lastIndexOf("?"));
  return `${shortened.slice(0, sentenceEnd > 120 ? sentenceEnd + 1 : shortened.lastIndexOf(" "))}…`;
}

function compactUrl(value) {
  try {
    const url = new URL(value);
    return `${url.hostname.replace(/^www\./, "")}${url.pathname === "/" ? "" : url.pathname}`;
  } catch {
    return value;
  }
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function asArray(value) {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}
