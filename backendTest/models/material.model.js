const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }
});

module.exports = mongoose.model("Material", MaterialSchema);
