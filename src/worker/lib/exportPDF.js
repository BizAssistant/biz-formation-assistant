import jsPDF from 'jspdf';

export default function exportPDF(data) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const marginX = 40;
  let y = 60;

  // Futuristic header
  doc.setFillColor(15, 23, 42); // deep navy background
  doc.rect(0, 0, doc.internal.pageSize.width, 80, 'F');
  doc.setTextColor(124, 58, 237); // purple
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('BizForm – Futuristic Business Plan', marginX, 50);

  doc.setTextColor(226, 232, 240); // light gray
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  y = 100;
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, marginX, y);

  const divider = () => {
    y += 10;
    doc.setDrawColor(6, 182, 212); // cyan accent
    doc.setLineWidth(1.5);
    doc.line(marginX, y, 550, y);
    y += 20;
  };

  const section = (title, lines) => {
    divider();
    doc.setTextColor(124, 58, 237); // purple headings
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(title, marginX, y);
    y += 18;

    doc.setTextColor(226, 232, 240); // light gray body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    for (const line of lines) {
      const wrapped = doc.splitTextToSize(line, 500);
      doc.text(wrapped, marginX, y);
      y += 14 * wrapped.length;
      if (y > 780) { doc.addPage(); y = 60; }
    }
  };

  section('Business Concept', [
    `Name: ${data.concept?.name || 'N/A'}`,
    `Industry: ${data.concept?.industry || 'N/A'}`,
    `Description: ${data.concept?.description || 'N/A'}`,
    `Target Market: ${data.concept?.target || 'N/A'}`
  ]);

  section('Entity Selection', [
    `Type: ${data.entity?.type || 'N/A'}`,
    `State: ${data.entity?.state || 'N/A'}`
  ]);

  section('Registration', [data.registration?.notes || 'No notes yet']);

  section('Marketing Strategy', [
    `Value Proposition: ${data.marketing?.uvp || 'N/A'}`,
    `Budget: $${data.marketing?.budget || '0'}/month`,
    `90-Day Plan: ${data.marketing?.plan90 || 'N/A'}`
  ]);

  section('Financial Setup', [
    `Startup Costs: $${data.finance?.startupCosts || '0'}`,
    `Funding Source: ${data.finance?.fundingSource || 'N/A'}`,
    `Pricing Strategy: ${data.finance?.pricing || 'N/A'}`
  ]);

  section('Website & Hosting', [
    `Domain: ${data.website?.domain || 'N/A'}`,
    `Platform: ${data.website?.platform || 'N/A'}`,
    `Hosting: ${data.website?.hosting || 'N/A'}`
  ]);

  doc.save('bizform-futuristic-plan.pdf');
}
