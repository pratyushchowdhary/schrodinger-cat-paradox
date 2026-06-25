import { base, card, footer, C } from "./shared.mjs";

export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addShape, addText } = ctx;
  base(slide, ctx, "Problem, Goals & Non-Goals", "Scope boundaries for the MVP and what the product must prove.");

  card(slide, ctx, 70, 214, 350, 296, "Problem Statement", "Supplier onboarding is duplicated across brands, documents are scattered, compliance tracking is manual, and leadership lacks visibility into supplier risk and approval bottlenecks.\n\nThe result is slow approvals, repeated supplier effort, inconsistent data, and procurement teams unable to reuse valid supplier profiles across brands.", { accent: C.red, bodySize: 12.2 });

  card(slide, ctx, 465, 214, 350, 296, "Goals", "• Create a unified supplier registration flow\n• Enable one supplier profile to support multiple brands/materials\n• Automate document parsing and compliance tracking\n• Give compliance teams clear queues, renewals, and audit visibility\n• Give procurement teams RFQ-ready and blocked sourcing opportunities\n• Preserve human review for final decisions", { accent: C.green, bodySize: 12.1 });

  card(slide, ctx, 860, 214, 350, 296, "Non-Goals", "• Purchase order execution\n• Invoice/payment processing\n• Full ERP replacement\n• Logistics tracking and shipment monitoring\n• Automated final compliance approval\n• Supplier self-selection of NourishCo brands\n• Fully configurable rule engine for every category/region in MVP", { accent: C.amber, bodySize: 12.1 });

  addShape(slide, { x: 70, y: 552, width: 1140, height: 76, fill: "#EEF4F0" });
  addText(slide, { text: "Core tradeoff", x: 94, y: 568, width: 140, height: 20, fontSize: 13, bold: true, color: C.forest });
  addText(slide, { text: "The MVP optimizes for clean intake, compliance clearance, and supplier reuse. Procurement gets visibility and action signals, but downstream buying remains outside scope.", x: 232, y: 568, width: 860, height: 38, fontSize: 14, color: C.ink });

  footer(slide, ctx, 2);
  return slide;
}
