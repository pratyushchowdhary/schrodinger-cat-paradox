const C = {
  paper: "#F8F5ED",
  ink: "#122018",
  muted: "#59625C",
  faint: "#E1D8C9",
  white: "#FFFFFF",
  green: "#496B3E",
  greenDark: "#223B23",
  greenSoft: "#E7F0E3",
  red: "#9C3340",
  redDark: "#641C27",
  redSoft: "#F3E1E4",
  blue: "#1E5877",
  blueSoft: "#DFEEF4",
  gold: "#B0782A",
  goldDark: "#704B16",
  goldSoft: "#F6E5C1",
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

function rect(slide, ctx, x, y, w, h, color) {
  shape(slide, ctx, x, y, w, h, { geometry: "rect", fill: color, stroke: color });
}

function arrow(slide, ctx, x, y, w, h, color, dir = "right") {
  const geometry = dir === "left" ? "leftArrow" : dir === "down" ? "downArrow" : dir === "up" ? "upArrow" : "rightArrow";
  shape(slide, ctx, x, y, w, h, { geometry, fill: color, stroke: color });
}

function micro(slide, ctx, x, y, label, color, fill) {
  shape(slide, ctx, x, y, 118, 30, { fill, stroke: color, strokeWidth: 1 });
  text(slide, ctx, x + 8, y + 7, 102, 14, label, {
    size: 10.4,
    color,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

function wing(slide, ctx, x, y, w, h, side) {
  const isLeft = side === "left";
  const color = isLeft ? C.green : C.red;
  const dark = isLeft ? C.greenDark : C.redDark;
  const soft = isLeft ? C.greenSoft : C.redSoft;
  const title = isLeft ? "SIROHI FOUNDATION" : "SFPL";
  const role = isLeft ? "Inclusion & Capability Building" : "Commercial Arm, For-Profit";
  const tag = isLeft ? "NPO" : "PVT. LTD.";
  const items = isLeft
    ? ["Mobilise women artisans", "Train craft + quality", "Safeguard fair work", "Procure + quality-check"]
    : ["Design market-led products", "Build brand + packaging", "Sell D2C, B2B, gifting, exports", "Serve customers + scale"];

  shape(slide, ctx, x, y, w, h, { fill: C.white, stroke: color, strokeWidth: 1.5 });
  rect(slide, ctx, x, y, w, 9, color);
  text(slide, ctx, x + 24, y + 28, w - 48, 26, title, {
    size: isLeft ? 19 : 22,
    color: dark,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, x + 24, y + 58, w - 48, 20, tag, {
    size: 11.4,
    color,
    bold: true,
    align: "center",
    fill: soft,
    line: ctx.line(color, 1),
  });
  text(slide, ctx, x + 24, y + 90, w - 48, 22, role, {
    size: 12.3,
    color,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  items.forEach((item, i) => {
    const yy = y + 142 + i * 42;
    shape(slide, ctx, x + 30, yy + 6, 8, 8, { geometry: "ellipse", fill: color, stroke: color });
    text(slide, ctx, x + 52, yy, w - 82, 28, item, {
      size: 12.2,
      color: C.muted,
      valign: "top",
      insets: { left: 0, right: 0, top: 0, bottom: 0 },
    });
  });

  const footer = isLeft ? "Pays fair wages through Foundation process" : "Generates revenue and reinvestable profit";
  shape(slide, ctx, x + 24, y + h - 56, w - 48, 34, { fill: soft, stroke: color, strokeWidth: 1 });
  text(slide, ctx, x + 34, y + h - 47, w - 68, 14, footer, {
    size: 10.7,
    color: dark,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

function value(slide, ctx, x, y, title, body, color, fill) {
  shape(slide, ctx, x, y, 196, 62, { fill, stroke: color, strokeWidth: 1.2 });
  rect(slide, ctx, x, y, 196, 5, color);
  text(slide, ctx, x + 14, y + 16, 168, 16, title, {
    size: 12.4,
    color,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, x + 14, y + 36, 168, 16, body, {
    size: 9.8,
    color: C.muted,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  shape(slide, ctx, 0, 0, ctx.W, ctx.H, { geometry: "rect", fill: C.paper, stroke: C.paper });

  text(slide, ctx, 44, 26, 780, 38, "SIROHI HYBRID BUSINESS MODEL", {
    size: 32,
    color: C.ink,
    bold: true,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 46, 68, 740, 20, "Two entities. One livelihood engine. Market demand funds sustainable artisan income.", {
    size: 15,
    color: C.muted,
    bold: true,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 1060, 28, 184, 26, "SIROHI", {
    size: 28,
    color: C.ink,
    bold: true,
    align: "right",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 1060, 58, 184, 14, "MADE BY WOMEN", {
    size: 9,
    color: C.muted,
    bold: true,
    align: "right",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  wing(slide, ctx, 64, 126, 286, 404, "left");
  wing(slide, ctx, 930, 126, 286, 404, "right");

  shape(slide, ctx, 390, 128, 490, 406, { fill: "#FFFDF9", stroke: C.faint, strokeWidth: 1.3 });
  text(slide, ctx, 484, 152, 306, 22, "THE LIVELIHOOD ENGINE", {
    size: 15,
    color: C.goldDark,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  rect(slide, ctx, 520, 188, 240, 1, "#DDCBAF");

  shape(slide, ctx, 476, 214, 280, 118, { geometry: "ellipse", fill: C.greenSoft, stroke: C.green, strokeWidth: 2.2 });
  text(slide, ctx, 512, 244, 208, 24, "WOMEN ARTISANS", {
    size: 20,
    color: C.greenDark,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 528, 276, 176, 18, "empowered | skilled | employed", {
    size: 11.8,
    color: C.muted,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  micro(slide, ctx, 458, 352, "TRAINING", C.green, C.greenSoft);
  micro(slide, ctx, 600, 352, "PRODUCTION", C.blue, C.blueSoft);
  micro(slide, ctx, 742, 352, "QUALITY", C.green, C.greenSoft);

  arrow(slide, ctx, 350, 262, 112, 24, C.green, "right");
  text(slide, ctx, 368, 292, 80, 16, "capability", { size: 10.5, color: C.green, bold: true, align: "center" });
  arrow(slide, ctx, 758, 262, 172, 24, C.blue, "right");
  text(slide, ctx, 794, 292, 98, 16, "product flow", { size: 10.5, color: C.blue, bold: true, align: "center" });

  shape(slide, ctx, 482, 406, 266, 58, { fill: C.goldSoft, stroke: "#D9B66E", strokeWidth: 1.2 });
  text(slide, ctx, 508, 420, 214, 18, "COST-OF-PRODUCTION BRIDGE", {
    size: 12.8,
    color: C.goldDark,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 508, 442, 214, 12, "artisan pay + material + overheads", {
    size: 9.5,
    color: C.muted,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  arrow(slide, ctx, 748, 426, 182, 24, C.gold, "left");
  text(slide, ctx, 790, 456, 96, 16, "invoice paid", { size: 10.5, color: C.goldDark, bold: true, align: "center" });
  arrow(slide, ctx, 350, 426, 132, 24, C.gold, "left");
  text(slide, ctx, 374, 456, 88, 16, "fair wages", { size: 10.5, color: C.goldDark, bold: true, align: "center" });

  shape(slide, ctx, 472, 94, 286, 38, { fill: C.ink, stroke: C.ink });
  text(slide, ctx, 496, 104, 238, 16, "CUSTOMERS & MARKETS", {
    size: 12.3,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  arrow(slide, ctx, 758, 104, 172, 18, C.red, "left");
  text(slide, ctx, 802, 78, 92, 16, "demand", { size: 10.5, color: C.red, bold: true, align: "center" });

  shape(slide, ctx, 58, 560, 1160, 92, { fill: "#FFFDF8", stroke: C.faint, strokeWidth: 1.1 });
  text(slide, ctx, 84, 594, 120, 18, "VALUE CREATED", {
    size: 12,
    color: C.goldDark,
    bold: true,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  value(slide, ctx, 226, 576, "Livelihoods", "Women earn sustainable incomes", C.green, C.greenSoft);
  value(slide, ctx, 440, 576, "Craft", "Traditional craft is preserved", C.gold, C.goldSoft);
  value(slide, ctx, 654, 576, "Upcycling", "Waste materials are reused", C.blue, C.blueSoft);
  value(slide, ctx, 868, 576, "Enterprise", "Profit funds growth and impact", C.red, C.redSoft);

  rect(slide, ctx, 44, 676, 1208, 1, "#DED6C9");
  text(slide, ctx, 44, 690, 560, 12, "Fresh one-page composition from user-provided model; screenshot used only as benchmark.", {
    size: 9.2,
    color: "#7B817C",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  return slide;
}
