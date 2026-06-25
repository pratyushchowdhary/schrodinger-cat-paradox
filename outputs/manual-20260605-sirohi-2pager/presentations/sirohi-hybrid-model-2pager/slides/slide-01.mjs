import { C, bg, text, rect, line, header, footer, bullet, node, arrow } from "./_shared.mjs";

function lane(slide, ctx, x, title, subtitle, tone) {
  const isFoundation = tone === "foundation";
  const color = isFoundation ? C.foundation : C.sfpl;
  const pale = isFoundation ? C.foundationPale : C.sfplPale;
  const stroke = isFoundation ? C.foundationLine : C.sfplLine;
  rect(slide, ctx, x, 174, 386, 420, { fill: C.white, stroke, strokeWidth: 1.4 });
  rect(slide, ctx, x, 174, 386, 58, { fill: color, stroke: color, strokeWidth: 0 });
  text(slide, ctx, x + 24, 187, 338, 22, title, {
    size: 16,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  text(slide, ctx, x + 24, 211, 338, 16, subtitle, {
    size: 11.5,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  rect(slide, ctx, x + 24, 252, 338, 34, { fill: pale, stroke: stroke, strokeWidth: 1 });
}

export async function slide01(presentation, ctx) {
  const slide = presentation.slides.add();
  bg(slide, ctx);
  header(
    slide,
    ctx,
    "MODEL",
    "The Foundation enables participation; SFPL creates market demand.",
    "A two-entity structure separates inclusion work from the commercial engine.",
    1,
  );

  lane(slide, ctx, 72, "SIROHI FOUNDATION (NPO)", "Inclusion & Capability Building", "foundation");
  lane(slide, ctx, 822, "SIROHI FURNITURE PVT. LTD.", "Commercial Arm, For-Profit", "sfpl");

  text(slide, ctx, 96, 260, 338, 18, "WHAT THE FOUNDATION OWNS", {
    size: 11,
    color: C.foundationDark,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  bullet(slide, ctx, 108, 312, 310, "Identify and mobilise women artisans", C.foundation);
  bullet(slide, ctx, 108, 352, 310, "Provide craft, design, technical and quality training", C.foundation);
  bullet(slide, ctx, 108, 392, 310, "Ensure fair working conditions and safeguarding", C.foundation);
  bullet(slide, ctx, 108, 432, 310, "Monitor social impact and community empowerment", C.foundation);
  node(
    slide,
    ctx,
    108,
    498,
    310,
    58,
    "Output",
    "Empowered, skilled and employed women artisans.",
    { fill: C.foundationPale, stroke: C.foundationLine, titleColor: C.foundationDark, bodySize: 11.2 },
  );

  text(slide, ctx, 846, 260, 338, 18, "WHAT SFPL OWNS", {
    size: 11,
    color: C.sfplDark,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  bullet(slide, ctx, 858, 312, 310, "Design, product development and innovation", C.sfpl);
  bullet(slide, ctx, 858, 352, 310, "Branding, packaging and premium positioning", C.sfpl);
  bullet(slide, ctx, 858, 392, 310, "D2C, B2B, gifting, exports and partnerships", C.sfpl);
  bullet(slide, ctx, 858, 432, 310, "Customer experience and repeat engagement", C.sfpl);
  node(
    slide,
    ctx,
    858,
    498,
    310,
    58,
    "Output",
    "Market demand, revenue and scalable business operations.",
    { fill: C.sfplPale, stroke: C.sfplLine, titleColor: C.sfplDark, bodySize: 11.2 },
  );

  rect(slide, ctx, 512, 244, 266, 282, { fill: C.white, stroke: "#E0C58E", strokeWidth: 1.5 });
  text(slide, ctx, 542, 264, 206, 24, "THE BRIDGE", {
    size: 15,
    color: C.ochreDark,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });
  line(slide, ctx, 558, 302, 154, 1, "#E5D3AA", 1);
  node(
    slide,
    ctx,
    548,
    326,
    190,
    74,
    "Finished goods",
    "Artisans produce handmade products using trained skills.",
    { fill: C.bluePale, stroke: "#B8CDDA", titleColor: C.blue, align: "center", bodySize: 10.7 },
  );
  node(
    slide,
    ctx,
    548,
    424,
    190,
    74,
    "Cost invoice",
    "Foundation invoices SFPL for artisan payments, materials and overheads.",
    { fill: C.ochrePale, stroke: "#E0C58E", titleColor: C.ochreDark, align: "center", bodySize: 10.5 },
  );

  arrow(slide, ctx, 454, 354, 90, 18, C.blue, "products", { labelBelow: true });
  arrow(slide, ctx, 736, 354, 90, 18, C.blue, "to SFPL", { labelBelow: true });
  arrow(slide, ctx, 736, 456, 90, 18, C.ochre, "invoice", { labelBelow: true });

  rect(slide, ctx, 284, 620, 712, 40, { fill: C.ink, stroke: C.ink, strokeWidth: 0 });
  text(slide, ctx, 308, 629, 664, 20, "The Foundation builds access and capability. SFPL builds demand and sustainability.", {
    size: 14.5,
    color: C.white,
    bold: true,
    align: "center",
    insets: { left: 0, right: 0, top: 0, bottom: 0 },
  });

  footer(slide, ctx, 1);
  return slide;
}
