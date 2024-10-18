import { createObjectCsvWriter } from 'csv-writer';
import { PDFDocument, rgb } from 'pdf-lib';
import { config } from '../../config.js';

export const exportToCSV = async (data) => {
  const csvWriter = createObjectCsvWriter({
    path: 'exports/transactions.csv',
    header: [
      { id: 'category', title: config.ui.form.categoryLabel },
      { id: 'amount', title: config.ui.form.amountLabel },
      { id: 'type', title: 'Tipo' },
      { id: 'date', title: config.ui.form.dateLabel },
    ],
  });

  try {
    await csvWriter.writeRecords(data);
    console.log(config.ui.export.csvSuccess);
  } catch (error) {
    console.error('Error al exportar CSV:', error);
  }
};

export const exportToPDF = async (data) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);

  page.drawText(config.ui.dashboard.title, {
    x: 50,
    y: 350,
    size: 20,
    color: rgb(0, 0.53, 0.71),
  });

  let yPosition = 320;
  data.forEach((item) => {
    page.drawText(`Categoría: ${item.category}, Monto: $${item.amount}`, {
      x: 50,
      y: yPosition,
      size: 12,
    });
    yPosition -= 20;
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'reporte.pdf';
  document.body.appendChild(link);
  link.click();
  link.remove();

  console.log(config.ui.export.pdfSuccess);
};
