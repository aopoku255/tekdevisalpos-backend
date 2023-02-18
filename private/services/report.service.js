const PdfPrinter = require("pdfmake");
const pdfMake = require("pdfmake");
const fs = require("fs");
const Invoice = require("../schemas/Invoice");
async function fetchReports({ req, res }) {
  const { shop_id } = req.body;
  let pdfFile = null;
  const fonts = {
    Roboto: {
      normal: "fonts/Poppins-Regular.ttf",
        bold: "fonts/Poppins-Bold.ttf",
    },
  };
  try {
    const results = Invoice.find({shop_id})
    // Define the PDF content
    const docDefinition = {
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15]
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        },
      content: [
        { text: 'Tables', style: 'header' },
        {
          table: {
            headerRows: 1,
            // widths: ["*", "*", "*", "*", "*"],
            body: [
              ["#", "INVOICE NO.", "NAME", "TOTAL", "DATE"],
              ["Row 1", "Row 1", "Row 1", "Row 1", "Row 1"],
              ["Row 2", "Row 2", "Row 2", "Row 2", "Row 2"],
            ],
          },
        },
      ],
    };

    // Generate the PDF
    // const pdf = pdfMake.createPdf(docDefinition);
    const pdfDoc = new PdfPrinter(fonts);
    let pdfFiles = pdfDoc.createPdfKitDocument(docDefinition);
    pdfFiles.pipe(res.attachment("table.pdf"));
    pdfFiles.end();
    //   pdfFiles.pipe(fs.createWriteStream("tables.pdf"));
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader("Content-Disposition", "attachment; filename=table.pdf");
    return { message: "success" };
  } catch (error) {}
}

module.exports = { fetchReports };
