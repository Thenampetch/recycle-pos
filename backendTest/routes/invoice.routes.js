const router = require("express").Router();
const InvoiceController = require("../controllers/invoice.controller");
const multer = require("multer");

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
    }
});

const upload = multer({ storage });

// Invoice Routes
router.post("/", InvoiceController.createInvoice);
router.get("/", InvoiceController.getAllInvoices);
router.get("/:invoiceID", InvoiceController.getInvoiceById);
router.put("/:invoiceID", InvoiceController.updateInvoice);
router.post("/:invoiceID/upload", upload.array('images'), InvoiceController.uploadImages); // Image upload route
router.delete("/:invoiceID", InvoiceController.deleteInvoice);

module.exports = router;