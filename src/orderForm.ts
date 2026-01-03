import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

// --------------------------------------------------
// Input / Output paths
// --------------------------------------------------
const INPUT_PDF = path.join(__dirname, "../pdfs/Task-3-form.pdf");
const OUTPUT_PDF = path.join(__dirname, "../pdfs/Task-3-Result.pdf");

// --------------------------------------------------
// ORDER DATA
// --------------------------------------------------
const orderData = {
  order: {
    orderNo: "41979611",
  },
  orderDetails: {
    preparedFor: "SMT4E GROUP LTD",
    preparedBy: "Agent User",
  },
  customer: {
    customerName: "Tom Gibbons",
    contactName: "Tom Gibbons",
    telephone: "07871 901921",
    mobile: "07871 901921",
    email: "tom.gibbons@test.com",
    address: "C/O Osl Cutting Technologies Limited, Burgess Road, Sheffield S9 3WD",
  },
  vehicle: {
    makeModel:
      "RENAULT MASTER LWB DIESEL FWD LL35dCi 150 Advance L/Rf Luton Box Van [Tail lift]",
    exteriorColour: "Solid - Mineral white",
    interiorColour: "Fabric - Dark grey marl with dark grey stitching",
    interiorTrim: "Standard",
    optionalEquipment: "Solid - Mineral white",
    dealerFitEquipment: "Dealer to deliver, cost included in purchase price",
    additionalInformation: "N/A",
    fuelType: "Diesel",
    transmission: "Manual",
    drivenWheels: "FWD",
    estimatedDelivery: "30/11/2025",
  },
  finance: {
    financeProduct: "Cash",
    term: "24 Months",
    breakdownCover: "Manufacturer Breakdown Cover Included",
    paymentBreakdown: {
      deposit: "0.00",
      regularPayments: {
        months: 24,
        amount: "682.65",
      },
      finalPayment: "0.00",
    },
    funder: "Finaways UK Limited",
    commissionPaidToVanaways: "1,250.00",
  },
};

// --------------------------------------------------
// MAIN FUNCTION
// --------------------------------------------------
async function processOrderForm(): Promise<void> {
  try {
    if (!fs.existsSync(INPUT_PDF)) {
      throw new Error(`Input PDF not found at path: ${INPUT_PDF}`);
    }

    const pdfBytes = fs.readFileSync(INPUT_PDF);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // --------------------------------------------------
    // PAGE 1: DATA
    // --------------------------------------------------
    const page1 = pages[0];

    // Get today's date in DD/MM/YYYY format
    const today = new Date();
    const todayStr = `${today.getDate().toString().padStart(2, "0")}/${
      (today.getMonth() + 1).toString().padStart(2, "0")
    }/${today.getFullYear()}`;

    // Vanaways Header Page 1 Data --------- ///
    page1.drawText(orderData.order.orderNo, { x: 365, y: 810, size: 16, color: rgb(0, 0, 0),});
    page1.drawText(orderData.orderDetails.preparedFor, { x: 365, y: 772, size: 8, color: rgb(0, 0, 0),});
    page1.drawText(orderData.orderDetails.preparedBy, { x: 365, y: 756  , size: 8, color: rgb(0, 0, 0),});
    page1.drawText(todayStr, {x: 365, y: 740, size: 8, font, color: rgb(0, 0, 0), });
    // Order Details Page 1 Data --------- ///
    page1.drawText(orderData.customer.customerName, { x: 190, y: 602  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.customer.contactName, { x: 190, y: 580  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.customer.telephone, { x: 190, y: 560  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.customer.mobile, { x: 190, y: 538  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.customer.email, { x: 190, y: 518  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.customer.address, { x: 190, y: 496  , size: 10, maxWidth: 150,lineHeight: 15, color: rgb(0, 0, 0),});
    /// Vehicle Details -----////
    page1.drawText(orderData.vehicle.makeModel, { x: 90, y: 410  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.vehicle.exteriorColour, { x: 190, y: 390  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.vehicle.interiorColour, { x: 190, y: 368  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.vehicle.interiorTrim, { x: 190, y: 348  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.vehicle.optionalEquipment, { x: 190, y: 328  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.vehicle.dealerFitEquipment, { x: 190, y: 265  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.vehicle.additionalInformation, { x: 190, y: 225  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.vehicle.fuelType, { x: 190, y: 135  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.vehicle.transmission, { x: 190, y: 115  , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.vehicle.drivenWheels, { x: 190, y: 95 , size: 10, color: rgb(0, 0, 0),});
    page1.drawText(orderData.vehicle.estimatedDelivery, { x: 190, y: 75  , size: 10, color: rgb(0, 0, 0),});
    // page1.drawText(todayStr, {x: 190, y: 75, size: 8, font, color: rgb(0, 0, 0), });


    // --------------------------------------------------
    // PAGE 2: DATA
    // --------------------------------------------------
    const page2 = pages[1];

    // Finance Details --------------------------------------
    page2.drawText(orderData.order.orderNo, { x: 320, y: 790, size: 16, color: rgb(0, 0, 0),});
    page2.drawText(orderData.finance.financeProduct, { x: 190, y: 662, size: 10, color: rgb(0, 0, 0),});
    page2.drawText(orderData.finance.term, { x: 190, y: 642, size: 10, color: rgb(0, 0, 0),});
    page2.drawText(orderData.finance.breakdownCover, { x: 190, y: 622, size: 10, color: rgb(0, 0, 0),});
    // Payment BreakDown --------------------------------------
    page2.drawText(orderData.finance.paymentBreakdown.deposit, { x: 256, y: 560, size: 10, color: rgb(0, 0, 0),});
    page2.drawText(orderData.finance.paymentBreakdown.regularPayments.toString(), { x: 275, y: 538, size: 10, color: rgb(0, 0, 0),});
    page2.drawText(orderData.finance.paymentBreakdown.finalPayment, { x: 256, y: 516, size: 10, color: rgb(0, 0, 0),});
    page2.drawText(orderData.finance.funder, { x: 256, y: 495, size: 10, color: rgb(0, 0, 0),});
    page2.drawText(orderData.finance.commissionPaidToVanaways, { x: 256, y: 476, size: 10, color: rgb(0, 0, 0),});







    // --------------------------------------------------
    // SAVE PDF
    // --------------------------------------------------
    const modifiedPdfBytes = await pdfDoc.save();
    fs.writeFileSync(OUTPUT_PDF, modifiedPdfBytes);

    console.log("Task-3 PDF generated successfully");
  } catch (error) {
    console.error("Error processing Task-3 PDF:", error);
  }
}

// --------------------------------------------------
processOrderForm();
