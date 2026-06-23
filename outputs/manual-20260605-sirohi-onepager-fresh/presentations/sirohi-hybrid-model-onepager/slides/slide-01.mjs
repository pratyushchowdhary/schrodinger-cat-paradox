const C = {
  paper: "#F8F4EC",
  ink: "#14231B",
  muted: "#5F665F",
  white: "#FFFFFF",
  green: "#4F7045",
  greenDark: "#263F29",
  greenPale: "#EAF2E5",
  red: "#A43A45",
  redDark: "#6E2029",
  redPale: "#F7E8EA",
  blue: "#1E587C",
  bluePale: "#E7F1F6",
  gold: "#B07B2B",
  goldDark: "#735018",
  goldPale: "#FBEDD2",
  line: "#D8D0C0",
};

function shape(slide, ctx, x, y, w, h, o = {}) {
  return ctx.addShape(slide, {
    x, y, w, h,
    geometry: o.geometry ?? "roundRect",
    fill: o.fill ?? C.white,
    line: ctx.line(o.stroke ?? "transparent", o.strokeWidth ?? 0),
  });
}

function text(slide, ctx, x, y, w, h, value, o = {}) {
  return ctx.addText(slide, {
    x, y, w, h,
    text: value,
    fontSize: o.size ?? 14,
    color: o.color ?? C.ink,
    bold: o.bold ?? false,
    typeface: o.face ?? (o.bold ? "Aptos Display" : "Aptos"),
    align: o.align ?? "left",
    valign: o.valign ?? "middle",
    fill: o.fill ?? "#00000000",
    line: o.line ?? ctx.line(),
    insets: o.insets ?? { left: 6, right: 6, top: 3, bottom: 3 },
  });
}

function rule(slide, ctx, x, y, w, h, color) {
  shape(slide, ctx, x, y, w, h, { geometry: "rect", fill: color, stroke: color });
}

function arrow(slide, ctx, x, y, w, h, color, direction = "right") {
  const geometry = direction === "left" ? "leftArrow" : direction === "down" ? "downArrow" : direction === "up" ? "upArrow" : "rightArrow";
  shape(slide, ctx, x, y, w, h, { geometry, fill: color, stroke: color });
}

function pill(slide, ctx, x, y, w, label, color, fill) {
  shape(slide, ctx, x, y, w, 28, { fill, stroke: color, strokeWidth: 1 });
  text(slide, ctx, x + 10, y + 6, w - 20, 14, label, {
    size: 10.5,
    color,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

function sideEngine(slide, ctx, x, y, w, h, title, role, lines, color, dark, pale) {
  shape(slide, ctx, x, y, w, h, { fill: C.white, stroke: color, strokeWidth: 1.4 });
  rule(slide, ctx, x, y, w, 8, color);
  text(slide, ctx, x + 22, y + 24, w - 44, 24, title, {
    size: 18,
    color: dark,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, x + 22, y + 54, w - 44, 20, role, {
    size: 11.5,
    color,
    bold: true,
    align: "center",
    fill: pale,
    line: ctx.line(color, 1),
    insets: { left: 4, right: 4, top: 2, bottom: 2 },
  });
  lines.forEach((line, i) => {
    shape(slide, ctx, x + 28, y + 104 + i * 50, 7, 7, { geometry: "ellipse", fill: color, stroke: color });
    text(slide, ctx, x + 48, y + 96 + i * 50, w - 76, 30, line, {
      size: 12,
      color: C.muted,
      valign: "top",
      insets: { left: 0, right: 0, top: 0, bottom: 0 },
    });
  });
}

function value(slide, ctx, x, y, label, color) {
  shape(slide, ctx, x, y, 154, 42, { fill: C.white, stroke: "#DED6C8", strokeWidth: 1 });
  rule(slide, ctx, x, y, 154, 4, color);
  text(slide, ctx, x + 10, y + 13, 134, 18, label, {
    size: 10.5,
    color,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  shape(slide, ctx, 0, 0, ctx.W, ctx.H, { geometry: "rect", fill: C.paper, stroke: C.paper });

  text(slide, ctx, 52, 30, 120, 22, "SIROHI MODEL", {
    size: 10.5,
    color: C.goldDark,
    bold: true,
    align: "center",
    fill: C.goldPale,
    line: ctx.line("#E2C489", 1),
  });
  text(slide, ctx, 52, 64, 760, 42, "Two engines. One livelihood loop.", {
    size: 36,
    color: C.ink,
    bold: true,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 54, 116, 650, 24, "Foundation builds capability. SFPL builds demand. Artisans stay at the center.", {
    size: 15,
    color: C.muted,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 1080, 42, 170, 28, "SIROHI", {
    size: 28,
    color: C.ink,
    bold: true,
    align: "right",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 1080, 72, 170, 14, "MADE BY WOMEN", {
    size: 9,
    color: C.muted,
    bold: true,
    align: "right",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  sideEngine(slide, ctx, 64, 182, 292, 332, "FOUNDATION", "Capability engine", [
    "Mobilise rural and underserved women",
    "Train in craft, design, quality and production",
    "Safeguard fair working conditions",
    "Procure finished goods and check quality",
  ], C.green, C.greenDark, C.greenPale);

  sideEngine(slide, ctx, 924, 182, 292, 332, "SFPL", "Demand engine", [
    "Create market-driven product lines",
    "Build brand, packaging and premium positioning",
    "Sell through D2C, B2B, gifting and exports",
    "Manage customer experience and scale",
  ], C.red, C.redDark, C.redPale);

  shape(slide, ctx, 455, 220, 370, 206, { fill: C.white, stroke: "#CDBFAE", strokeWidth: 1.2 });
  shape(slide, ctx, 505, 250, 270, 116, { geometry: "ellipse", fill: C.greenPale, stroke: C.green, strokeWidth: 2 });
  text(slide, ctx, 540, 272, 200, 26, "WOMEN ARTISANS", {
    size: 20,
    color: C.greenDark,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 540, 304, 200, 34, "Empowered. Skilled. Employed.", {
    size: 13,
    color: C.muted,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  pill(slide, ctx, 520, 382, 110, "fair work", C.green, C.greenPale);
  pill(slide, ctx, 650, 382, 110, "handmade", C.blue, C.bluePale);

  arrow(slide, ctx, 360, 286, 98, 20, C.green, "right");
  text(slide, ctx, 370, 312, 80, 18, "training", { size: 10.5, color: C.green, bold: true, align: "center" });
  arrow(slide, ctx, 456, 356, 98, 20, C.blue, "left");
  text(slide, ctx, 462, 336, 88, 16, "finished goods", { size: 10.2, color: C.blue, bold: true, align: "center" });

  arrow(slide, ctx, 776, 286, 148, 22, C.blue, "right");
  text(slide, ctx, 796, 314, 108, 18, "quality goods to SFPL", { size: 10.2, color: C.blue, bold: true, align: "center" });
  arrow(slide, ctx, 832, 356, 92, 20, C.red, "right");
  text(slide, ctx, 844, 382, 72, 18, "market sales", { size: 10.2, color: C.red, bold: true, align: "center" });

  shape(slide, ctx, 468, 468, 344, 82, { fill: C.goldPale, stroke: "#DDBD7A", strokeWidth: 1.4 });
  text(slide, ctx, 492, 484, 296, 20, "COST-OF-PRODUCTION BRIDGE", {
    size: 14,
    color: C.goldDark,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 496, 512, 288, 24, "SFPL pays Foundation for artisan wages, materials and overheads.", {
    size: 11.2,
    color: C.muted,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  arrow(slide, ctx, 812, 492, 112, 18, C.gold, "left");
  arrow(slide, ctx, 356, 492, 112, 18, C.gold, "left");
  text(slide, ctx, 372, 522, 92, 16, "fair wages", { size: 10.2, color: C.goldDark, bold: true, align: "center" });
  text(slide, ctx, 826, 522, 92, 16, "invoice paid", { size: 10.2, color: C.goldDark, bold: true, align: "center" });

  shape(slide, ctx, 455, 158, 370, 48, { fill: C.ink, stroke: C.ink });
  text(slide, ctx, 476, 170, 328, 20, "CUSTOMERS: consumers, designers, retailers, corporates and institutions", {
    size: 12.2,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  arrow(slide, ctx, 800, 178, 124, 18, C.red, "left");
  text(slide, ctx, 818, 142, 82, 16, "revenue", { size: 10.2, color: C.red, bold: true, align: "center" });

  shape(slide, ctx, 62, 588, 1156, 64, { fill: "#FFFCF5", stroke: C.line, strokeWidth: 1 });
  text(slide, ctx, 84, 606, 134, 18, "VALUE CREATED", {
    size: 12,
    color: C.goldDark,
    bold: true,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  value(slide, ctx, 238, 600, "sustainable incomes", C.green);
  value(slide, ctx, 410, 600, "craft preservation", C.gold);
  value(slide, ctx, 582, 600, "responsible upcycling", C.blue);
  value(slide, ctx, 754, 600, "premium products", C.red);
  value(slide, ctx, 926, 600, "scalable impact", C.green);

  rule(slide, ctx, 52, 676, 1176, 1, "#DED7C9");
  text(slide, ctx, 52, 688, 430, 13, "Source: user-provided model. Fresh one-page composition; no previous slide used.", {
    size: 9.2,
    color: "#7A817B",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  return slide;
}
