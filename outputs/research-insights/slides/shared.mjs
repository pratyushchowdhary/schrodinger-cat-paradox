export const C = {
  ink: "#101426",
  forest: "#063728",
  green: "#2F7D55",
  red: "#C71F1F",
  amber: "#9A5B00",
  blue: "#2F67D8",
  muted: "#59645F",
  line: "#C6CEC8",
  bg: "#FBF8FF",
  panel: "#FFFFFF",
  pale: "#F2F1FF",
  greenPale: "#E5F6ED",
  redPale: "#FFE8E6",
  amberPale: "#FFF3D4",
};

export function l(ctx, color = C.line, width = 1) {
  return ctx.line(color, width);
}

export function base(slide, ctx, title, subtitle) {
  const { addShape, addText } = ctx;
  addShape(slide, { x: 0, y: 0, width: 1280, height: 720, fill: C.bg });
  addShape(slide, { x: 0, y: 0, width: 1280, height: 72, fill: C.panel, line: l(ctx, C.line, 1) });
  addText(slide, { text: "NourishCo Research & Insights", x: 56, y: 22, width: 390, height: 24, fontSize: 18, bold: true, color: C.forest, typeface: "Aptos Display" });
  addText(slide, { text: title, x: 56, y: 104, width: 900, height: 44, fontSize: 32, bold: true, color: C.ink, typeface: "Aptos Display" });
  if (subtitle) addText(slide, { text: subtitle, x: 58, y: 150, width: 980, height: 28, fontSize: 14, color: C.muted });
}

export function card(slide, ctx, x, y, w, h, title, body, opts = {}) {
  const { addShape, addText } = ctx;
  addShape(slide, { x, y, width: w, height: h, fill: opts.fill || C.panel, line: l(ctx, opts.line || C.line, 1.1) });
  if (opts.accent) addShape(slide, { x, y, width: 5, height: h, fill: opts.accent });
  addText(slide, { text: title, x: x + 22, y: y + 18, width: w - 44, height: 26, fontSize: opts.titleSize || 17, bold: true, color: opts.titleColor || C.ink, typeface: "Aptos Display" });
  addText(slide, { text: body, x: x + 22, y: y + 55, width: w - 44, height: h - 70, fontSize: opts.bodySize || 12.5, color: opts.bodyColor || C.muted, breakLine: false });
}

export function pill(slide, ctx, text, x, y, w, fill, color = C.ink) {
  const { addShape, addText } = ctx;
  addShape(slide, { x, y, width: w, height: 26, fill, line: l(ctx, fill, 1), radius: 13 });
  addText(slide, { text, x: x + 10, y: y + 6, width: w - 20, height: 14, fontSize: 9.5, bold: true, color, align: "center" });
}

export function footer(slide, ctx, page) {
  const { addText, addShape } = ctx;
  addShape(slide, { x: 56, y: 676, width: 1168, height: 1, fill: C.line });
  addText(slide, { text: "Fictional case study. Public market numbers are directional proxies, not exact NourishCo TAM.", x: 58, y: 688, width: 720, height: 16, fontSize: 8.5, color: C.muted });
  addText(slide, { text: String(page).padStart(2, "0"), x: 1180, y: 686, width: 40, height: 18, fontSize: 10, color: C.muted, align: "right" });
}
