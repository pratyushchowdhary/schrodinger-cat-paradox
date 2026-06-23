import { base, card, footer, C } from "./shared.mjs";

export async function slide07(presentation, ctx) {
  const slide = presentation.slides.add();
  const { addShape, addText } = ctx;
  base(slide, ctx, "Stress Cases, Edge Cases & Scalability", "Where the product must not break under real-world operating pressure.");

  card(slide, ctx, 66, 206, 360, 238, "Operational Edge Cases", "• Supplier uploads too many/large files\n• OCR cannot read a document\n• License expired or date is ambiguous\n• Supplier name/address mismatch\n• Same supplier applies under multiple names\n• Supplier needs immediate removal/suspension\n• Product recall requires item-level flagging", { accent: C.red, bodySize: 11.5 });

  card(slide, ctx, 460, 206, 360, 238, "Risk & Exception Handling", "• External news flags malpractice or contamination\n• Factory fire reduces vendor capacity\n• Government import rule changes affect packaging materials\n• Drought/low rainfall affects agricultural inputs\n• Audit failure triggers corrective action plan\n• Supplier disputes extracted data or compliance decision", { accent: C.amber, bodySize: 11.5 });

  card(slide, ctx, 854, 206, 360, 238, "Scalability Considerations", "• Multi-brand and multi-region rule templates\n• Supplier master and entity resolution\n• Document versioning and retention\n• Async parsing queues and retry paths\n• Role-based permissions and audit logs\n• API-ready architecture for ERP/procurement tools\n• Reporting by brand, category, geography, and reviewer", { accent: C.blue, bodySize: 11.5 });

  addShape(slide, { x: 66, y: 486, width: 1148, height: 92, fill: C.panel, line: { color: C.line, width: 1.1 } });
  addShape(slide, { x: 66, y: 486, width: 5, height: 92, fill: C.green });
  addText(slide, { text: "Risk control principle", x: 90, y: 504, width: 180, height: 20, fontSize: 14, bold: true, color: C.forest });
  addText(slide, { text: "Automation can identify, route, summarize, and recommend. It should not silently approve suppliers, hide uncertainty, or overwrite source documents. Every high-impact action needs a visible owner, reason, timestamp, and rollback path.", x: 270, y: 504, width: 850, height: 42, fontSize: 13.4, color: C.ink });

  footer(slide, ctx, 7);
  return slide;
}
