export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addShape, addText, line } = ctx;

  const colors = {
    ink: "#17201A",
    muted: "#667069",
    faint: "#DCE4DB",
    grid: "#B9C5BC",
    enterprise: "#2F69A5",
    startup: "#2F7D55",
    compliance: "#7655A6",
    finance: "#AA761D",
    legacy: "#7C8780",
    target: "#D95C4A",
  };

  addText(slide, {
    text: "Supplier onboarding & compliance: competitor positioning",
    x: 56,
    y: 34,
    width: 880,
    height: 42,
    fontSize: 28,
    bold: true,
    color: colors.ink,
    typeface: "Aptos Display",
  });
  addText(slide, {
    text: "2x2 is qualitative positioning; market proxy uses the available Vendor Onboarding & Information Management module split.",
    x: 56,
    y: 78,
    width: 920,
    height: 28,
    fontSize: 13,
    color: colors.muted,
  });

  const chart = { x: 70, y: 135, w: 770, h: 470 };
  addShape(slide, { x: chart.x, y: chart.y, width: chart.w, height: chart.h, fill: "#FFFFFF", line: line(colors.faint, 1.2) });
  addShape(slide, { x: chart.x + chart.w / 2, y: chart.y, width: 1.8, height: chart.h, fill: colors.grid });
  addShape(slide, { x: chart.x, y: chart.y + chart.h / 2, width: chart.w, height: 1.8, fill: colors.grid });

  addText(slide, { text: "Enterprise onboarding workflow platforms", x: chart.x + 34, y: chart.y + 18, width: 300, height: 24, fontSize: 13, bold: true, color: colors.muted });
  addText(slide, { text: "Onboarding + compliance platforms", x: chart.x + 430, y: chart.y + 18, width: 300, height: 24, fontSize: 13, bold: true, color: colors.muted });
  addText(slide, { text: "Finance / legacy vendor workflows", x: chart.x + 34, y: chart.y + chart.h - 34, width: 300, height: 24, fontSize: 13, bold: true, color: colors.muted });
  addText(slide, { text: "Specialist compliance modules", x: chart.x + 430, y: chart.y + chart.h - 34, width: 300, height: 24, fontSize: 13, bold: true, color: colors.muted });

  const xPos = (value) => chart.x + value * chart.w;
  const yPos = (value) => chart.y + (1 - value) * chart.h;

  function dot({ name, x, y, color, r = 8, label = "right", note }) {
    const cx = xPos(x);
    const cy = yPos(y);
    addShape(slide, {
      geometry: "ellipse",
      x: cx - r,
      y: cy - r,
      width: r * 2,
      height: r * 2,
      fill: color,
      line: line("#FFFFFF", 1),
    });
    const lx = label === "left" ? cx - 128 : cx + 11;
    const ly = cy - (note ? 13 : 8);
    addText(slide, { text: name, x: lx, y: ly, width: 140, height: 18, fontSize: 11.5, bold: true, color: colors.ink });
    if (note) {
      addText(slide, { text: note, x: lx, y: ly + 15, width: 140, height: 16, fontSize: 9.5, color: colors.muted });
    }
  }

  [
    { name: "SAP Ariba", x: 0.26, y: 0.82, color: colors.enterprise, note: "SAP total rev: EUR 36.8B" },
    { name: "Coupa", x: 0.36, y: 0.86, color: colors.enterprise, note: "$725M FY22" },
    { name: "Ivalua", x: 0.31, y: 0.68, color: colors.enterprise },
    { name: "JAGGAER", x: 0.36, y: 0.62, color: colors.enterprise },
    { name: "GEP", x: 0.40, y: 0.58, color: colors.enterprise },
    { name: "Oracle", x: 0.22, y: 0.64, color: colors.enterprise, label: "left" },
    { name: "Zycus", x: 0.27, y: 0.55, color: colors.enterprise, label: "left" },
    { name: "Zip (SUP)", x: 0.43, y: 0.72, color: colors.startup },
    { name: "Levelpath (SUP)", x: 0.38, y: 0.75, color: colors.startup, label: "left" },
    { name: "ORO Labs (SUP)", x: 0.46, y: 0.66, color: colors.startup },
    { name: "Tonkean (SUP)", x: 0.47, y: 0.61, color: colors.startup },
    { name: "TraceGains", x: 0.77, y: 0.82, color: colors.compliance, note: "private / n.d." },
    { name: "Trustwell", x: 0.82, y: 0.72, color: colors.compliance, note: "private / n.d." },
    { name: "HICX", x: 0.72, y: 0.63, color: colors.compliance },
    { name: "Certa (SUP)", x: 0.65, y: 0.68, color: colors.startup, label: "left" },
    { name: "Basware", x: 0.34, y: 0.36, color: colors.finance },
    { name: "Medius", x: 0.41, y: 0.28, color: colors.finance },
    { name: "Esker", x: 0.29, y: 0.25, color: colors.finance, label: "left" },
    { name: "Tradeshift", x: 0.45, y: 0.18, color: colors.finance },
    { name: "Proactis", x: 0.22, y: 0.20, color: colors.legacy, label: "left" },
    { name: "SAP SRM", x: 0.27, y: 0.39, color: colors.legacy, label: "left" },
    { name: "PeopleSoft / EBS", x: 0.17, y: 0.36, color: colors.legacy, label: "left" },
    { name: "SafetyChain", x: 0.70, y: 0.25, color: colors.compliance },
    { name: "Specright", x: 0.75, y: 0.19, color: colors.compliance },
    { name: "Prewave (SUP)", x: 0.82, y: 0.32, color: colors.startup, note: "private / n.d." },
  ].forEach(dot);

  const tx = xPos(0.62);
  const ty = yPos(0.55);
  addShape(slide, { geometry: "ellipse", x: tx - 14, y: ty - 14, width: 28, height: 28, fill: colors.target, line: line("#FFFFFF", 1.2) });
  addText(slide, { text: "NourishCo target", x: tx + 16, y: ty - 11, width: 160, height: 18, fontSize: 12.5, bold: true, color: colors.ink });
  addText(slide, { text: "supplier onboarding + compliance wedge", x: tx + 16, y: ty + 5, width: 220, height: 18, fontSize: 10, color: colors.muted });

  addText(slide, { text: "Generic supplier onboarding", x: chart.x + 18, y: chart.y + chart.h + 18, width: 270, height: 22, fontSize: 12, color: colors.muted });
  addText(slide, { text: "Compliance-depth onboarding", x: chart.x + chart.w - 245, y: chart.y + chart.h + 18, width: 240, height: 22, fontSize: 12, color: colors.muted, align: "right" });
  addText(slide, { text: "End-to-end\nworkflow", x: 8, y: chart.y + 46, width: 62, height: 48, fontSize: 11, color: colors.muted, align: "center" });
  addText(slide, { text: "Point\nsolution", x: 8, y: chart.y + chart.h - 118, width: 62, height: 44, fontSize: 11, color: colors.muted, align: "center" });

  const noteX = 900;
  addText(slide, { text: "Available market proxy", x: noteX, y: 147, width: 300, height: 26, fontSize: 16, bold: true, color: colors.ink });
  addText(slide, { text: "Vendor Management Systems market, 2026", x: noteX, y: 188, width: 300, height: 20, fontSize: 12, color: colors.muted });
  addText(slide, { text: "$11.51B", x: noteX, y: 210, width: 180, height: 40, fontSize: 30, bold: true, color: colors.ink });
  addShape(slide, { x: noteX, y: 269, width: 250, height: 1.2, fill: colors.faint });
  addText(slide, { text: "Vendor Onboarding & Information Management", x: noteX, y: 294, width: 285, height: 40, fontSize: 14, bold: true, color: colors.ink });
  addText(slide, { text: "31.4% of VMS market", x: noteX, y: 344, width: 220, height: 24, fontSize: 14, color: colors.muted });
  addText(slide, { text: "~$3.61B", x: noteX, y: 374, width: 180, height: 44, fontSize: 34, bold: true, color: colors.target });
  addText(slide, { text: "Public reports do not disclose market share by these 2x2 quadrants; module split is used as the closest available proxy.", x: noteX, y: 442, width: 295, height: 90, fontSize: 12, color: colors.muted });

  addShape(slide, { geometry: "ellipse", x: noteX, y: 565, width: 10, height: 10, fill: colors.startup });
  addText(slide, { text: "(SUP) = newer startup-style entrant", x: noteX + 18, y: 561, width: 230, height: 18, fontSize: 11, color: colors.muted });
  addText(slide, { text: "Sources: Coherent Market Insights module split; company revenue labels shown only where public/defensible.", x: 56, y: 668, width: 980, height: 20, fontSize: 9.5, color: colors.muted });

  return slide;
}
