import { base, card, footer, pill, C } from "./shared.mjs";

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addText, addShape } = ctx;
  base(slide, ctx, "Product Requirements Document", "Supplier onboarding and compliance platform for a multi-brand FMCG enterprise.");

  addText(slide, {
    text: "Build one reusable supplier-material profile, clear compliance once, then let internal teams reuse that profile across NourishCo brands.",
    x: 82,
    y: 214,
    width: 1050,
    height: 86,
    fontSize: 27,
    bold: true,
    color: C.forest,
    typeface: "Aptos Display",
  });

  const y = 350;
  card(slide, ctx, 82, y, 250, 142, "Supplier Portal", "Upload once, parse documents, review extracted profile data, resolve missing items, and submit.", { accent: C.green });
  card(slide, ctx, 360, y, 250, 142, "Compliance Workspace", "Own document validation, action queues, renewals, audits, sustainability, and final clearance.", { accent: C.red });
  card(slide, ctx, 638, y, 250, 142, "Procurement Workspace", "Use cleared supplier-material profiles for RFQ readiness, coverage gaps, trials, and sourcing signals.", { accent: C.blue });
  card(slide, ctx, 916, y, 250, 142, "AI Layer", "Extract data, detect duplicates, identify blockers, draft summaries, and surface risks. Do not auto-approve.", { accent: C.amber });

  pill(slide, ctx, "MVP: onboarding + compliance", 258, 548, 214, C.greenPale, C.green);
  pill(slide, ctx, "Human approval", 488, 548, 134, C.redPale, C.red);
  pill(slide, ctx, "Multi-brand reuse", 638, 548, 148, C.bluePale, C.blue);
  pill(slide, ctx, "Procurement signal layer", 802, 548, 196, C.amberPale, C.amber);

  addShape(slide, { x: 82, y: 612, width: 1084, height: 34, fill: "#EEF4F0" });
  addText(slide, { text: "Product stance: supplier experience stays simple; internal workspaces carry the operational complexity.", x: 102, y: 621, width: 1000, height: 18, fontSize: 12.5, bold: true, color: C.forest });

  footer(slide, ctx, 1);
  return slide;
}
