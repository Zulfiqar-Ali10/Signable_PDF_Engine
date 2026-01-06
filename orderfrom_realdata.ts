// import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
// import fs from "fs";
// import path from "path";

// // ------------------------------
// // Input / Output
// // ------------------------------
// const INPUT_PDF = path.join(__dirname, "../pdfs/Task-3-form.pdf");
// const OUTPUT_PDF = path.join(__dirname, "../pdfs/Task-3-Result.pdf");

// // ------------------------------
// // Field Mapping (Sejda generated fields → logical keys)
// // ------------------------------
// const fieldMapping: Record<string, string> = {
//   customer_name: "text_3gzip",
//   contact_name: "text_4mqeg",
//   telephone: "text_5cpgh",
//   mobile: "text_6csye",
//   email: "text_7vbda",
//   address: "text_9ktdg",
//   make_model: "text_10dkvj",
//   exterior_colour: "text_11qmih",
//   interior_colour: "text_13nkzc",
//   interior_trim: "text_15nzde",
//   optional_equipment: "text_16ujcu",
//   dealer_fit_equipment: "text_17bgof",
//   additional_information: "text_18xldc",
//   fuel_type: "text_35wmhr",
//   transmission: "text_36kkit",
//   driven_wheels: "text_39paat",
//   estimated_delivery: "text_40nbfr",
//   order_no: "textarea_47pffx",
//   prepared_for: "textarea_48hcq",
//   prepared_by: "textarea_49mnt",
//   finance_product: "text_19ciyk",
//   term: "text_20ifzb",
//   breakdown_cover: "text_29kmps",
//   deposit: "text_30emyb",
//   regular_payments: "text_31vkbt",
//   final_payment: "text_32qlsm",
//   funder: "text_33wjdz",
//   commission_paid_to_vanaways: "text_41lkki",
// };

// // ------------------------------
// // Order Data
// // ------------------------------
// const orderData = {
//   order: { order_no: "41979611" },
//   orderDetails: { prepared_for: "SMT4E GROUP LTD", prepared_by: "Agent User" },
//   customer: {
//     customer_name: "Tom Gibbons",
//     contact_name: "Tom Gibbons",
//     telephone: "07871 901921",
//     mobile: "07871 901921",
//     email: "tom.gibbons@test.com",
//     address: "C/O Osl Cutting Technologies Limited, Burgess Road, Sheffield S9 3WD",
//   },
//   vehicle: {
//     make_model:
//       "RENAULT MASTER LWB DIESEL FWD LL35dCi 150 Advance L/Rf Luton Box Van [Tail lift]",
//     exterior_colour: "Solid - Mineral white",
//     interior_colour: "Fabric - Dark grey marl with dark grey stitching",
//     interior_trim: "Standard",
//     optional_equipment: "Solid - Mineral white",
//     dealer_fit_equipment: "Dealer to deliver, cost included in purchase price",
//     additional_information: "N/A",
//     fuel_type: "Diesel",
//     transmission: "Manual",
//     driven_wheels: "FWD",
//     estimated_delivery: "30/11/2025",
//   },
//   finance: {
//     finance_product: "Cash",
//     term: "24 Months",
//     breakdown_cover: "Manufacturer Breakdown Cover Included",
//     payment_breakdown: {
//       deposit: "0.00",
//       regular_payments: "682.65",
//       final_payment: "0.00",
//     },
//     funder: "Finaways UK Limited",
//     commission_paid_to_vanaways: "1,250.00",
//   },
// };

// // ------------------------------
// // Main Function
// // ------------------------------
// async function processOrderForm() {
//   try {
//     if (!fs.existsSync(INPUT_PDF)) throw new Error(`Input PDF not found: ${INPUT_PDF}`);

//     const pdfBytes = fs.readFileSync(INPUT_PDF);
//     const pdfDoc = await PDFDocument.load(pdfBytes);
//     const form = pdfDoc.getForm();
//     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

//     // ------------------------------
//     // Helper Function: Fill Fields
//     // ------------------------------
//     const fillFields = (data: Record<string, string>) => {
//       Object.keys(data).forEach((key) => {
//         try {
//           const pdfFieldName = fieldMapping[key];
//           if (!pdfFieldName) {
//             console.warn(`⚠ No mapping for key "${key}", skipping.`);
//             return;
//           }
//           const field = form.getTextField(pdfFieldName);
//           (field as any).setText(data[key]);
//           (field as any).setTextColor(rgb(0, 0, 0)); // black text
//           (field as any).updateAppearances(font);
//         } catch {
//           console.warn(`⚠ Field "${key}" not found in PDF. Skipping.`);
//         }
//       });
//     };

//     // ------------------------------
//     // Fill all sections
//     // ------------------------------
//     fillFields(orderData.customer);
//     fillFields(orderData.vehicle);
//     fillFields(orderData.order);
//     fillFields(orderData.orderDetails);

//     // Finance fields (excluding payment_breakdown)
//     fillFields({
//       finance_product: orderData.finance.finance_product,
//       term: orderData.finance.term,
//       breakdown_cover: orderData.finance.breakdown_cover,
//       funder: orderData.finance.funder,
//       commission_paid_to_vanaways: orderData.finance.commission_paid_to_vanaways,
//     });

//     // Payment breakdown separately
//     fillFields(orderData.finance.payment_breakdown);

//     // ------------------------------
//     // Save PDF
//     // ------------------------------
//     const pdfBytesFilled = await pdfDoc.save();
//     fs.writeFileSync(OUTPUT_PDF, pdfBytesFilled);

//     console.log("✅ Task-3 PDF Filled Successfully");
//   } catch (error) {
//     console.error("❌ Error Processing Task-3 PDF:", error);
//   }
// }

// // ------------------------------
// // Run
// // ------------------------------
// processOrderForm();


