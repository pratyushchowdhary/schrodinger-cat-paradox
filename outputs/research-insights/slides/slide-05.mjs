import { base, card, footer, C } from "./shared.mjs";

export async function slide05(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addShape, addText } = ctx;
  base(slide, ctx, "Assumptions, Dependencies & Unknowns", "What is known enough to proceed, and what must be validated.");

  card(slide, ctx, 70, 210, 350, 310, "Assumptions", "• NourishCo has a central supplier master or can create one\n• One supplier may serve multiple brands and materials\n• Category, region, and brand rules can be modeled as configurable requirements\n• Human review remains required for final compliance decisions\n• Suppliers can review AI-extracted data before submitting", { accent: C.green, bodySize: 12 });

  card(slide, ctx, 465, 210, 350, 310, "Dependencies", "• OCR/document parser and confidence scoring\n• Supplier deduplication and entity matching\n• Role-based permissions and audit logs\n• Notification workflow for missing/expired documents\n• Integration with procurement/ERP systems later\n• Legal/privacy policy for document storage and retention", { accent: C.blue, bodySize: 12 });

  card(slide, ctx, 860, 210, 350, 310, "Unknowns", "• Exact compliance rules by category and geography\n• Ownership of vendor master data across teams\n• Existing tools NourishCo must integrate with\n• Contracting workflow and approval thresholds\n• SLA expectations by brand and supplier type\n• Data residency, retention, and audit requirements", { accent: C.red, bodySize: 12 });

  addShape(slide, { x: 70, y: 562, width: 1140, height: 74, fill: "#EEF4F0" });
  addText(slide, { text: "MVP risk control", x: 94, y: 578, width: 160, height: 20, fontSize: 13, bold: true, color: C.forest });
  addText(slide, { text: "Start with limited supplier categories, configurable rule templates, manual override, audit trail, and clear escalation paths. Do not automate final approval in MVP.", x: 254, y: 578, width: 870, height: 36, fontSize: 14, color: C.ink });

  footer(slide, ctx, 5);
  return slide;
}
