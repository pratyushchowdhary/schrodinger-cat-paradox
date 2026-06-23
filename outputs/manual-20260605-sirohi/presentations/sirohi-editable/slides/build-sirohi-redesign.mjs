import { Presentation, PresentationFile } from "@oai/artifact-tool";

const OUT = "/Users/pcx/Downloads/Check/outputs/manual-20260605-sirohi/presentations/sirohi-editable/output/sirohi-hybrid-business-model-redesigned.pptx";

const W = 1280;
const H = 720;
const C = {
  ink: "#17221A",
  muted: "#5A625A",
  line: "#DAD9D1",
  bg: "#FBFAF7",
  green: "#55704B",
  greenDark: "#34492F",
  greenSoft: "#EDF3E8",
  red: "#A33A49",
  redDark: "#7F2431",
  redSoft: "#F8ECEE",
  gold: "#B58A48",
  goldSoft: "#FBF2DF",
  blue: "#26347C",
  white: "#FFFFFF",
};

const ppt = Presentation.create(undefined, { slideSize: { width: W, height: H } });
const slide = ppt.slides.add();

function shape(x, y, w, h, opts = {}) {
  const s = slide.shapes.add({});
  s.position.set({ left: x, top: y, width: w, height: h });
  s.fill.color = opts.fill ?? "transparent";
  s.line.color = opts.line ?? "transparent";
  s.line.width = opts.lineWidth ?? 1;
  if (opts.radius) s.borderRadius = opts.radius;
  return s;
}

function txt(x, y, w, h, body, opts = {}) {
  const s = shape(x, y, w, h, { fill: opts.fill ?? "transparent", line: "transparent", radius: opts.radius });
  s.text.set(body);
  s.text.typeface = opts.font ?? "Aptos";
  s.text.fontSize = opts.size ?? 13;
  s.text.color = opts.color ?? C.ink;
  s.text.bold = opts.bold ?? false;
  s.text.italic = opts.italic ?? false;
  s.text.alignment = opts.align ?? "left";
  s.text.verticalAlignment = opts.valign ?? "middle";
  s.text.insets = opts.insets ?? { left: 6, right: 6, top: 3, bottom: 3 };
  return s;
}

function pill(x, y, w, h, label, fill, sub) {
  shape(x, y, w, h, { fill, line: fill, radius: 8 });
  txt(x + 14, y + 7, w - 28, 22, label, { bold: true, size: 16.5, color: C.white, align: "center" });
  if (sub) txt(x + 14, y + 30, w - 28, 18, sub, { italic: true, size: 10.5, color: C.white, align: "center" });
}

function card(x, y, w, h, title, body, tone = "green") {
  const fill = tone === "red" ? C.redSoft : tone === "gold" ? C.goldSoft : C.greenSoft;
  const stroke = tone === "red" ? "#DBB0B7" : tone === "gold" ? "#E7C98D" : "#BFD0B7";
  const titleColor = tone === "red" ? C.redDark : tone === "gold" ? C.gold : C.greenDark;
  shape(x, y, w, h, { fill, line: stroke, lineWidth: 1.2, radius: 8 });
  txt(x + 14, y + 12, w - 28, 20, title, { bold: true, size: 12.5, color: titleColor, align: "center" });
  txt(x + 16, y + 38, w - 32, h - 48, body, { size: 10.8, color: C.muted, align: "center", valign: "top" });
}

function smallStep(x, y, w, h, n, title, body, tone = "green") {
  const color = tone === "red" ? C.red : C.green;
  shape(x, y, w, h, { fill: C.white, line: tone === "red" ? "#E1B8BE" : "#C7D7BF", lineWidth: 1, radius: 8 });
  shape(x + 14, y + 16, 34, 34, { fill: color, line: color, radius: 17 });
  txt(x + 14, y + 17, 34, 30, n, { bold: true, size: 13, color: C.white, align: "center" });
  txt(x + 58, y + 12, w - 72, 20, title, { bold: true, size: 11.8, color: tone === "red" ? C.redDark : C.greenDark });
  txt(x + 58, y + 35, w - 72, h - 42, body, { size: 9.7, color: C.muted, valign: "top" });
}

function arrow(x1, y1, x2, y2, color, label, labelY = 0) {
  const horizontal = Math.abs(x2 - x1) >= Math.abs(y2 - y1);
  if (horizontal) {
    const x = Math.min(x1, x2);
    shape(x, y1 - 1.5, Math.abs(x2 - x1) - 10, 3, { fill: color, line: color });
    txt(x2 - 16, y2 - 12, 18, 22, ">", { bold: true, size: 18, color, align: "center" });
  } else {
    const y = Math.min(y1, y2);
    shape(x1 - 1.5, y, 3, Math.abs(y2 - y1) - 10, { fill: color, line: color });
    txt(x2 - 9, y2 - 16, 18, 20, "v", { bold: true, size: 14, color, align: "center" });
  }
  if (label) txt((x1 + x2) / 2 - 72, (y1 + y2) / 2 - 12 + labelY, 144, 22, label, { size: 9.5, color, align: "center" });
}

function bulletBox(x, y, w, h, title, bullets, tone = "green") {
  const fill = tone === "red" ? C.redSoft : C.greenSoft;
  const titleColor = tone === "red" ? C.redDark : C.greenDark;
  shape(x, y, w, h, { fill, line: tone === "red" ? "#E2B5BB" : "#C4D5BC", lineWidth: 1, radius: 8 });
  txt(x + 14, y + 12, w - 28, 18, title, { bold: true, size: 12, color: titleColor, align: "center" });
  bullets.forEach((b, i) => txt(x + 18, y + 42 + i * 28, w - 32, 26, `• ${b}`, { size: 9.7, color: C.muted, valign: "top" }));
}

shape(0, 0, W, H, { fill: C.bg, line: C.bg });
txt(38, 26, 640, 34, "SIROHI HYBRID BUSINESS MODEL", { bold: true, size: 29, color: C.ink });
txt(42, 63, 640, 22, "Two entities. One purpose. Sustainable livelihoods for women artisans.", { italic: true, size: 14.5, color: C.muted });
txt(1110, 30, 128, 30, "SIROHI", { size: 27, color: C.ink, align: "center" });
txt(1122, 58, 104, 14, "MADE BY WOMEN", { size: 8, color: C.muted, align: "center" });

pill(250, 104, 286, 56, "SIROHI FOUNDATION (NPO)", C.green, "Inclusion & Capability Building");
pill(744, 104, 286, 56, "SIROHI FURNITURE PVT. LTD.", C.red, "Commercial Arm (For-Profit)");

shape(54, 184, 184, 392, { fill: C.white, line: "#C7D4C0", lineWidth: 1.2, radius: 8 });
txt(72, 202, 148, 18, "FOUNDATION ROLE", { bold: true, size: 12.5, color: C.greenDark, align: "center" });
[
  "Identify & mobilise women artisans from rural and underserved communities",
  "Provide design, craft and technical training",
  "Continuous capacity building and quality improvement",
  "Ensure fair working conditions and safeguarding",
  "Social impact monitoring and community empowerment",
].forEach((b, i) => txt(74, 242 + i * 62, 140, 42, `• ${b}`, { size: 9.6, color: C.muted, valign: "top" }));

shape(1042, 184, 184, 392, { fill: C.white, line: "#E0B4BA", lineWidth: 1.2, radius: 8 });
txt(1060, 202, 148, 18, "SFPL ROLE", { bold: true, size: 12.5, color: C.redDark, align: "center" });
[
  "Build market demand and ensure business sustainability",
  "Expand to new markets and customer segments",
  "Manage operations efficiently and ensure quality at scale",
  "Generate profits to reinvest in growth and impact",
].forEach((b, i) => txt(1060, 250 + i * 76, 144, 42, `• ${b}`, { size: 9.7, color: C.muted, valign: "top" }));

smallStep(260, 190, 250, 74, "1", "Mobilise & Train", "Craft, design, quality, production and entrepreneurship support.", "green");
smallStep(260, 282, 250, 74, "2", "Women Artisans", "Empowered, skilled and employed through the foundation ecosystem.", "green");
smallStep(260, 374, 250, 74, "3", "Production", "Artisans produce handmade products using trained skills.", "green");
smallStep(260, 466, 250, 74, "4", "Payment to Artisans", "Foundation pays artisans fair wages for the products.", "green");
arrow(385, 264, 385, 282, C.green);
arrow(385, 356, 385, 374, C.green);
arrow(385, 448, 385, 466, C.green);

card(560, 218, 160, 96, "FOUNDATION PROCUREMENT", "Foundation procures finished products from artisans and ensures quality standards.", "green");
shape(560, 406, 160, 106, { fill: C.goldSoft, line: "#E7C98D", lineWidth: 1.2, radius: 8 });
txt(574, 420, 132, 28, "COST OF PRODUCTION\nINVOICED TO SFPL", { bold: true, size: 10.5, color: C.gold, align: "center" });
txt(576, 455, 128, 44, "Foundation invoices SFPL for production cost, including artisan payments, material and overheads.", { size: 8.8, color: C.muted, align: "center", valign: "top" });
arrow(510, 411, 560, 411, C.green, "products supplied", -18);
arrow(640, 314, 640, 406, C.green, "invoice", -6);
arrow(560, 459, 510, 459, C.green, "money flow", 18);

smallStep(770, 190, 250, 70, "1", "Design & Product Development", "Market-driven designs, innovation and product diversification.", "red");
smallStep(770, 274, 250, 70, "2", "Branding & Packaging", "Brand building, storytelling and premium positioning.", "red");
smallStep(770, 358, 250, 70, "3", "Marketing & Sales", "D2C, B2B, corporate gifting, exports and partnerships.", "red");
smallStep(770, 442, 250, 70, "4", "Customer Experience", "Quality assurance, customer service and repeat engagement.", "red");
arrow(720, 266, 770, 266, C.blue, "products transferred to SFPL", -18);

shape(790, 516, 210, 60, { fill: C.redSoft, line: "#DBB0B7", lineWidth: 1.2, radius: 8 });
txt(806, 526, 178, 18, "CUSTOMERS", { bold: true, size: 12.2, color: C.redDark, align: "center" });
txt(808, 548, 174, 18, "Consumers, designers, retailers, corporates and institutions.", { size: 8.8, color: C.muted, align: "center" });
arrow(895, 512, 895, 516, C.red);
txt(784, 588, 222, 18, "REVENUE TO SFPL", { bold: true, size: 11.5, color: C.redDark, align: "center" });
txt(784, 608, 222, 14, "Sales revenue earned from customers.", { size: 8.7, color: C.muted, align: "center" });
arrow(790, 620, 720, 620, C.green, "payment", -22);

shape(76, 630, 1128, 52, { fill: C.white, line: "#E5D3AB", lineWidth: 1.1, radius: 10 });
txt(104, 646, 185, 16, "VALUE CREATED", { bold: true, size: 12, color: C.gold });
[
  "Women earn sustainable incomes",
  "Traditional crafts are preserved and celebrated",
  "Waste materials are upcycled responsibly",
  "Premium quality products delight conscious customers",
  "Scalable, financially sustainable impact enterprise",
].forEach((b, i) => txt(294 + i * 176, 641, 154, 30, b, { size: 8.5, color: C.muted, align: "center", valign: "top" }));

txt(326, 686, 628, 22, "The Foundation enables participation. The For-Profit creates market demand.", { bold: true, size: 13.5, color: C.ink, align: "center" });

const blob = await PresentationFile.exportPptx(ppt);
await blob.save(OUT);
console.log(OUT);
