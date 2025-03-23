const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
    memberId: { type: mongoose.Schema.Types.ObjectId, ref: "Member", required: true },
    date: { type: Date, default: Date.now },
    items: [
        {
            materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
            quantity: { type: Number, required: true },
            pricePerUnit: { type: Number, required: true },
            totalPrice: { type: Number, required: true }
        }
    ]
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
