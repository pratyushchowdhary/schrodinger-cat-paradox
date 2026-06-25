const C = {
  paper: "#F7F2EA",
  ink: "#111D17",
  muted: "#5A625D",
  white: "#FFFFFF",
  green: "#4B6F43",
  green2: "#DDEADB",
  red: "#A53A44",
  red2: "#F1DADC",
  blue: "#1F5A7A",
  blue2: "#DCECF3",
  gold: "#AD7629",
  gold2: "#F6E4BE",
  line: "#D8CEC0",
};

function s(slide, ctx, x, y, w, h, o = {}) {
  return ctx.addShape(slide, {
    x, y, w, h,
    geometry: o.geometry ?? "roundRect",
    fill: o.fill ?? C.white,
    line: ctx.line(o.stroke ?? "transparent", o.strokeWidth ?? 0),
  });
}

function t(slide, ctx, x, y, w, h, value, o = {}) {
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

function arrow(slide, ctx, x, y, w, h, color, dir = "right") {
  const geometry = dir === "left" ? "leftArrow" : dir === "up" ? "upArrow" : dir === "down" ? "downArrow" : "rightArrow";
  s(slide, ctx, x, y, w, h, { geometry, fill: color, stroke: color });
}

function chip(slide, ctx, x, y, w, label, color, fill) {
  s(slide, ctx, x, y, w, 30, { fill, stroke: color, strokeWidth: 1 });
  t(slide, ctx, x + 8, y + 7, w - 16, 14, label, {
    size: 10.5,
    color,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

function mini(slide, ctx, x, y, title, body, color, fill) {
  s(slide, ctx, x, y, 214, 72, { fill, stroke: color, strokeWidth: 1.2 });
  s(slide, ctx, x, y, 214, 5, { geometry: "rect", fill: color, stroke: color });
  t(slide, ctx, x + 14, y + 15, 186, 18, title, {
    size: 12.5,
    color,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  t(slide, ctx, x + 16, y + 38, 182, 22, body, {
    size: 10.2,
    color: C.muted,
    align: "center",
    valign: "top",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  s(slide, ctx, 0, 0, ctx.W, ctx.H, { geometry: "rect", fill: C.paper, stroke: C.paper });

  t(slide, ctx, 54, 30, 112, 22, "SIROHI", {
    size: 10.5,
    color: C.gold,
    bold: true,
    align: "center",
    fill: C.gold2,
    line: ctx.line("#DAB56F", 1),
  });
  t(slide, ctx, 54, 64, 760, 42, "Hybrid model as a livelihood flywheel.", {
    size: 36,
    color: C.ink,
    bold: true,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  t(slide, ctx, 56, 112, 720, 22, "The Foundation opens participation. SFPL creates demand. Money returns to women artisans.", {
    size: 15,
    color: C.muted,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  t(slide, ctx, 1050, 42, 180, 30, "SIROHI", {
    size: 28,
    color: C.ink,
    bold: true,
    align: "right",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  t(slide, ctx, 1050, 72, 180, 14, "MADE BY WOMEN", {
    size: 9,
    color: C.muted,
    bold: true,
    align: "right",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  s(slide, ctx, 98, 174, 1084, 408, { fill: "#FFFCF7", stroke: C.line, strokeWidth: 1.2 });

  s(slide, ctx, 124, 214, 214, 300, { fill: C.green, stroke: C.green });
  t(slide, ctx, 144, 244, 174, 28, "FOUNDATION", {
    size: 22,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  t(slide, ctx, 148, 282, 166, 32, "NPO\nCapability engine", {
    size: 13,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  t(slide, ctx, 150, 354, 162, 78, "Mobilise\nTrain\nSafeguard\nProcure + quality-check", {
    size: 13.2,
    color: "#F4F8F1",
    align: "center",
    valign: "top",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  s(slide, ctx, 942, 214, 214, 300, { fill: C.red, stroke: C.red });
  t(slide, ctx, 968, 244, 162, 28, "SFPL", {
    size: 22,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  t(slide, ctx, 970, 282, 158, 32, "For-profit\nDemand engine", {
    size: 13,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  t(slide, ctx, 970, 354, 158, 78, "Design\nBrand\nSell\nServe customers", {
    size: 13.2,
    color: "#FFF1F2",
    align: "center",
    valign: "top",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  s(slide, ctx, 428, 230, 424, 286, { fill: C.white, stroke: "#C9BDAF", strokeWidth: 1.2 });
  s(slide, ctx, 500, 284, 280, 116, { geometry: "ellipse", fill: C.green2, stroke: C.green, strokeWidth: 2.4 });
  t(slide, ctx, 532, 312, 216, 26, "WOMEN ARTISANS", {
    size: 21,
    color: C.green,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  t(slide, ctx, 548, 346, 184, 20, "skilled | employed | paid fairly", {
    size: 12.4,
    color: C.muted,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  arrow(slide, ctx, 338, 302, 158, 24, C.green, "right");
  t(slide, ctx, 358, 332, 118, 18, "capability", { size: 11, color: C.green, bold: true, align: "center" });
  arrow(slide, ctx, 776, 302, 166, 24, C.blue, "right");
  t(slide, ctx, 802, 332, 116, 18, "products", { size: 11, color: C.blue, bold: true, align: "center" });

  arrow(slide, ctx, 942, 452, 166, 24, C.gold, "left");
  t(slide, ctx, 972, 484, 106, 18, "revenue", { size: 11, color: C.gold, bold: true, align: "center" });
  arrow(slide, ctx, 338, 452, 110, 24, C.gold, "left");
  t(slide, ctx, 348, 484, 120, 18, "fair wages", { size: 11, color: C.gold, bold: true, align: "center" });

  s(slide, ctx, 512, 436, 256, 52, { fill: C.gold2, stroke: "#DAB56F", strokeWidth: 1.2 });
  t(slide, ctx, 528, 449, 224, 18, "COST-OF-PRODUCTION INVOICE", {
    size: 12.2,
    color: C.gold,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  t(slide, ctx, 530, 468, 220, 12, "artisan pay + materials + overheads", {
    size: 9.4,
    color: C.muted,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  s(slide, ctx, 512, 186, 256, 38, { fill: C.ink, stroke: C.ink });
  t(slide, ctx, 530, 196, 220, 16, "CUSTOMERS / MARKETS", {
    size: 12.2,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  arrow(slide, ctx, 768, 196, 174, 18, C.red, "left");
  t(slide, ctx, 806, 170, 98, 16, "sales demand", { size: 10.5, color: C.red, bold: true, align: "center" });

  chip(slide, ctx, 460, 246, 112, "training", C.green, C.green2);
  chip(slide, ctx, 610, 246, 112, "production", C.blue, C.blue2);
  chip(slide, ctx, 460, 524, 112, "quality", C.green, C.green2);
  chip(slide, ctx, 610, 524, 112, "market scale", C.red, C.red2);

  mini(slide, ctx, 112, 608, "Livelihoods", "Sustainable income for women.", C.green, C.green2);
  mini(slide, ctx, 352, 608, "Craft", "Traditional craft stays alive.", C.gold, C.gold2);
  mini(slide, ctx, 592, 608, "Planet", "Waste materials are upcycled.", C.blue, C.blue2);
  mini(slide, ctx, 832, 608, "Enterprise", "Commercial scale funds impact.", C.red, C.red2);

  s(slide, ctx, 54, 678, 1176, 1, { geometry: "rect", fill: C.line, stroke: C.line });
  t(slide, ctx, 54, 690, 470, 12, "Fresh one-page composition from user-provided model. No previous slide used.", {
    size: 9.2,
    color: "#7A817B",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  return slide;
}
