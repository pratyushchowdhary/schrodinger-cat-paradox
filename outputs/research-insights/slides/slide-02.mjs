import { base, card, footer, C } from "./shared.mjs";

export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addText, addShape } = ctx;
  base(slide, ctx, "Stakeholders, Segments & Compliance Pain", "Who the platform serves and why the current process breaks.");

  card(slide, ctx, 64, 214, 346, 318, "External Suppliers", "Segments\n• New suppliers applying for the first time\n• Returning suppliers updating documents or adding supply items\n• Multi-material suppliers with reusable credentials\n\nNeeds\n• One profile, not repeated brand-by-brand onboarding\n• Clear list of missing or rejected documents\n• Confidence that parsed data is correct before submission", { accent: C.green, bodySize: 11.6 });

  card(slide, ctx, 466, 214, 346, 318, "Internal Teams", "Segments\n• Compliance reviewers checking documents, renewals, risk, and audits\n• Procurement teams looking for RFQ-ready supplier-material opportunities\n• Quality/regulatory teams validating category-specific requirements\n• Leadership monitoring bottlenecks and risk exposure\n\nNeeds\n• Queue discipline, ownership, audit trail, and cross-brand visibility", { accent: C.blue, bodySize: 11.4 });

  card(slide, ctx, 868, 214, 346, 318, "Compliance Pain Points", "Current failure modes\n• Documents live across emails, spreadsheets, and brand-specific workflows\n• Supplier identity is duplicated across brands\n• Certifications, licenses, audits, and renewals are manually tracked\n• Region/category rules differ and are hard to enforce consistently\n• Leadership lacks a single view of supplier risk and approval bottlenecks", { accent: C.red, bodySize: 11.4 });

  addShape(slide, { x: 64, y: 570, width: 1150, height: 66, fill: "#EEF4F0", line: { color: "#EEF4F0", width: 1 } });
  addText(slide, { text: "Design implication", x: 88, y: 586, width: 150, height: 20, fontSize: 12, bold: true, color: C.forest });
  addText(slide, { text: "Supplier screens should reduce effort. Internal screens should expose ownership, blockers, risk, and reuse opportunities across brands.", x: 238, y: 586, width: 860, height: 22, fontSize: 13.5, color: C.ink });

  footer(slide, ctx, 2);
  return slide;
}
