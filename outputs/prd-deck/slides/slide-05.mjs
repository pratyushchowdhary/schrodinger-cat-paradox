import { base, card, footer, pill, C } from "./shared.mjs";

export async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addShape, addText } = ctx;
  base(slide, ctx, "AI-Assisted Workflows & Automations", "AI improves speed and visibility, but does not replace accountable human decisions.");

  const items = [
    ["Document parsing", "Extract legal name, tax IDs, addresses, license dates, lab report metadata, product specs, and confidence score.", C.green],
    ["Duplicate detection", "Match supplier identity across existing records using business name, tax ID, address, bank/legal metadata, and contact signals.", C.blue],
    ["Compliance gap detection", "Compare uploaded documents against configurable category, geography, and material requirements.", C.red],
    ["Review summaries", "Draft reviewer-facing summaries: what was found, what is missing, why it matters, and recommended next action.", C.amber],
    ["Renewal automation", "Track expiry windows, send reminders, escalate overdue items, and keep a traceable notification history.", C.red],
    ["Procurement signals", "Surface RFQ-ready opportunities, low coverage materials, brand fit, blocked sourcing, external news risk, and capacity changes.", C.blue],
  ];

  items.forEach(([title, body, color], i) => {
    const x = i % 2 === 0 ? 76 : 660;
    const y = 204 + Math.floor(i / 2) * 120;
    card(slide, ctx, x, y, 520, 96, title, body, { accent: color, titleSize: 16, bodySize: 11.6 });
  });

  addShape(slide, { x: 76, y: 584, width: 1104, height: 46, fill: C.pale, line: { color: C.line, width: 1 } });
  addText(slide, { text: "AI boundary", x: 98, y: 598, width: 100, height: 18, fontSize: 12, bold: true, color: C.ink });
  pill(slide, ctx, "Suggest", 210, 592, 92, C.greenPale, C.green);
  pill(slide, ctx, "Prioritize", 316, 592, 96, C.bluePale, C.blue);
  pill(slide, ctx, "Draft", 426, 592, 76, C.amberPale, C.amber);
  pill(slide, ctx, "Never final-approve", 516, 592, 154, C.redPale, C.red);
  addText(slide, { text: "Human reviewers remain accountable for compliance clearance and supplier approval.", x: 690, y: 599, width: 430, height: 18, fontSize: 12.2, color: C.muted });

  footer(slide, ctx, 5);
  return slide;
}
