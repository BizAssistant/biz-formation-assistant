import jsPDF from 'jspdf';

export default function exportPDF(data) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const marginX = 40;
  let y = 60;

  try { doc.addImage('/logo.png', 'PNG', 460, 30, 100, 40); } catch {}
  doc.setFont('helvetica', 'bold'); doc.setFontSize(20);
  doc.text('BizForm – Business Formation Plan', marginX, y);
  doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
  y += 18; doc.text(`Generated: ${new Date().toLocaleDateString()}`, marginX, y);

  const divider = () => { y += 10; doc.setDrawColor(16,185,129); doc.setLineWidth(1); doc.line(marginX, y, 550, y); y += 20; };
  const section = (title, lines) => {
    divider(); doc.setFont('helvetica', 'bold'); doc.setFontSize(14); doc.text(title, marginX, y);
    y += 18; doc.setFont('helvetica', 'normal'); doc.setFontSize(11);
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

  doc.save('business-formation-plan.pdf');
}
