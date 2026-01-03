import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

// Input / Output paths
const INPUT_PDF = path.join(__dirname, "../pdfs/Task-2-form.pdf");
const OUTPUT_PDF = path.join(__dirname, "../pdfs/Task-2-Result.pdf");


const orderData = {
    // Order details
    qvOrderId1: "5913394",
    qvOrderId2: "41979611",
    reference: "ORD-2025-885264",

    // Customer details
    customerName: "Bilal Test",
    company: "Taptap",
    customerId: "5535101",
    customerEmail: "bilaltest@yopmail.com",

    // Agent details
    agent: {
        firstName: "Nick",
        lastName: "Alexander",
        email: "nick.alexander@vanaways.co.uk",
        phone: "01172447341",
        ddi: "01123417341"
    },

    creator: {
        firstName: "Agent",
        lastName: "User"
    },

    // Vehicle details FROM IMAGE
    vehicle: {
        make: "RENAULT",
        model: "MASTER LWB DIESEL FWD",
        derivative: "LL35dCi 150 Advance L/Rf",
        bodyType: "Luton Box Van (Tail lift)",
        fuelType: "Diesel",
        transmission: "Manual",
        drivenWheels: "FWD",
        exteriorColor: "Solid - Mineral white",
        year: 2024,
        capCode: "TOPM0014I HE A2    L",
        shortModel: "PROACE MAX",
        price: "£12,000.00",
        status: "In Stock",

        // FROM IMAGE SPECIFIC DETAILS
        sizeOption: "2,000.0 Meters in the range of 3,000m²",
        vehicleOptions: "Dealer to deliver, cost included in purchase price"
    },

    // FROM IMAGE: Finance details
    finance: {
        type: "Cash",
        apr: 10.7,
        termMonths: 24,
        monthlyPayment: "£682.65",
        totalAmount: "£16,383.60",
        annualMileage: 5000,
        depositAmount: "£0.00",
        balloonAmount: "£0.00",
        onTheRoad: "£41,795.00",

        // FROM IMAGE: Price breakdown
        priceBreakdown: {
            sellingPrice: "34,495.83",
            vat: "6,899.17",
            roadFundLicence: "345.00",
            firstRegistrationFee: "55.00",
            onTheRoadTotal: "41,795.00"
        },

        // Alternative from your JSON
        taxes: {
            vat: "£2,400.00",
            rfl: "£345.00",
            frf: "£55.00",
            totalTax: "£2,800.00"
        }
    },

    // FROM IMAGE: Deal details
    dealDetails: {
        delivery: "Free Delivery Mainland UK",
        warranty: "Manufacturer's Warranty included",
        breakdownCover: "Manufacturer's included",
        resistanceCover: "Manufacturer Assistance Cover included"
    },

    // FROM IMAGE: Side Order Form options
    sideOrderForm: {
        applyForFinance: true,
        payYourDeposit: true,
        signYourContract: true,
        organizeDelivery: true
    },

    // Additional details
    proposalNumber: "55020113",
    requiredDate: "2026-01-30",
    notes: "Your notes here",

    // FROM IMAGE: Prepared for details
    preparedFor: {
        companyName: "SWIFE GROUP 1TD",
        contactName: "Tom Gibbons",
        email: "tom@nuecofgs.com",
        address: "Tom Gibbons, SMT4E GROUP LTD, C/O Osi Cutting Technologies Limited, Burgess Road, Sheffield, S9 3WD"
    },

    // FROM IMAGE: Finance table data
    financeTable: {
        sellingPrice: "£24,005.83",
        vat: "6,880.17",
        roadFundLicence: "£345.00",
        firstRegistrationFee: "£55.00",
        onTheRoad: "£41,795.00",
        funder: "Finaways UK Limited , 68 Macrae Road, Bristol, BS20 0DD"
    },

    preparedBy: {
        name: "Agent User", // creator.firstName + lastName
        email: "agent@vanaways.com",
        DDl: "01172447341",
    },
};

// Signature details
const SIGNATURE_TAG = "{{sig_es_:signer1:signature}}";
const SIGNATURE_PAGE_NUMBER = 2;
const SIGNATURE_POSITION = {
    x: 200,
    y: 140,
    size: 12,
};

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

        // --- PAGE 1: Vehicle Details & Signature ---
        const page2 = pages[SIGNATURE_PAGE_NUMBER - 1];
        const page9 = pages[8];


        // Signature Tag
        page2.drawText(SIGNATURE_TAG, {
            x: SIGNATURE_POSITION.x,
            y: SIGNATURE_POSITION.y,
            size: SIGNATURE_POSITION.size,
            font,
            color: rgb(0, 0, 0), // White text
        });


        // --- PAGE 1: Data ---
        const page1 = pages[0];
        const today = new Date().toLocaleDateString('en-GB');

        page1.drawText(orderData.qvOrderId1.toString(), { x: 470, y: 790, size: 18, font: boldFont, color: rgb(1, 1, 1) });
        page1.drawText(`${orderData.creator.firstName} ${orderData.creator.lastName}`, { x: 60, y: 200, size: 10, font, color: rgb(1, 1, 1) });
        page1.drawText("SMT4E GROUP LTD", { x: 60, y: 180, size: 10, font, color: rgb(1, 1, 1) });
        page1.drawText("Tom Gibbons", { x: 60, y: 160, size: 10, font, color: rgb(1, 1, 1) });
        page1.drawText(today, { x: 160, y: 110, size: 10, font, color: rgb(1, 1, 1) });

        page1.drawText(orderData.vehicle.make, { x: 280, y: 200, size: 10, font, color: rgb(1, 1, 1) });
        page1.drawText(orderData.vehicle.model, { x: 280, y: 185, size: 10, font, color: rgb(1, 1, 1) });
        page1.drawText(orderData.vehicle.derivative, { x: 280, y: 170, size: 10, font, color: rgb(1, 1, 1) });
        page1.drawText(orderData.vehicle.fuelType, { x: 280, y: 155, size: 10, font, color: rgb(1, 1, 1) });
        page1.drawText(orderData.vehicle.transmission, { x: 280, y: 140, size: 10, font, color: rgb(1, 1, 1) });


        // --- PAGE 2: Data ---

        page2.drawText(orderData.qvOrderId2.toString(), { x: 480, y: 780, size: 20, font: boldFont, color: rgb(1, 1, 1) });
        page2.drawText(orderData.preparedFor.companyName, { x: 40, y: 720, size: 10, font, color: rgb(0, 0, 0) });
        page2.drawText(orderData.preparedBy.name, { x: 310, y: 738, size: 10, font, color: rgb(0, 0, 0) });
        page2.drawText(orderData.preparedBy.DDl, { x: 310, y: 720, size: 10, font, color: rgb(0, 0, 0) });
        page2.drawText(today, { x: 525, y: 740, size: 10, font, color: rgb(0, 0, 0) });
        page2.drawText(today, { x: 525, y: 720, size: 10, font, color: rgb(0, 0, 0) });
        //--- Vehicle Details ---///
        page2.drawText(orderData.vehicle.make, { x: 48, y: 580, size: 12, font, color: rgb(1, 1, 1) });
        page2.drawText(orderData.vehicle.model, { x: 48, y: 560, size: 10, font, color: rgb(1, 1, 1) });
        page2.drawText(orderData.vehicle.derivative, { x: 48, y: 540, size: 10, font, color: rgb(1, 1, 1) });
        page2.drawText(orderData.vehicle.bodyType, { x: 48, y: 520, size: 10, font, color: rgb(1, 1, 1) });
        page2.drawText(orderData.vehicle.exteriorColor, { x: 115, y: 486, size: 8, font, color: rgb(1, 1, 1) });
        page2.drawText(orderData.vehicle.fuelType, { x: 115, y: 476, size: 8, font, color: rgb(1, 1, 1) });
        page2.drawText(orderData.vehicle.transmission, { x: 115, y: 466, size: 8, font, color: rgb(1, 1, 1) });
        page2.drawText(orderData.vehicle.drivenWheels, { x: 115, y: 456, size: 8, font, color: rgb(1, 1, 1) });                ////----vehi
        ////----Vehicle Options ---////
        page2.drawText(orderData.vehicle.vehicleOptions, { x: 48, y: 390, size: 10, font, maxWidth: 100, lineHeight: 12, color: rgb(1, 1, 1) });
        ////-----Finance Details --////
        page2.drawText(orderData.finance.type, { x: 510, y: 580, size: 10, font, color: rgb(0, 0, 0) });
        page2.drawText(orderData.finance.termMonths.toString(), { x: 510, y: 560, size: 10, font, color: rgb(0, 0, 0) });
        page2.drawText(orderData.dealDetails.breakdownCover, { x: 510, y: 540, size: 10, font, maxWidth: 100, lineHeight: 12, color: rgb(0, 0, 0) });
        ////----Vehicle Price ---////
        page2.drawText(orderData.finance.depositAmount, { x: 518, y: 494, size: 10, font, maxWidth: 100, lineHeight: 12, color: rgb(0, 0, 0) });
        page2.drawText(orderData.finance.depositAmount, { x: 518, y: 474, size: 10, font, maxWidth: 100, lineHeight: 12, color: rgb(0, 0, 0) });
        page2.drawText(orderData.finance.depositAmount, { x: 518, y: 454, size: 10, font, maxWidth: 100, lineHeight: 12, color: rgb(0, 0, 0) });
        page2.drawText(orderData.finance.depositAmount, { x: 518, y: 434, size: 10, font, maxWidth: 100, lineHeight: 12, color: rgb(0, 0, 0) });


        //// --- PAGE 9: Data --- ///
        page9.drawText(orderData.financeTable.vat, { x: 94, y: 312, size: 10, font, color: rgb(0, 0, 0) });
        page9.drawText(orderData.financeTable.funder, { x: 140, y: 290, size: 10, font, color: rgb(0, 0, 0) });



        const modifiedPdfBytes = await pdfDoc.save();
        fs.writeFileSync(OUTPUT_PDF, modifiedPdfBytes);

        console.log(`Success: Data added to Page 1 and Signature added to Page 2.`);
    } catch (error) {
        console.error("Error processing PDF:", error);
    }
}

processOrderForm();




