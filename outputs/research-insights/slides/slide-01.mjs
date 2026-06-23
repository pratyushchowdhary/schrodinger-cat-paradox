import { base, card, footer, pill, C } from "./shared.mjs";

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addText, addShape } = ctx;
  base(slide, ctx, "Research & Insights", "Scope for the NourishCo supplier onboarding and compliance platform.");

  addText(slide, {
    text: "The core problem is not document upload. It is reusable supplier identity, compliance clearance, and operational visibility across multiple brands.",
    x: 82,
    y: 214,
    width: 1040,
    height: 86,
    fontSize: 28,
    bold: true,
    color: C.forest,
    typeface: "Aptos Display",
  });

  const y = 350;
  card(slide, ctx, 82, y, 250, 142, "Stakeholders", "Suppliers, brand procurement teams, compliance, quality/regulatory, central operations, and leadership.", { accent: C.green });
  card(slide, ctx, 360, y, 250, 142, "User Segments", "New suppliers, returning suppliers, internal reviewers, procurement managers, and compliance leadership.", { accent: C.blue });
  card(slide, ctx, 638, y, 250, 142, "Pain Points", "Duplicate approvals, scattered documents, inconsistent supplier data, manual certification tracking, and poor risk visibility.", { accent: C.red });
  card(slide, ctx, 916, y, 250, 142, "Market View", "The market is crowded in procurement suites, but the focused wedge is supplier onboarding plus compliance operations.", { accent: C.amber });

  pill(slide, ctx, "Supplier-facing simplicity", 250, 548, 190, C.greenPale, C.green);
  pill(slide, ctx, "Internal workflow rigor", 458, 548, 180, C.pale, C.blue);
  pill(slide, ctx, "AI-assisted triage", 656, 548, 152, C.amberPale, C.amber);
  pill(slide, ctx, "Human approval remains", 826, 548, 170, C.redPale, C.red);

  addShape(slide, { x: 82, y: 612, width: 1084, height: 34, fill: "#EEF4F0" });
  addText(slide, {
    text: "Output: a research foundation for PRD scope, prototype screens, AI workflows, and MVP prioritization.",
    x: 102,
    y: 621,
    width: 1000,
    height: 18,
    fontSize: 12.5,
    bold: true,
    color: C.forest,
  });
  footer(slide, ctx, 1);
  return slide;
}
