import { base, card, footer, pill, C } from "./shared.mjs";

export async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addText, addShape } = ctx;
  base(slide, ctx, "Key User & Business Insights", "What the research means for product strategy.");

  const insights = [
    ["Supplier identity is the spine", "A reusable supplier profile prevents duplicate onboarding and lets one supplier-material record serve multiple brands."],
    ["Compliance gates procurement", "Procurement should see usable sourcing opportunities, but blocked items must remain owned by compliance until cleared."],
    ["Supplier UX must be explicit", "Supplier-facing language should say what is missing, why it matters, and what action is required. Avoid internal jargon."],
    ["Rules must be configurable", "Brand, category, geography, and material rules vary. Hard-coded workflows will fail at enterprise scale."],
    ["AI should triage, not approve", "High-value AI use cases: document parsing, entity matching, duplicate detection, risk surfacing, renewal alerts, and draft summaries."],
    ["Leadership needs bottleneck visibility", "Dashboards should show where approvals stall, which risks are rising, and which teams own the next action."],
  ];

  insights.forEach(([title, body], i) => {
    const x = i % 2 === 0 ? 76 : 660;
    const y = 206 + Math.floor(i / 2) * 122;
    card(slide, ctx, x, y, 520, 98, title, body, { fill: C.panel, accent: i === 1 || i === 4 ? C.red : C.green, titleSize: 16, bodySize: 11.7 });
  });

  addShape(slide, { x: 76, y: 594, width: 1104, height: 42, fill: C.pale });
  addText(slide, { text: "Prototype mapping:", x: 98, y: 607, width: 140, height: 18, fontSize: 11.5, bold: true, color: C.ink });
  pill(slide, ctx, "Supplier portal", 234, 601, 122, C.greenPale, C.green);
  pill(slide, ctx, "Compliance command center", 370, 601, 196, C.redPale, C.red);
  pill(slide, ctx, "Procurement sourcing workspace", 580, 601, 228, C.amberPale, C.amber);
  addText(slide, { text: "Together, these prove the multi-role system rather than only a supplier upload form.", x: 830, y: 608, width: 330, height: 18, fontSize: 11.5, color: C.muted });

  footer(slide, ctx, 4);
  return slide;
}
