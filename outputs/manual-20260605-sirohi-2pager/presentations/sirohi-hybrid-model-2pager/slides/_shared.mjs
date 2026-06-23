export const C = {
  paper: "#FBFAF6",
  ink: "#13231B",
  muted: "#5C665F",
  line: "#D8D2C6",
  white: "#FFFFFF",
  foundation: "#55704A",
  foundationDark: "#31482F",
  foundationPale: "#EEF4EA",
  foundationLine: "#B8C9AE",
  sfpl: "#A33A45",
  sfplDark: "#7A2530",
  sfplPale: "#F8ECEE",
  sfplLine: "#D9A7AE",
  ochre: "#B08032",
  ochreDark: "#7B551A",
  ochrePale: "#FBF1DD",
  blue: "#1F4F78",
  bluePale: "#EAF2F7",
};

export function bg(slide, ctx) {
  ctx.addShape(slide, {
    x: 0,
    y: 0,
    w: ctx.W,
    h: ctx.H,
    geometry: "rect",
    fill: C.paper,
    line: ctx.line(C.paper, 0),
  });
}

export function text(slide, ctx, x, y, w, h, value, opts = {}) {
  return ctx.addText(slide, {
    x,
    y,
    w,
    h,
    text: value,
    fontSize: opts.size ?? 14,
    color: opts.color ?? C.ink,
    bold: opts.bold ?? false,
    typeface: opts.face ?? (opts.bold ? ctx.fonts.title : ctx.fonts.body),
    align: opts.align ?? "left",
    valign: opts.valign ?? "middle",
    fill: opts.fill ?? "#00000000",
    line: opts.line ?? ctx.line(),
    insets: opts.insets ?? { left: 6, right: 6, top: 3, bottom: 3 },
    name: opts.name,
  });
}

export function rect(slide, ctx, x, y, w, h, opts = {}) {
  return ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    geometry: opts.geometry ?? "roundRect",
    fill: opts.fill ?? C.white,
    line: ctx.line(opts.stroke ?? C.line, opts.strokeWidth ?? 1),
    name: opts.name,
  });
}

export function line(slide, ctx, x, y, w, h, color = C.line, width = 1) {
  return ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    geometry: "rect",
    fill: color,
    line: ctx.line(color, 0),
  });
}

export function header(slide, ctx, kicker, title, subtitle, page) {
  text(slide, ctx, 52, 34, 86, 22, kicker, {
    size: 11,
    color: C.ochreDark,
    bold: true,
    align: "center",
    fill: C.ochrePale,
    line: ctx.line("#E0C58E", 1),
    insets: { left: 8, right: 8, top: 3, bottom: 3 },
    name: `kicker-${page}-label`,
  });
  text(slide, ctx, 52, 66, 900, 74, title, {
    size: 32,
    color: C.ink,
    bold: true,
    valign: "top",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 54, 146, 760, 22, subtitle, {
    size: 14.5,
    color: C.muted,
    valign: "top",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 1052, 36, 176, 28, "SIROHI", {
    size: 27,
    color: C.ink,
    bold: true,
    align: "right",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 1052, 64, 176, 16, "MADE BY WOMEN", {
    size: 9,
    color: C.muted,
    bold: true,
    align: "right",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export function footer(slide, ctx, page) {
  line(slide, ctx, 52, 676, 1176, 1, "#E2DED5", 1);
  text(slide, ctx, 52, 686, 420, 14, "Source: user-provided Sirohi Hybrid Business Model", {
    size: 9.5,
    color: "#7A817B",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, 1178, 686, 50, 14, `0${page}`, {
    size: 10,
    color: "#7A817B",
    bold: true,
    align: "right",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export function bullet(slide, ctx, x, y, w, label, color = C.ink) {
  rect(slide, ctx, x, y + 7, 6, 6, { fill: color, stroke: color, geometry: "ellipse" });
  text(slide, ctx, x + 14, y, w - 14, 18, label, {
    size: 12.2,
    color: C.muted,
    valign: "top",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export function arrow(slide, ctx, x, y, w, h, color, label, opts = {}) {
  ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    geometry: opts.left ? "leftArrow" : "rightArrow",
    fill: color,
    line: ctx.line(color, 0),
  });
  if (label) {
    text(slide, ctx, x, y + (opts.labelBelow ? h + 6 : -24), w, 18, label, {
      size: opts.labelSize ?? 11,
      color: opts.labelColor ?? color,
      bold: true,
      align: "center",
      insets: { left: 0, right: 0, top: 0, bottom: 0 },
    });
  }
}

export function node(slide, ctx, x, y, w, h, title, body, opts = {}) {
  rect(slide, ctx, x, y, w, h, {
    fill: opts.fill ?? C.white,
    stroke: opts.stroke ?? C.line,
    strokeWidth: opts.strokeWidth ?? 1.2,
  });
  text(slide, ctx, x + 14, y + 12, w - 28, 20, title, {
    size: opts.titleSize ?? 13.5,
    color: opts.titleColor ?? C.ink,
    bold: true,
    align: opts.align ?? "left",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, x + 14, y + 39, w - 28, h - 50, body, {
    size: opts.bodySize ?? 11.5,
    color: C.muted,
    valign: "top",
    align: opts.align ?? "left",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
}
