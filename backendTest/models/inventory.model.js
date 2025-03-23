const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema({
    materialId: { type: mongoose.Schema.Types.ObjectId, ref: "Material", required: true },
    quantity: { type: Number, required: true }
});

module.exports = mongoose.model("Inventory", InventorySchema);
