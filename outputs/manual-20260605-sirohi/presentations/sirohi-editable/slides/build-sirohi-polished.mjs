import { Presentation, PresentationFile } from "@oai/artifact-tool";

const OUT = "/Users/pcx/Downloads/Check/outputs/manual-20260605-sirohi/presentations/sirohi-editable/output/sirohi-hybrid-business-model-polished.pptx";
const W = 1280;
const H = 720;

const C = {
  paper: "#FBFAF6",
  ink: "#142119",
  muted: "#59645C",
  rule: "#D8D3C8",
  green: "#58754F",
  greenDark: "#31472D",
  greenPale: "#EEF4EA",
  red: "#A83C4B",
  redDark: "#7F2532",
  redPale: "#F9ECEF",
  gold: "#B38843",
  goldPale: "#FBF1DD",
  blue: "#24387D",
  white: "#FFFFFF",
};

const ppt = Presentation.create(undefined, { slideSize: { width: W, height: H } });
const slide = ppt.slides.add();

function box(x, y, w, h, o = {}) {
  const s = slide.shapes.add({});
  s.position.set({ left: x, top: y, width: w, height: h });
  s.fill.color = o.fill ?? "transparent";
  s.line.color = o.line ?? "transparent";
  s.line.width = o.lineWidth ?? 1;
  if (o.radius) s.borderRadius = o.radius;
  return s;
}

function text(x, y, w, h, value, o = {}) {
  const s = box(x, y, w, h, { fill: o.fill ?? "transparent", line: "transparent", radius: o.radius });
  s.text.set(value);
  s.text.typeface = o.font ?? "Aptos";
  s.text.fontSize = o.size ?? 12;
  s.text.color = o.color ?? C.ink;
  s.text.bold = o.bold ?? false;
  s.text.italic = o.italic ?? false;
  s.text.alignment = o.align ?? "left";
  s.text.verticalAlignment = o.valign ?? "middle";
  s.text.insets = o.insets ?? { left: 5, right: 5, top: 2, bottom: 2 };
  return s;
}

function icon(x, y, glyph, tone = "green") {
  const color = tone === "red" ? C.red : tone === "gold" ? C.gold : C.green;
  box(x, y, 40, 40, { fill: color, line: color, radius: 20 });
  text(x, y + 1, 40, 34, glyph, { color: C.white, bold: true, size: 17, align: "center" });
}

function titlePill(x, y, w, title, sub, tone) {
  const color = tone === "red" ? C.red : C.green;
  box(x, y, w, 58, { fill: color, line: color, radius: 10 });
  text(x + 14, y + 9, w - 28, 22, title, { color: C.white, bold: true, size: 16, align: "center" });
  text(x + 14, y + 33, w - 28, 16, sub, { color: C.white, italic: true, size: 10, align: "center" });
}

function miniCard(x, y, w, title, body, glyph, tone = "green") {
  const pale = tone === "red" ? C.redPale : C.greenPale;
  const stroke = tone === "red" ? "#E0B5BC" : "#C6D8BE";
  const heading = tone === "red" ? C.redDark : C.greenDark;
  box(x, y, w, 82, { fill: C.white, line: stroke, lineWidth: 1.1, radius: 9 });
  icon(x + 14, y + 21, glyph, tone);
  text(x + 66, y + 14, w - 80, 18, title, { bold: true, size: 11.5, color: heading });
  text(x + 66, y + 37, w - 80, 34, body, { size: 9.2, color: C.muted, valign: "top" });
  box(x + 6, y + 6, 5, 70, { fill: pale, line: pale, radius: 2 });
}

function bulletPanel(x, y, w, h, title, bullets, tone = "green") {
  const stroke = tone === "red" ? "#E2B6BC" : "#C5D7BE";
  const heading = tone === "red" ? C.redDark : C.greenDark;
  box(x, y, w, h, { fill: C.white, line: stroke, lineWidth: 1.1, radius: 10 });
  text(x + 16, y + 16, w - 32, 18, title, { bold: true, size: 12.5, color: heading, align: "center" });
  bullets.forEach((b, i) => text(x + 22, y + 52 + i * 42, w - 44, 30, `• ${b}`, { size: 9.2, color: C.muted, valign: "top" }));
}

function railArrow(x, y, w, color, label, labelAbove = true) {
  box(x, y, w - 14, 5, { fill: color, line: color, radius: 2 });
  text(x + w - 20, y - 13, 22, 30, "▶", { color, bold: true, size: 20, align: "center" });
  text(x + 8, y + (labelAbove ? -25 : 9), w - 24, 18, label, { color, size: 9.5, align: "center" });
}

function downArrow(x, y, h, color, label) {
  box(x, y, 5, h - 13, { fill: color, line: color, radius: 2 });
  text(x - 9, y + h - 20, 24, 24, "▼", { color, bold: true, size: 14, align: "center" });
  if (label) text(x + 12, y + h / 2 - 10, 72, 18, label, { color, size: 9.2 });
}

box(0, 0, W, H, { fill: C.paper, line: C.paper });

text(36, 24, 650, 34, "SIROHI HYBRID BUSINESS MODEL", { bold: true, size: 30, color: C.ink });
text(40, 62, 620, 20, "Two entities. One purpose. Sustainable livelihoods for women artisans.", { italic: true, size: 14, color: C.muted });
text(1090, 28, 145, 26, "SIROHI", { size: 27, color: C.ink, align: "center" });
text(1112, 56, 102, 12, "MADE BY WOMEN", { size: 8, color: C.muted, align: "center" });

titlePill(270, 102, 300, "SIROHI FOUNDATION (NPO)", "Inclusion & Capability Building", "green");
titlePill(710, 102, 300, "SIROHI FURNITURE PVT. LTD.", "Commercial Arm (For-Profit)", "red");

bulletPanel(42, 186, 190, 350, "FOUNDATION ROLE", [
  "Identify and mobilise women artisans from rural and underserved communities",
  "Provide design, craft and technical training",
  "Build capacity and improve quality",
  "Ensure fair working conditions and safeguarding",
  "Track social impact and community empowerment",
], "green");

miniCard(270, 184, 292, "Mobilise & Train", "Craft, design, quality, production and entrepreneurship support.", "👥", "green");
miniCard(270, 284, 292, "Women Artisans", "Empowered, skilled and employed through the foundation ecosystem.", "✋", "green");
miniCard(270, 384, 292, "Production", "Artisans produce handmade products using trained skills.", "▣", "green");
miniCard(270, 484, 292, "Payment to Artisans", "Foundation pays artisans fair wages for the products.", "₹", "green");
downArrow(415, 266, 18, C.green);
downArrow(415, 366, 18, C.green);
downArrow(415, 466, 18, C.green);

box(596, 250, 92, 92, { fill: C.greenPale, line: "#C6D8BE", lineWidth: 1.2, radius: 12 });
icon(622, 264, "🏢", "green");
text(608, 307, 68, 18, "FOUNDATION", { bold: true, size: 10.2, color: C.greenDark, align: "center" });
text(604, 324, 76, 15, "PROCUREMENT", { bold: true, size: 9.4, color: C.greenDark, align: "center" });
text(584, 350, 116, 45, "Procures finished products from artisans and ensures quality standards.", { size: 8.8, color: C.muted, align: "center", valign: "top" });

box(568, 444, 148, 88, { fill: C.goldPale, line: "#E6C78E", lineWidth: 1.2, radius: 10 });
icon(579, 466, "₹", "gold");
text(624, 458, 80, 28, "COST INVOICED\nTO SFPL", { bold: true, size: 10.2, color: C.gold, align: "center" });
text(592, 490, 110, 32, "Includes artisan payments, material and overheads.", { size: 8.6, color: C.muted, align: "center", valign: "top" });

railArrow(562, 294, 58, C.green, "products supplied", true);
railArrow(688, 294, 62, C.blue, "products transferred to SFPL", true);
downArrow(640, 342, 102, C.green, "invoice");
railArrow(510, 486, 58, C.green, "money flow", false);

miniCard(750, 184, 286, "Design & Product Development", "Market-driven designs, innovation and product diversification.", "✎", "red");
miniCard(750, 284, 286, "Branding & Packaging", "Brand building, storytelling and premium positioning.", "◆", "red");
miniCard(750, 384, 286, "Marketing & Sales", "D2C, B2B, corporate gifting, exports and partnerships.", "↗", "red");
miniCard(750, 484, 286, "Customer Experience", "Quality assurance, customer service and repeat engagement.", "♡", "red");
downArrow(892, 266, 18, C.red);
downArrow(892, 366, 18, C.red);
downArrow(892, 466, 18, C.red);

bulletPanel(1048, 186, 190, 350, "SFPL ROLE", [
  "Build market demand and business sustainability",
  "Expand to new markets and customer segments",
  "Manage operations efficiently and ensure quality at scale",
  "Generate profits to reinvest in growth and impact",
], "red");

box(748, 590, 292, 48, { fill: C.redPale, line: "#E2B6BC", lineWidth: 1.1, radius: 10 });
icon(760, 594, "👤", "red");
text(812, 596, 94, 18, "CUSTOMERS", { bold: true, size: 11.5, color: C.redDark });
text(812, 615, 210, 14, "Consumers, designers, retailers, corporates and institutions.", { size: 8.5, color: C.muted });
downArrow(892, 566, 24, C.red);
text(746, 648, 136, 16, "REVENUE TO SFPL", { bold: true, size: 11, color: C.redDark, align: "center" });
text(884, 648, 160, 16, "Sales revenue from customers", { size: 8.7, color: C.muted });
railArrow(716, 668, 78, C.green, "payment", true);

box(50, 570, 640, 92, { fill: C.white, line: "#E5D1A8", lineWidth: 1.1, radius: 12 });
text(74, 588, 150, 18, "VALUE CREATED", { bold: true, size: 12.5, color: C.gold });
[
  "Women earn sustainable incomes",
  "Traditional crafts are preserved and celebrated",
  "Waste materials are upcycled responsibly",
  "Premium quality products delight conscious customers",
  "Scalable, financially sustainable impact enterprise",
].forEach((b, i) => text(80 + (i % 3) * 196, 616 + Math.floor(i / 3) * 24, 176, 18, `✓ ${b}`, { size: 8.8, color: C.muted }));

text(308, 684, 664, 22, "The Foundation enables participation. The For-Profit creates market demand.", { bold: true, size: 14, color: C.ink, align: "center" });

const blob = await PresentationFile.exportPptx(ppt);
await blob.save(OUT);
console.log(OUT);
