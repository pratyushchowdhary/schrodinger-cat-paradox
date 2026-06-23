import http from "node:http";

const PORT = Number(process.env.PORT || 8787);
const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
const API_KEY = process.env.GEMINI_API_KEY;

const server = http.createServer(async (request, response) => {
  setCorsHeaders(response);

  if (request.method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === "GET" && request.url === "/health") {
    sendJson(response, 200, {
      ok: true,
      configured: Boolean(API_KEY),
      model: MODEL
    });
    return;
  }

  if (request.method !== "POST" || request.url !== "/research") {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  if (!API_KEY) {
    sendJson(response, 503, {
      error: "GEMINI_API_KEY is not configured"
    });
    return;
  }

  try {
    const body = await readJsonBody(request);
    const website = parseWebsite(body.website);
    const companyName = cleanText(body.companyName);
    const localSummary = cleanText(body.summary).slice(0, 1200);
    const result = await researchStartup({ website, companyName, localSummary });
    sendJson(response, 200, result);
  } catch (error) {
    const statusCode = error.statusCode || 500;
    sendJson(response, statusCode, {
      error: error.message || "Research failed"
    });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Founder Scout Gemini server: http://127.0.0.1:${PORT}`);
  console.log(`Model: ${MODEL}`);
  console.log(API_KEY ? "Gemini API key configured." : "GEMINI_API_KEY is missing.");
});

async function researchStartup({ website, companyName, localSummary }) {
  const prompt = `
Research the startup whose official website is ${website}.
Known company name: ${companyName || "unknown"}.
Website summary: ${localSummary || "not available"}.

Use Google Search. Prefer the official website, official company announcements,
current founder profiles, reputable funding announcements, and reliable business databases.

Return only valid JSON with this exact structure:
{
  "companyName": "string",
  "formed": "four-digit year or Not found",
  "summary": "one concise sentence",
  "founders": [
    {
      "name": "full person name without titles",
      "role": "current designation, including Founder or Co-Founder",
      "current": true,
      "publicEmail": "publicly stated company email or empty string"
    }
  ]
}

Rules:
- Include only actual founders or co-founders, never founder associates, assistants, investors, or ordinary executives.
- Mark current true only when evidence indicates the person is currently involved.
- Do not invent an email. publicEmail must be empty unless a source explicitly publishes it.
- Do not include markdown fences, citations, commentary, or keys outside the schema.
`.trim();

  const geminiResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(MODEL)}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": API_KEY
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        tools: [{ google_search: {} }],
        generationConfig: {
          temperature: 0.1
        }
      }),
      signal: AbortSignal.timeout(45_000)
    }
  );

  const payload = await geminiResponse.json();
  if (!geminiResponse.ok) {
    const error = new Error(payload.error?.message || `Gemini API returned ${geminiResponse.status}`);
    error.statusCode = geminiResponse.status;
    throw error;
  }

  const text = payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!text) throw new Error("Gemini returned no research result");

  const parsed = parseModelJson(text);
  const groundingChunks = payload.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const sources = groundingChunks
    .map((chunk) => chunk.web)
    .filter((web) => web?.uri)
    .map((web) => ({ title: cleanText(web.title), url: web.uri }));

  return {
    companyName: cleanText(parsed.companyName),
    formed: normalizeFormed(parsed.formed),
    summary: cleanText(parsed.summary),
    founders: Array.isArray(parsed.founders)
      ? parsed.founders.map(normalizeFounder).filter(Boolean)
      : [],
    sources
  };
}

function normalizeFounder(founder) {
  if (!founder || typeof founder !== "object") return null;
  const name = cleanText(founder.name).replace(/^(?:dr|prof|mr|mrs|ms)\.?\s+/i, "");
  const role = cleanText(founder.role);
  if (!name || !/\b(?:co[- ]?founder|founder)\b/i.test(role)) return null;

  const publicEmail = cleanText(founder.publicEmail).toLowerCase();
  return {
    name,
    role,
    current: founder.current === true,
    publicEmail: isEmail(publicEmail) ? publicEmail : ""
  };
}

function normalizeFormed(value) {
  const match = cleanText(value).match(/\b(?:19|20)\d{2}\b/);
  return match ? match[0] : "Not found";
}

function parseModelJson(text) {
  const unfenced = text
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();

  try {
    return JSON.parse(unfenced);
  } catch {
    const start = unfenced.indexOf("{");
    const end = unfenced.lastIndexOf("}");
    if (start === -1 || end <= start) throw new Error("Gemini returned invalid JSON");
    return JSON.parse(unfenced.slice(start, end + 1));
  }
}

function parseWebsite(value) {
  const url = new URL(String(value || ""));
  if (!["http:", "https:"].includes(url.protocol)) {
    throw Object.assign(new Error("Invalid website URL"), { statusCode: 400 });
  }
  return url.origin;
}

async function readJsonBody(request) {
  const chunks = [];
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > 100_000) {
      throw Object.assign(new Error("Request body is too large"), { statusCode: 413 });
    }
    chunks.push(chunk);
  }

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    throw Object.assign(new Error("Invalid JSON request"), { statusCode: 400 });
  }
}

function setCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.setHeader("Cache-Control", "no-store");
}

function sendJson(response, statusCode, value) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value));
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
