import { base, footer, pill, sectionLabel, C } from "./shared.mjs";

function step(slide, ctx, x, y, w, title, body, color) {
  const { addShape, addText } = ctx;
  addShape(slide, { x, y, width: w, height: 112, fill: C.panel, line: ctx.line(C.line, 1.1) });
  addShape(slide, { x, y, width: 5, height: 112, fill: color });
  addText(slide, { text: title, x: x + 18, y: y + 16, width: w - 36, height: 22, fontSize: 15, bold: true, color: C.ink, typeface: "Aptos Display" });
  addText(slide, { text: body, x: x + 18, y: y + 45, width: w - 36, height: 54, fontSize: 11.4, color: C.muted });
}

export async function slide03(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addShape, addText } = ctx;
  base(slide, ctx, "Key Workflows & User Journeys", "How supplier intake turns into internal compliance and sourcing action.");

  sectionLabel(slide, ctx, "SUPPLIER JOURNEY", 72, 204, 232, C.greenPale, C.green);
  step(slide, ctx, 72, 246, 232, "Start application", "Supplier creates account and enters basic business identity.", C.green);
  step(slide, ctx, 72, 372, 232, "Upload documents", "Bulk upload plus individual prompts for required business, tax, quality, safety, and legal docs.", C.green);
  step(slide, ctx, 72, 498, 232, "Review & submit", "Supplier reviews AI-filled profile and resolves missing or unclear items before submission.", C.green);

  sectionLabel(slide, ctx, "COMPLIANCE JOURNEY", 368, 204, 232, C.redPale, C.red);
  step(slide, ctx, 368, 246, 232, "Triage queue", "Unreadable, expired, missing, or mismatched documents are routed by severity and owner.", C.red);
  step(slide, ctx, 368, 372, 232, "Clearance", "Reviewer validates documents, records decision trail, and requests fixes when needed.", C.red);
  step(slide, ctx, 368, 498, 232, "Ongoing control", "Renewals, audits, sustainability evidence, and external risk alerts are monitored.", C.red);

  sectionLabel(slide, ctx, "PROCUREMENT JOURNEY", 664, 204, 232, C.bluePale, C.blue);
  step(slide, ctx, 664, 246, 232, "Reuse profile", "Cleared supplier-material records become searchable sourcing opportunities.", C.blue);
  step(slide, ctx, 664, 372, 232, "Act on signals", "AI highlights RFQ-ready, low coverage, trial required, renewal due, and blocked opportunities.", C.blue);
  step(slide, ctx, 664, 498, 232, "Move to RFQ", "Procurement invites cleared suppliers to RFQ or follows up with compliance on blockers.", C.blue);

  addShape(slide, { x: 948, y: 246, width: 230, height: 364, fill: C.panel, line: ctx.line(C.line, 1.1) });
  addText(slide, { text: "Multi-brand reuse example", x: 970, y: 266, width: 180, height: 22, fontSize: 16, bold: true, color: C.ink, typeface: "Aptos Display" });
  addText(slide, { text: "Curcuma longa uploaded once", x: 970, y: 306, width: 180, height: 20, fontSize: 12.5, bold: true, color: C.forest });
  const rows = [
    ["Harvest Bites", "Blocked: allergen declaration missing", C.red],
    ["DailyGlow", "Eligible: cosmetic-grade review passed", C.green],
    ["QuickEats", "Trial required: batch validation", C.amber],
    ["EcoPack", "Not applicable: not packaging input", C.muted],
  ];
  rows.forEach(([brand, status, color], i) => {
    const y = 346 + i * 50;
    addShape(slide, { x: 970, y: y + 5, width: 7, height: 7, fill: color, radius: 3.5 });
    addText(slide, { text: brand, x: 986, y, width: 150, height: 15, fontSize: 9.7, bold: true, color: C.muted });
    addText(slide, { text: status, x: 986, y: y + 16, width: 168, height: 27, fontSize: 10.4, color: C.ink });
  });
  pill(slide, ctx, "No duplicate supplier onboarding", 970, 564, 178, C.greenPale, C.green);

  footer(slide, ctx, 3);
  return slide;
}
