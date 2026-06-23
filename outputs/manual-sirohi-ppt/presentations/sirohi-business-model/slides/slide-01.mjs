const C = {
  ink: "#123126",
  muted: "#53665D",
  foundation: "#557044",
  foundationLight: "#EEF4E9",
  foundationLine: "#9AAF8A",
  sfpl: "#9C2E3D",
  sfplLight: "#F8ECEE",
  sfplLine: "#D2A1A8",
  value: "#9A6A20",
  valueLight: "#FBF4E5",
  blue: "#1E3A8A",
  green: "#4E7C45",
  bg: "#FBFCF9",
  white: "#FFFFFF",
};

function text(slide, ctx, x, y, w, h, body, opts = {}) {
  return ctx.addText(slide, {
    x, y, w, h,
    text: body,
    fontSize: opts.size ?? 18,
    color: opts.color ?? C.ink,
    bold: opts.bold ?? false,
    typeface: opts.face ?? (opts.bold ? ctx.fonts.title : ctx.fonts.body),
    align: opts.align ?? "left",
    valign: opts.valign ?? "top",
    fill: opts.fill ?? "#00000000",
    line: opts.line ?? ctx.line(),
    insets: opts.insets ?? { left: 6, right: 6, top: 4, bottom: 4 },
  });
}

function box(slide, ctx, x, y, w, h, opts = {}) {
  return ctx.addShape(slide, {
    x, y, w, h,
    geometry: opts.geometry ?? "roundRect",
    fill: opts.fill ?? C.white,
    line: opts.line ?? ctx.line(opts.stroke ?? C.foundationLine, opts.strokeWidth ?? 1.5),
  });
}

function pill(slide, ctx, x, y, w, h, title, subtitle, color) {
  box(slide, ctx, x, y, w, h, {
    fill: color,
    stroke: color,
    strokeWidth: 0,
    geometry: "roundRect",
  });
  text(slide, ctx, x + 12, y + 7, w - 24, 20, title, {
    size: title.length > 30 ? 15.5 : 18,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, x + 12, y + 30, w - 24, 18, subtitle, {
    size: 12.5,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

function bulletList(slide, ctx, x, y, w, h, items, opts = {}) {
  const lines = items.map((item) => `• ${item}`).join("\n");
  text(slide, ctx, x, y, w, h, lines, {
    size: opts.size ?? 12,
    color: opts.color ?? C.ink,
    insets: opts.insets ?? { left: 8, right: 8, top: 6, bottom: 6 },
  });
}

function arrow(slide, ctx, x, y, w, h, color, label, labelColor = color) {
  ctx.addShape(slide, {
    x, y, w, h,
    geometry: "rightArrow",
    fill: color,
    line: ctx.line(color, 0),
  });
  if (label) {
    text(slide, ctx, x - 26, y + h + 2, w + 52, 18, label, {
      size: 10.5,
      color: labelColor,
      bold: true,
      align: "center",
      insets: { left: 0, right: 0, top: 0, bottom: 0 },
    });
  }
}

function processNode(slide, ctx, x, y, w, h, label, note, fill, stroke) {
  box(slide, ctx, x, y, w, h, { fill, stroke, strokeWidth: 1.2 });
  const labelH = label.length > 18 ? 28 : 17;
  text(slide, ctx, x + 10, y + 8, w - 20, labelH, label, {
    size: label.length > 18 ? 11 : 12.5,
    color: stroke,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, x + 12, y + 15 + labelH, w - 24, h - 20 - labelH, note, {
    size: 10.5,
    color: C.ink,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

function rolePanel(slide, ctx, x, y, w, h, title, items, color, fill) {
  box(slide, ctx, x, y, w, h, { fill, stroke: color, strokeWidth: 1.2 });
  text(slide, ctx, x + 8, y + 8, w - 16, 20, title, {
    size: 13,
    color,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  bulletList(slide, ctx, x + 8, y + 34, w - 16, h - 40, items, {
    size: optsSize(items, w),
    insets: { left: 4, right: 4, top: 0, bottom: 0 },
  });
}

function optsSize(items, w) {
  const chars = items.join(" ").length;
  if (w < 170 && chars > 240) return 9.2;
  if (w < 170) return 9.8;
  return 10.4;
}

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();

  ctx.addShape(slide, {
    x: 0,
    y: 0,
    w: ctx.W,
    h: ctx.H,
    geometry: "rect",
    fill: C.bg,
    line: ctx.line(),
  });

  text(slide, ctx, 28, 20, 650, 36, "SIROHI HYBRID BUSINESS MODEL", {
    size: 32,
    bold: true,
    color: C.ink,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 31, 58, 600, 22, "Two entities. One purpose. Sustainable livelihoods for women artisans.", {
    size: 14,
    color: C.muted,
    bold: true,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 1055, 24, 175, 28, "SIROHI", {
    size: 28,
    color: C.ink,
    bold: true,
    align: "right",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 1054, 56, 176, 14, "MADE BY WOMEN", {
    size: 9,
    color: C.muted,
    bold: true,
    align: "right",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  pill(slide, ctx, 232, 94, 270, 52, "SIROHI FOUNDATION (NPO)", "Inclusion & Capability Building", C.foundation);
  pill(slide, ctx, 748, 94, 310, 52, "SIROHI FURNITURE PVT. LTD. (SFPL)", "Commercial Arm (For-Profit)", C.sfpl);

  rolePanel(slide, ctx, 28, 160, 168, 374, "FOUNDATION ROLE", [
    "Identify & mobilise women artisans from rural and underserved communities",
    "Provide design, craft & technical training",
    "Continuous capacity building & quality improvement",
    "Ensure fair working conditions & safeguarding",
    "Social impact monitoring & community empowerment",
  ], C.foundation, C.white);

  box(slide, ctx, 232, 160, 286, 374, { fill: C.white, stroke: C.foundationLine, strokeWidth: 1.4 });
  text(slide, ctx, 257, 176, 236, 20, "TRAINING & CAPACITY BUILDING", {
    size: 13,
    color: C.foundation,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  bulletList(slide, ctx, 272, 200, 206, 72, [
    "Craft & design training",
    "Skills enhancement",
    "Quality & production training",
    "Entrepreneurship support",
  ], { size: 11.5 });

  processNode(slide, ctx, 292, 288, 166, 60, "WOMEN ARTISANS", "Empowered. Skilled. Employed.", C.foundationLight, C.foundation);
  processNode(slide, ctx, 292, 376, 166, 68, "PRODUCTION", "Artisans produce handmade products using trained skills.", C.foundationLight, C.foundation);
  processNode(slide, ctx, 292, 466, 166, 54, "PAYMENT TO ARTISANS", "Foundation pays fair wages.", C.foundationLight, C.foundation);

  ctx.addShape(slide, { x: 361, y: 259, w: 12, h: 28, geometry: "downArrow", fill: C.foundation, line: ctx.line(C.foundation, 0) });
  ctx.addShape(slide, { x: 361, y: 350, w: 12, h: 26, geometry: "downArrow", fill: C.foundation, line: ctx.line(C.foundation, 0) });
  ctx.addShape(slide, { x: 361, y: 445, w: 12, h: 20, geometry: "downArrow", fill: C.foundation, line: ctx.line(C.foundation, 0) });

  arrow(slide, ctx, 520, 327, 92, 18, C.green, "Products supplied to Foundation", C.foundation);
  processNode(slide, ctx, 618, 274, 142, 122, "FOUNDATION PROCUREMENT", "Foundation procures finished products from artisans and ensures quality standards.", C.foundationLight, C.foundation);

  arrow(slide, ctx, 772, 327, 100, 18, C.blue, "Products transferred to SFPL", C.blue);
  box(slide, ctx, 586, 444, 210, 90, { fill: C.white, stroke: C.foundationLine, strokeWidth: 1.2, geometry: "rect" });
  text(slide, ctx, 604, 456, 174, 24, "COST OF PRODUCTION INVOICED TO SFPL", {
    size: 10.5,
    color: C.foundation,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 606, 485, 170, 36, "Includes artisan payments, material, overheads, etc.", {
    size: 10.5,
    color: C.ink,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  arrow(slide, ctx, 795, 482, 64, 14, C.green, "Payment", C.green);
  ctx.addShape(slide, { x: 474, y: 488, w: 46, h: 14, geometry: "leftArrow", fill: C.green, line: ctx.line(C.green, 0) });

  box(slide, ctx, 874, 160, 196, 288, { fill: C.white, stroke: C.sfplLine, strokeWidth: 1.4 });
  const sfplItems = [
    ["DESIGN & PRODUCT DEVELOPMENT", "Market-driven designs, innovation & product diversification"],
    ["BRANDING & PACKAGING", "Brand building, storytelling & premium positioning"],
    ["MARKETING & SALES", "D2C, B2B, corporate gifting, exports & partnerships"],
    ["CUSTOMER EXPERIENCE", "Quality assurance, service & repeat engagement"],
  ];
  sfplItems.forEach(([h, b], i) => {
    const yy = 178 + i * 64;
    ctx.addShape(slide, { x: 891, y: yy + 6, w: 34, h: 34, geometry: "ellipse", fill: C.sfpl, line: ctx.line(C.sfpl, 0) });
    text(slide, ctx, 940, yy, 112, 24, h, {
      size: h.length > 20 ? 9.2 : 10,
      color: C.ink,
      bold: true,
      insets: { left: 0, right: 0, top: 0, bottom: 0 },
    });
    text(slide, ctx, 940, yy + 27, 112, 30, b, {
      size: 7.6,
      color: C.ink,
      insets: { left: 0, right: 0, top: 0, bottom: 0 },
    });
  });

  rolePanel(slide, ctx, 1084, 160, 166, 244, "SFPL ROLE", [
    "Build market demand and ensure business sustainability",
    "Expand to new markets & customer segments",
    "Manage operations efficiently and ensure quality at scale",
    "Generate profits to reinvest in growth and impact",
  ], C.sfpl, C.white);

  processNode(slide, ctx, 892, 462, 160, 76, "CUSTOMERS", "Conscious consumers, designers, retailers, corporates, institutions; India & global.", C.sfplLight, C.sfpl);
  ctx.addShape(slide, { x: 966, y: 449, w: 14, h: 16, geometry: "downArrow", fill: C.sfpl, line: ctx.line(C.sfpl, 0) });
  processNode(slide, ctx, 892, 558, 160, 48, "REVENUE TO SFPL", "Sales revenue earned from customers.", C.sfplLight, C.sfpl);
  ctx.addShape(slide, { x: 966, y: 540, w: 14, h: 16, geometry: "downArrow", fill: C.sfpl, line: ctx.line(C.sfpl, 0) });

  rolePanel(slide, ctx, 1084, 424, 166, 176, "VALUE CREATED", [
    "Women earn sustainable incomes",
    "Traditional crafts are preserved & celebrated",
    "Waste materials are upcycled responsibly",
    "Premium quality products delight conscious customers",
    "Scalable, financially sustainable impact enterprise",
  ], C.value, C.valueLight);

  text(slide, ctx, 498, 640, 64, 18, "Product Flow", {
    size: 11,
    color: C.blue,
    bold: true,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  ctx.addShape(slide, { x: 462, y: 645, w: 30, h: 7, geometry: "rightArrow", fill: C.blue, line: ctx.line(C.blue, 0) });
  text(slide, ctx, 628, 640, 60, 18, "Money Flow", {
    size: 11,
    color: C.green,
    bold: true,
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  ctx.addShape(slide, { x: 592, y: 645, w: 30, h: 7, geometry: "rightArrow", fill: C.green, line: ctx.line(C.green, 0) });

  box(slide, ctx, 188, 664, 904, 36, { fill: "#FFF9EE", stroke: "#E8D3AA", strokeWidth: 1.2 });
  text(slide, ctx, 224, 671, 832, 18, "The Foundation enables participation. The For-Profit creates market demand.", {
    size: 14,
    color: C.ink,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 224, 688, 832, 12, "Together, they create a sustainable ecosystem that empowers women and builds a better world.", {
    size: 10.5,
    color: C.muted,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  return slide;
}
