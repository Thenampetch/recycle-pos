const router = require("express").Router();
const InvoiceController = require("../controllers/invoice.controller");

// Invoice Routes
router.post("/", InvoiceController.createInvoice);
router.get("/", InvoiceController.getAllInvoices);
router.get("/:invoiceID", InvoiceController.getInvoiceById);
router.put("/:invoiceID", InvoiceController.updateInvoice);
router.delete("/:invoiceID", InvoiceController.deleteInvoice);

module.exports = router;
