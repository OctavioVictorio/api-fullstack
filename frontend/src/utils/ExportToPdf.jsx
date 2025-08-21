import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPdf = (data, title, columns) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.setTextColor(73, 59, 132);
  const pageWidth = doc.internal.pageSize.getWidth();
  const textWidth = doc.getTextWidth(`Listado de ${title}`);
  const x = (pageWidth - textWidth) / 2;
  doc.text(`Listado de ${title}`, x, 22);

  const tableColumn = columns.map((col) => col.header);
  const tableRows = [];

  data.forEach((item) => {
    const row = columns.map((col) => item[col.field]);
    tableRows.push(row);
  });

  autoTable(doc, {
    startY: 30,
    head: [tableColumn],
    body: tableRows,
    styles: {
      fillColor: [233, 236, 239],
      fontSize: 10,
      halign: "center",
    },
    headStyles: {
      fillColor: [73, 59, 132],
      textColor: [255, 255, 255],
      fontStyle: "bold",
    },
    alternateRowStyles: { fillColor: [248, 249, 250] },
  });

  doc.save(`${title}.pdf`);
};