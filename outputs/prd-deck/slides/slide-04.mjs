import { base, card, footer, C } from "./shared.mjs";

export async function slide04(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addShape, addText } = ctx;
  base(slide, ctx, "Functional & Non-Functional Requirements", "What the MVP must support across the three workspaces.");

  card(slide, ctx, 66, 206, 360, 212, "Supplier Portal", "• Account creation and returning supplier login\n• Bulk and individual document upload\n• AI parsing progress and confidence states\n• Review/edit extracted business, location, contact, and supply details\n• Clear missing/expired/unreadable document prompts\n• Final confirmation before submission", { accent: C.green, bodySize: 11.4 });

  card(slide, ctx, 460, 206, 360, 212, "Compliance Workspace", "• Supplier register and master profile view\n• Action needed queue with severity, owner, SLA, and source\n• New vendor onboarding queue\n• Renewal/expiry tracking\n• Audit and sustainability tracker\n• Reviewer workload and audit trail", { accent: C.red, bodySize: 11.4 });

  card(slide, ctx, 854, 206, 360, 212, "Procurement Workspace", "• Supplier marketplace/search\n• Sourcing workbench for supplier-material-brand opportunities\n• RFQ readiness and blocker visibility\n• Low-coverage material signals\n• Trial required and renewal due signals\n• Owner-aware actions: RFQ, follow up, request trial, monitor blocker", { accent: C.blue, bodySize: 11.4 });

  addShape(slide, { x: 66, y: 458, width: 1148, height: 98, fill: C.panel, line: { color: C.line, width: 1.1 } });
  addShape(slide, { x: 66, y: 458, width: 5, height: 98, fill: C.amber });
  addText(slide, { text: "Non-functional requirements", x: 88, y: 476, width: 260, height: 22, fontSize: 16, bold: true, color: C.ink, typeface: "Aptos Display" });
  addText(slide, { text: "Security and access control • Auditability • Data quality/confidence scoring • Scalable document processing • Configurable rule templates • Search and filtering • Accessibility with non-color-only status indicators • Performance for large supplier/document volumes", x: 88, y: 510, width: 1060, height: 38, fontSize: 12.4, color: C.muted });

  addShape(slide, { x: 66, y: 584, width: 1148, height: 44, fill: "#EEF4F0" });
  addText(slide, { text: "Requirement guardrail:", x: 88, y: 598, width: 160, height: 18, fontSize: 12, bold: true, color: C.forest });
  addText(slide, { text: "Supplier-facing screens explain actions plainly. Internal screens expose queue ownership, SLA, and risk.", x: 248, y: 598, width: 740, height: 18, fontSize: 12.5, color: C.ink });

  footer(slide, ctx, 4);
  return slide;
}
