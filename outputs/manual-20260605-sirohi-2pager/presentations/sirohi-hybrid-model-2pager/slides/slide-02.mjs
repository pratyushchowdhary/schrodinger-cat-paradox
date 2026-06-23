import { C, bg, text, rect, line, header, footer, node, arrow } from "./_shared.mjs";

function flowNode(slide, ctx, x, y, w, title, body, opts) {
  rect(slide, ctx, x, y, w, 94, {
    fill: opts.fill,
    stroke: opts.stroke,
    strokeWidth: 1.4,
  });
  text(slide, ctx, x + 14, y + 14, w - 28, 20, title, {
    size: 14,
    color: opts.titleColor,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, x + 14, y + 42, w - 28, 40, body, {
    size: 11,
    color: C.muted,
    align: "center",
    valign: "top",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

function valueChip(slide, ctx, x, y, w, title, body, tone) {
  const color = tone === "red" ? C.sfpl : tone === "blue" ? C.blue : tone === "gold" ? C.ochre : C.foundation;
  rect(slide, ctx, x, y, w, 76, { fill: C.white, stroke: "#DED8CA", strokeWidth: 1 });
  line(slide, ctx, x, y, w, 5, color, 0);
  text(slide, ctx, x + 12, y + 15, w - 24, 18, title, {
    size: 12.4,
    color,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, x + 12, y + 39, w - 24, 28, body, {
    size: 10.2,
    color: C.muted,
    align: "center",
    valign: "top",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export async function slide02(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(
    slide,
    ctx,
    "FLOWS",
    "Products move outward; money returns to artisans.",
    "The model works when the commercial arm keeps demand growing and the Foundation keeps participation fair.",
    2,
  );

  text(slide, ctx, 62, 174, 140, 22, "PRODUCT FLOW", {
    size: 12,
    color: C.blue,
    bold: true,
    align: "center",
    fill: C.bluePale,
    line: ctx.line("#B8CDDA", 1),
  });
  flowNode(slide, ctx, 84, 226, 192, "Women artisans", "Make handmade products using trained skills.", {
    fill: C.foundationPale,
    stroke: C.foundationLine,
    titleColor: C.foundationDark,
  });
  flowNode(slide, ctx, 376, 226, 192, "Foundation", "Procures finished goods and checks quality.", {
    fill: C.foundationPale,
    stroke: C.foundationLine,
    titleColor: C.foundationDark,
  });
  flowNode(slide, ctx, 668, 226, 192, "SFPL", "Receives goods and manages commercial execution.", {
    fill: C.sfplPale,
    stroke: C.sfplLine,
    titleColor: C.sfplDark,
  });
  flowNode(slide, ctx, 960, 226, 192, "Customers", "Buy through D2C, B2B, retail, gifting and exports.", {
    fill: C.white,
    stroke: "#D9C9AA",
    titleColor: C.ochreDark,
  });
  arrow(slide, ctx, 286, 263, 86, 16, C.blue, "products", { labelBelow: true, labelSize: 10 });
  arrow(slide, ctx, 578, 263, 86, 16, C.blue, "transfer", { labelBelow: true, labelSize: 10 });
  arrow(slide, ctx, 870, 263, 86, 16, C.blue, "sales", { labelBelow: true, labelSize: 10 });

  text(slide, ctx, 62, 378, 126, 22, "MONEY FLOW", {
    size: 12,
    color: C.ochreDark,
    bold: true,
    align: "center",
    fill: C.ochrePale,
    line: ctx.line("#E0C58E", 1),
  });
  node(slide, ctx, 960, 424, 192, 76, "Customers pay SFPL", "Sales revenue is earned by the commercial arm.", {
    fill: C.ochrePale,
    stroke: "#E0C58E",
    titleColor: C.ochreDark,
    align: "center",
    bodySize: 10.8,
  });
  node(slide, ctx, 668, 424, 192, 76, "SFPL pays Foundation", "Payment is made against cost of production invoice.", {
    fill: C.ochrePale,
    stroke: "#E0C58E",
    titleColor: C.ochreDark,
    align: "center",
    bodySize: 10.8,
  });
  node(slide, ctx, 376, 424, 192, 76, "Foundation pays artisans", "Fair wages are paid for the products.", {
    fill: C.foundationPale,
    stroke: C.foundationLine,
    titleColor: C.foundationDark,
    align: "center",
    bodySize: 10.8,
  });
  node(slide, ctx, 84, 424, 192, 76, "Income reaches women", "Livelihoods are linked to real market demand.", {
    fill: C.foundationPale,
    stroke: C.foundationLine,
    titleColor: C.foundationDark,
    align: "center",
    bodySize: 10.8,
  });
  arrow(slide, ctx, 870, 456, 86, 16, C.ochre, "revenue", { left: true, labelBelow: true, labelSize: 10 });
  arrow(slide, ctx, 578, 456, 86, 16, C.ochre, "invoice", { left: true, labelBelow: true, labelSize: 10 });
  arrow(slide, ctx, 286, 456, 86, 16, C.foundation, "fair wages", { left: true, labelBelow: true, labelSize: 10 });

  rect(slide, ctx, 64, 552, 1112, 92, { fill: "#FFFDF8", stroke: "#E3DED2", strokeWidth: 1 });
  text(slide, ctx, 88, 570, 170, 18, "VALUE CREATED", {
    size: 12.5,
    color: C.ochreDark,
    bold: true,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  valueChip(slide, ctx, 260, 568, 160, "Income", "Women earn sustainable livelihoods.", "green");
  valueChip(slide, ctx, 438, 568, 160, "Craft", "Traditional skills are preserved.", "gold");
  valueChip(slide, ctx, 616, 568, 160, "Materials", "Waste is upcycled responsibly.", "blue");
  valueChip(slide, ctx, 794, 568, 160, "Customers", "Premium handmade products delight buyers.", "red");
  valueChip(slide, ctx, 972, 568, 160, "Scale", "Impact grows through a sustainable enterprise.", "green");

  text(slide, ctx, 240, 656, 800, 20, "The Foundation enables participation. The For-Profit creates market demand.", {
    size: 14,
    color: C.ink,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  footer(slide, ctx, 2);
  return slide;
}
