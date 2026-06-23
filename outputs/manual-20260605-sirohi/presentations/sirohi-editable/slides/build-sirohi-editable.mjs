import { Presentation, PresentationFile } from "@oai/artifact-tool";

const OUT = "/Users/pcx/Downloads/Check/outputs/manual-20260605-sirohi/presentations/sirohi-editable/output/sirohi-hybrid-business-model-editable.pptx";

const W = 1280;
const H = 720;
const C = {
  ink: "#102116",
  green: "#647A50",
  green2: "#7D906D",
  greenLt: "#EFF4EC",
  red: "#9B2F3E",
  redLt: "#F8EEF0",
  gold: "#B48B4F",
  goldLt: "#FBF5EA",
  navy: "#1F2E79",
  border: "#C9D2C2",
  redBorder: "#D6A8AE",
  gray: "#3C3C3C",
  white: "#FFFFFF",
};

const ppt = Presentation.create(undefined, { slideSize: { width: W, height: H } });
const slide = ppt.slides.add();

function box(x, y, w, h, opts = {}) {
  const s = slide.shapes.add({});
  s.position.set({ left: x, top: y, width: w, height: h });
  s.fill.color = opts.fill ?? C.white;
  s.line.color = opts.line ?? "transparent";
  s.line.width = opts.lineWidth ?? 1;
  return s;
}

function text(x, y, w, h, value, opts = {}) {
  const s = box(x, y, w, h, { fill: opts.fill ?? "transparent", line: "transparent" });
  s.text.set(value);
  s.text.fontSize = opts.size ?? 14;
  s.text.color = opts.color ?? C.ink;
  s.text.typeface = opts.font ?? "Aptos";
  s.text.bold = opts.bold ?? false;
  s.text.italic = opts.italic ?? false;
  s.text.alignment = opts.align ?? "left";
  s.text.verticalAlignment = opts.valign ?? "middle";
  s.text.insets = opts.insets ?? { left: 4, right: 4, top: 2, bottom: 2 };
  return s;
}

function headerPill(x, y, w, h, value, fill) {
  const s = box(x, y, w, h, { fill, line: fill });
  s.borderRadius = 6;
  text(x + 8, y + 5, w - 16, h - 10, value, { color: C.white, bold: true, size: 18, align: "center" });
  return s;
}

function panel(x, y, w, h, title, tone = "green") {
  const line = tone === "red" ? C.redBorder : tone === "gold" ? "#E0C999" : C.border;
  const fill = tone === "red" ? C.redLt : tone === "gold" ? C.goldLt : C.greenLt;
  const s = box(x, y, w, h, { fill: C.white, line, lineWidth: 1.4 });
  s.borderRadius = 8;
  box(x, y, w, 38, { fill, line });
  text(x + 10, y + 7, w - 20, 24, title, { bold: true, size: 13, color: tone === "red" ? C.red : tone === "gold" ? C.gold : C.green, align: "center" });
  return s;
}

function iconCircle(cx, cy, label, fill = C.green) {
  const s = box(cx - 25, cy - 25, 50, 50, { fill, line: fill });
  s.borderRadius = 25;
  text(cx - 21, cy - 13, 42, 26, label, { color: C.white, bold: true, size: 15, align: "center" });
  return s;
}

function arrow(x1, y1, x2, y2, color, label) {
  const horizontal = Math.abs(x2 - x1) >= Math.abs(y2 - y1);
  if (horizontal) {
    const x = Math.min(x1, x2);
    const y = y1 - 1.5;
    box(x, y, Math.abs(x2 - x1) - 10, 3, { fill: color, line: color });
    text(x2 - 15, y1 - 11, 18, 22, ">", { color, bold: true, size: 20, align: "center" });
  } else {
    const y = Math.min(y1, y2);
    box(x1 - 1.5, y, 3, Math.abs(y2 - y1) - 10, { fill: color, line: color });
    text(x1 - 9, y2 - 16, 18, 22, "v", { color, bold: true, size: 16, align: "center" });
  }
  if (label) text((x1 + x2) / 2 - 60, (y1 + y2) / 2 - 18, 120, 24, label, { size: 11, color, align: "center" });
}

function bulletList(x, y, w, items, opts = {}) {
  items.forEach((item, i) => text(x, y + i * (opts.gap ?? 18), w, 18, `${opts.mark ?? "•"} ${item}`, { size: opts.size ?? 12, color: opts.color ?? C.gray }));
}

function roleItem(x, y, glyph, body, tone = "green") {
  text(x, y, 28, 28, glyph, { size: 20, color: tone === "red" ? C.red : C.green, align: "center" });
  text(x + 38, y - 2, 120, 36, body, { size: 10.8, color: C.gray });
}

box(0, 0, W, H, { fill: C.white, line: C.white });

text(28, 18, 650, 34, "SIROHI HYBRID BUSINESS MODEL", { bold: true, size: 30, color: C.ink });
text(32, 55, 620, 22, "Two entities. One purpose. Sustainable livelihoods for women artisans.", { italic: true, size: 15.5, color: "#202820" });
text(1085, 24, 150, 28, "SIROHI", { size: 28, color: C.ink, align: "center" });
text(1108, 53, 112, 14, "MADE BY WOMEN", { size: 8.5, color: C.gray, align: "center" });
text(1060, 20, 34, 34, "*", { size: 34, color: C.gold, align: "center" });

panel(24, 143, 166, 390, "FOUNDATION ROLE", "green");
roleItem(42, 200, "O", "Identify & mobilise women artisans from rural & underserved communities");
roleItem(42, 274, "[]", "Provide design, craft & technical training");
roleItem(42, 348, "<3", "Continuous capacity building & quality improvement");
roleItem(42, 422, "OK", "Ensure fair working conditions & safeguarding");
roleItem(42, 496, "/|", "Social impact monitoring & community empowerment");

headerPill(230, 88, 275, 46, "SIROHI FOUNDATION (NPO)\nInclusion & Capability Building", C.green);
const foundation = box(232, 143, 260, 490, { fill: C.white, line: C.green2, lineWidth: 1.6 });
foundation.borderRadius = 8;
iconCircle(350, 187, "CAP", C.green);
text(262, 235, 190, 20, "TRAINING & CAPACITY BUILDING", { bold: true, size: 12.5, color: C.green, align: "center" });
bulletList(265, 260, 195, ["Craft & design training", "Skills enhancement", "Quality & production training", "Entrepreneurship support"], { size: 10.6, gap: 17 });
arrow(350, 328, 350, 360, C.green);
iconCircle(350, 404, "ART", "#EEF4EA");
text(300, 456, 100, 18, "WOMEN ARTISANS", { bold: true, size: 12, color: C.ink, align: "center" });
text(280, 476, 140, 18, "Empowered. Skilled. Employed.", { size: 10.5, color: C.gray, align: "center" });
arrow(350, 496, 350, 522, C.green);
iconCircle(350, 543, "BOX", C.green);
text(306, 578, 88, 18, "PRODUCTION", { bold: true, size: 12, color: C.green, align: "center" });
text(277, 598, 146, 28, "Artisans produce handmade\nproducts using trained skills", { size: 10.5, color: C.gray, align: "center" });
arrow(350, 625, 350, 610, C.green);
const payArtisans = box(260, 617, 136, 42, { fill: C.greenLt, line: C.green2, lineWidth: 1 });
payArtisans.borderRadius = 6;
text(270, 622, 116, 15, "PAYMENT TO ARTISANS", { bold: true, size: 9.8, color: C.green, align: "center" });
text(272, 638, 112, 16, "Foundation pays fair wages", { size: 8.8, color: C.gray, align: "center" });

const procure = box(575, 300, 136, 126, { fill: C.white, line: C.green2, lineWidth: 1.4 });
procure.borderRadius = 6;
iconCircle(643, 335, "BLDG", C.green2);
text(594, 374, 98, 28, "FOUNDATION\nPROCUREMENT", { bold: true, size: 12, color: C.green, align: "center" });
text(590, 407, 108, 48, "Foundation procures\nfinished products from\nartisans and ensures\nquality standards", { size: 9.5, color: C.gray, align: "center" });
arrow(410, 375, 570, 375, C.green);
text(458, 344, 96, 24, "Products supplied\nto Foundation", { size: 10, color: C.gray, align: "center" });
arrow(712, 375, 785, 375, C.navy);
text(712, 344, 88, 24, "Products transferred\nto SFPL", { size: 10, color: C.navy, align: "center" });
arrow(643, 426, 643, 485, C.green);

const invoice = box(552, 510, 188, 118, { fill: C.white, line: C.green2, lineWidth: 1.2 });
invoice.borderRadius = 6;
invoice.line.style = "dash";
text(570, 526, 150, 18, "COST OF PRODUCTION\nINVOICED TO SFPL", { bold: true, size: 11.5, color: C.green, align: "center" });
text(584, 558, 124, 56, "Foundation invoices SFPL for\nthe total cost of production\n(including artisan payments,\nmaterial, overheads, etc.)", { size: 9.5, color: C.gray, align: "center" });
text(563, 548, 24, 24, "$", { size: 18, color: C.green, align: "center" });
arrow(552, 617, 425, 617, C.green);
arrow(740, 617, 815, 617, C.green, "Payment");

headerPill(785, 88, 290, 46, "SIROHI FURNITURE PVT. LTD.\n(SFPL)", C.red);
const sfpl = box(795, 145, 276, 315, { fill: C.white, line: C.redBorder, lineWidth: 1.5 });
sfpl.borderRadius = 8;
const sfItems = [
  ["DESIGN & PRODUCT\nDEVELOPMENT", "Market-driven designs,\ninnovation & product\ndiversification", "DES"],
  ["BRANDING & PACKAGING", "Brand building, storytelling\n& premium positioning", "BR"],
  ["MARKETING & SALES", "D2C (online & retail), B2B,\ncorporate gifting, exports\n& partnerships", "MKT"],
  ["CUSTOMER EXPERIENCE\n& RELATIONSHIPS", "Quality assurance, customer\nservice & repeat engagement", "CX"],
];
sfItems.forEach(([head, body, icon], i) => {
  const y = 190 + i * 76;
  iconCircle(858, y + 16, icon, C.red);
  text(902, y - 4, 145, 28, head, { bold: true, size: 11.5, color: C.ink });
  text(902, y + 30, 150, 36, body, { size: 9.8, color: C.gray });
});
arrow(933, 460, 933, 510, C.red);

panel(1084, 143, 166, 270, "SFPL ROLE", "red");
roleItem(1102, 200, "/|", "Build market demand and ensure business sustainability", "red");
roleItem(1102, 271, "O", "Expand to new markets & customer segments", "red");
roleItem(1102, 342, "@", "Manage operations efficiently & ensure quality at scale", "red");
roleItem(1102, 413, "Rs", "Generate profits to reinvest in growth and impact", "red");

const customers = box(812, 500, 248, 78, { fill: C.white, line: C.redBorder, lineWidth: 1.4 });
customers.borderRadius = 8;
iconCircle(850, 539, "CUST", C.red);
text(900, 517, 120, 20, "CUSTOMERS", { bold: true, size: 12, color: C.ink });
text(900, 539, 145, 34, "Conscious consumers, interior\ndesigners, retailers, corporates,\ninstitutions (India & Global)", { size: 9.5, color: C.gray });
arrow(933, 578, 933, 613, C.red);
iconCircle(850, 625, "Rs", C.red);
text(900, 611, 120, 20, "REVENUE TO SFPL", { bold: true, size: 12, color: C.red });
text(900, 632, 170, 24, "Sales revenue earned by SFPL\nfrom customers", { size: 9.5, color: C.gray });

panel(1084, 428, 166, 212, "VALUE CREATED", "gold");
bulletList(1098, 476, 130, [
  "Women earn sustainable incomes",
  "Traditional crafts are preserved & celebrated",
  "Waste materials are upcycled responsibly",
  "Premium quality products delight conscious customers",
  "A scalable, financially sustainable impact enterprise",
], { mark: "✓", size: 9.7, gap: 31, color: C.gray });

text(515, 660, 150, 20, "> Product Flow", { size: 11, color: C.gray, align: "center" });
box(516, 668, 30, 3, { fill: C.navy, line: C.navy });
text(670, 660, 140, 20, "> Money Flow", { size: 11, color: C.gray, align: "center" });
box(674, 668, 30, 3, { fill: C.green, line: C.green });

const bottom = box(146, 662, 960, 50, { fill: C.goldLt, line: "#E9D8B8", lineWidth: 1 });
bottom.borderRadius = 8;
iconCircle(330, 687, "IM", "#28734C");
text(386, 672, 500, 18, "The Foundation enables participation. The For-Profit creates market demand.", { bold: true, size: 15, color: C.ink });
text(386, 692, 548, 18, "Together, we create a sustainable ecosystem that empowers women and builds a better world.", { size: 12.5, color: C.gray });

const blob = await PresentationFile.exportPptx(ppt);
await blob.save(OUT);
console.log(OUT);
