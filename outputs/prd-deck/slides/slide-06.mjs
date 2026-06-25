import { base, card, footer, C } from "./shared.mjs";

export async function slide06(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addShape, addText } = ctx;
  base(slide, ctx, "MVP Scope, Prioritization & Success Metrics", "What ships first, why, and how success is measured.");

  card(slide, ctx, 66, 208, 360, 260, "MVP Scope", "1. Supplier registration and document upload\n2. AI parsing and supplier review of extracted data\n3. Supplier-material profile creation\n4. Compliance action queue and reviewer workflow\n5. Renewal/expiry tracking\n6. Procurement visibility into RFQ-ready and blocked opportunities\n7. Basic multi-brand eligibility view", { accent: C.green, bodySize: 11.8 });

  card(slide, ctx, 460, 208, 360, 260, "Prioritization Rationale", "Start where the operational bottleneck is highest: document intake, duplicate supplier identity, compliance clearance, and reusable supplier-material records.\n\nProcurement screens stay lighter in MVP because they depend on compliance quality. PO execution and payment workflows come later.", { accent: C.blue, bodySize: 12.2 });

  card(slide, ctx, 854, 208, 360, 260, "Success Metrics", "• Onboarding cycle time reduction\n• % documents auto-parsed with high confidence\n• Supplier rework rate\n• Duplicate supplier profile reduction\n• Time to compliance decision\n• Renewal SLA adherence\n• RFQ-ready opportunities created from existing profiles\n• Reviewer backlog and overdue tasks", { accent: C.red, bodySize: 11.8 });

  addShape(slide, { x: 66, y: 512, width: 1148, height: 82, fill: "#EEF4F0" });
  addText(slide, { text: "MVP sequencing", x: 90, y: 530, width: 150, height: 20, fontSize: 13, bold: true, color: C.forest });
  addText(slide, { text: "Phase 1: supplier intake + compliance clearance. Phase 2: procurement workbench and AI sourcing signals. Phase 3: ERP/RFQ integrations and deeper rule configurability.", x: 242, y: 530, width: 840, height: 40, fontSize: 13.5, color: C.ink });

  footer(slide, ctx, 6);
  return slide;
}
