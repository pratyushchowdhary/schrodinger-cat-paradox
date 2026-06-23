const W = 1280;
const H = 720;

const C = {
  paper: "#FAF7EF",
  paper2: "#F4EFE4",
  ink: "#17231B",
  muted: "#5F655F",
  rule: "#D9D0C2",
  white: "#FFFFFF",
  green: "#55724D",
  greenDark: "#293F2A",
  greenSoft: "#EAF1E5",
  red: "#A4434B",
  redDark: "#792934",
  redSoft: "#F7E9EA",
  amber: "#B9893F",
  amberDark: "#815B22",
  amberSoft: "#FAEED7",
  blue: "#2E4F85",
  blueSoft: "#E8EEF7",
};

function addShape(slide, x, y, w, h, opts = {}) {
  const shape = slide.shapes.add({});
  shape.position.set({ left: x, top: y, width: w, height: h });
  shape.fill.color = opts.fill ?? "transparent";
  shape.line.color = opts.line ?? "transparent";
  shape.line.width = opts.lineWidth ?? 1;
  if (opts.radius && w > opts.radius * 2 && h > opts.radius * 2) shape.borderRadius = opts.radius;
  return shape;
}

function addText(slide, x, y, w, h, value, opts = {}) {
  const shape = addShape(slide, x, y, w, h, {
    fill: opts.fill ?? "transparent",
    line: opts.line ?? "transparent",
    lineWidth: opts.lineWidth ?? 1,
    radius: opts.radius,
  });
  shape.text.set(value);
  shape.text.typeface = opts.font ?? "Aptos";
  shape.text.fontSize = opts.size ?? 12;
  shape.text.color = opts.color ?? C.ink;
  shape.text.bold = opts.bold ?? false;
  shape.text.italic = opts.italic ?? false;
  shape.text.alignment = opts.align ?? "left";
  shape.text.verticalAlignment = opts.valign ?? "middle";
  shape.text.insets = opts.insets ?? { left: 6, right: 6, top: 3, bottom: 3 };
  return shape;
}

function header(slide, x, y, w, title, subtitle, tone) {
  const fill = tone === "red" ? C.red : tone === "amber" ? C.amber : C.green;
  addShape(slide, x, y, w, 54, { fill, line: fill, radius: 7 });
  addText(slide, x + 16, y + 7, w - 32, 22, title, {
    bold: true,
    size: 15,
    color: C.white,
    align: "center",
  });
  addText(slide, x + 16, y + 30, w - 32, 16, subtitle, {
    italic: true,
    size: 9.4,
    color: C.white,
    align: "center",
  });
}

function sidebar(slide, x, y, w, h, title, bullets, tone) {
  const soft = tone === "red" ? C.redSoft : C.greenSoft;
  const stroke = tone === "red" ? "#E3BCC1" : "#C9D8C1";
  const titleColor = tone === "red" ? C.redDark : C.greenDark;
  addShape(slide, x, y, w, h, { fill: C.white, line: stroke, lineWidth: 1.1, radius: 7 });
  addShape(slide, x + 10, y + 10, w - 20, 28, { fill: soft, line: soft, radius: 5 });
  addText(slide, x + 14, y + 15, w - 28, 16, title, {
    bold: true,
    size: 10.6,
    color: titleColor,
    align: "center",
  });
  bullets.forEach((bullet, index) => {
    addText(slide, x + 18, y + 54 + index * 56, w - 32, 43, "- " + bullet, {
      size: 8.2,
      color: C.muted,
      valign: "top",
    });
  });
}

function step(slide, x, y, w, h, number, title, body, tone) {
  const color = tone === "red" ? C.red : C.green;
  const dark = tone === "red" ? C.redDark : C.greenDark;
  const stroke = tone === "red" ? "#E2BBC0" : "#CAD9C3";
  addShape(slide, x, y, w, h, { fill: C.white, line: stroke, lineWidth: 1.05, radius: 7 });
  addShape(slide, x + 13, y + 14, 30, 30, { fill: color, line: color, radius: 15 });
  addText(slide, x + 13, y + 16, 30, 25, number, {
    bold: true,
    size: 12,
    color: C.white,
    align: "center",
  });
  addText(slide, x + 54, y + 10, w - 68, 18, title, {
    bold: true,
    size: 10.9,
    color: dark,
  });
  addText(slide, x + 54, y + 31, w - 68, h - 38, body, {
    size: 8.3,
    color: C.muted,
    valign: "top",
  });
}

function roleBox(slide, x, y, w, h, title, body, tone) {
  const soft = tone === "blue" ? C.blueSoft : tone === "amber" ? C.amberSoft : C.greenSoft;
  const stroke = tone === "blue" ? "#BBCBE3" : tone === "amber" ? "#E7C98F" : "#C9D8C1";
  const dark = tone === "blue" ? C.blue : tone === "amber" ? C.amberDark : C.greenDark;
  addShape(slide, x, y, w, h, { fill: soft, line: stroke, lineWidth: 1.05, radius: 7 });
  addText(slide, x + 14, y + 12, w - 28, 24, title, {
    bold: true,
    size: 10.2,
    color: dark,
    align: "center",
  });
  addText(slide, x + 15, y + 42, w - 30, h - 52, body, {
    size: 8.3,
    color: C.muted,
    align: "center",
    valign: "top",
  });
}

function hArrow(slide, x1, y, x2, color, label, labelAbove = true) {
  const left = Math.min(x1, x2);
  const width = Math.abs(x2 - x1);
  addShape(slide, left, y - 1.6, Math.max(6, width - 16), 3.2, { fill: color, line: color });
  addText(slide, x2 - 18, y - 11, 20, 20, ">", {
    bold: true,
    size: 16,
    color,
    align: "center",
  });
  if (label) {
    addText(slide, left + 4, y + (labelAbove ? -25 : 7), width - 22, 18, label, {
      size: 7.8,
      color,
      align: "center",
    });
  }
}

function vArrow(slide, x, y1, y2, color, label) {
  const top = Math.min(y1, y2);
  const height = Math.abs(y2 - y1);
  addShape(slide, x - 1.6, top, 3.2, Math.max(6, height - 14), { fill: color, line: color });
  addText(slide, x - 10, y2 - 17, 20, 20, "v", {
    bold: true,
    size: 13,
    color,
    align: "center",
  });
  if (label) {
    addText(slide, x + 8, top + height / 2 - 12, 80, 22, label, {
      size: 7.6,
      color,
      valign: "middle",
    });
  }
}

function valuePill(slide, x, y, w, title) {
  addShape(slide, x, y, w, 32, { fill: C.white, line: "#E3D5BA", lineWidth: 1, radius: 6 });
  addText(slide, x + 8, y + 5, w - 16, 20, title, {
    size: 8.4,
    color: C.muted,
    align: "center",
  });
}

export async function slide01(presentation) {
  const slide = presentation.slides.add();
  addShape(slide, 0, 0, W, H, { fill: C.paper, line: C.paper });

  addText(slide, 36, 24, 670, 32, "SIROHI HYBRID BUSINESS MODEL", {
    bold: true,
    size: 28,
    color: C.ink,
  });
  addText(slide, 39, 59, 690, 22, "Two entities. One purpose. Sustainable livelihoods for women artisans.", {
    italic: true,
    size: 13,
    color: C.muted,
  });
  addText(slide, 1085, 28, 130, 28, "SIROHI", {
    size: 26,
    color: C.ink,
    align: "center",
  });
  addText(slide, 1074, 58, 154, 14, "MADE BY WOMEN", {
    size: 8,
    color: C.muted,
    align: "center",
  });

  header(slide, 246, 100, 280, "SIROHI FOUNDATION (NPO)", "Inclusion and Capability Building", "green");
  header(slide, 754, 100, 280, "SIROHI FURNITURE PVT. LTD.", "Commercial Arm, For-Profit", "red");

  sidebar(slide, 38, 112, 184, 392, "FOUNDATION ROLE", [
    "Identify and mobilise women artisans from rural and underserved communities",
    "Provide design, craft and technical training",
    "Continuous capacity building and quality improvement",
    "Ensure fair working conditions and safeguarding",
    "Social impact monitoring and community empowerment",
  ], "green");

  step(slide, 248, 176, 278, 62, "1", "Training and Capacity Building", "Craft and design training, skills enhancement, quality training and entrepreneurship support.", "green");
  step(slide, 248, 252, 278, 62, "2", "Women Artisans", "Empowered, skilled and employed through the Sirohi ecosystem.", "green");
  step(slide, 248, 328, 278, 62, "3", "Production", "Artisans produce handmade products using trained skills.", "green");
  step(slide, 248, 404, 278, 62, "4", "Payment to Artisans", "Foundation pays artisans fair wages for finished products.", "green");
  vArrow(slide, 387, 238, 252, C.green);
  vArrow(slide, 387, 314, 328, C.green);
  vArrow(slide, 387, 390, 404, C.green);

  roleBox(slide, 558, 178, 164, 92, "FOUNDATION PROCUREMENT", "Foundation procures finished products from artisans and checks quality standards.", "green");
  roleBox(slide, 558, 324, 164, 120, "COST OF PRODUCTION INVOICE", "Foundation invoices SFPL for total production cost: artisan payments, material, overheads, etc.", "amber");
  addText(slide, 574, 285, 132, 18, "TRANSACTION BRIDGE", {
    bold: true,
    size: 9.5,
    color: C.amberDark,
    align: "center",
  });
  vArrow(slide, 640, 270, 324, C.amber, "invoice");
  hArrow(slide, 526, 224, 558, C.green, "products supplied", true);
  hArrow(slide, 722, 224, 754, C.blue, "products transferred to SFPL", true);
  hArrow(slide, 558, 407, 526, C.green, "SFPL pays Foundation", false);

  step(slide, 754, 176, 278, 58, "1", "Design and Product Development", "Market-driven designs, innovation and product diversification.", "red");
  step(slide, 754, 248, 278, 58, "2", "Branding and Packaging", "Brand building, storytelling and premium positioning.", "red");
  step(slide, 754, 320, 278, 58, "3", "Marketing and Sales", "D2C online and retail, B2B, corporate gifting, exports and partnerships.", "red");
  step(slide, 754, 392, 278, 58, "4", "Customer Experience", "Quality assurance, service, repeat engagement and relationships.", "red");
  roleBox(slide, 790, 470, 210, 54, "CUSTOMERS", "Consumers, interior designers, retailers, corporates, institutions, India and global markets.", "blue");
  vArrow(slide, 893, 234, 248, C.red);
  vArrow(slide, 893, 306, 320, C.red);
  vArrow(slide, 893, 378, 392, C.red);
  vArrow(slide, 893, 450, 470, C.red);
  addText(slide, 782, 530, 224, 16, "REVENUE TO SFPL", {
    bold: true,
    size: 10,
    color: C.redDark,
    align: "center",
  });
  addText(slide, 782, 546, 224, 14, "Sales revenue earned from customers", {
    size: 8,
    color: C.muted,
    align: "center",
  });
  hArrow(slide, 790, 562, 722, C.amber, "customers pay SFPL", false);

  sidebar(slide, 1058, 112, 184, 392, "SFPL ROLE", [
    "Build market demand and ensure business sustainability",
    "Expand to new markets and customer segments",
    "Manage operations efficiently and ensure quality at scale",
    "Generate profits to reinvest in growth and impact",
  ], "red");

  addShape(slide, 38, 584, 1204, 58, { fill: C.paper2, line: "#E4D9C8", lineWidth: 1.1, radius: 8 });
  addText(slide, 58, 602, 130, 18, "VALUE CREATED", {
    bold: true,
    size: 11,
    color: C.amberDark,
  });
  valuePill(slide, 198, 598, 190, "Women earn sustainable incomes");
  valuePill(slide, 400, 598, 195, "Traditional crafts are preserved");
  valuePill(slide, 607, 598, 185, "Waste materials are upcycled");
  valuePill(slide, 804, 598, 198, "Premium products delight customers");
  valuePill(slide, 1014, 598, 204, "Scalable sustainable impact enterprise");

  addShape(slide, 0, 660, W, 60, { fill: C.ink, line: C.ink });
  addText(slide, 180, 668, 920, 20, "The Foundation enables participation. The For-Profit creates market demand.", {
    bold: true,
    size: 13,
    color: C.white,
    align: "center",
  });
  addText(slide, 230, 691, 820, 16, "Together, Sirohi creates a sustainable ecosystem that empowers women and builds a better world.", {
    size: 10.5,
    color: "#DDE4D8",
    align: "center",
  });

  return slide;
}
