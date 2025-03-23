const { ObjectId } = require("mongodb");

// Create Inventory
exports.createInventory = async (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        const newInventory = { id, name, price, category };

        const result = await req.db.collection("inventory").insertOne(newInventory);
        res.status(201).json({ _id: result.insertedId, ...newInventory });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Inventory
exports.getAllInventory = async (req, res) => {
    try {
        const inventory = await req.db.collection("inventory").find().toArray();
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Inventory by ObjectId
exports.getInventoryByObjectId = async (req, res) => {
    try {
        const inventory = await req.db.collection("inventory").findOne({ _id: new ObjectId(req.params.id) });

        if (!inventory) return res.status(404).json({ error: "Inventory not found" });
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Inventory by id
exports.getInventoryById = async (req, res) => {
    try {
        const inventory = await req.db.collection("inventory").findOne({ id: req.params.id });

        if (!inventory) return res.status(404).json({ error: "Inventory not found" });
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Inventory by name
exports.getInventoryByName = async (req, res) => {
    try {
        const inventory = await req.db.collection("inventory").find({ name: req.params.name }).toArray();

        if (inventory.length === 0) return res.status(404).json({ error: "Inventory not found" });
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Inventory by category
exports.getInventoryByCategory = async (req, res) => {
    try {
        const inventory = await req.db.collection("inventory").find({ category: req.params.category }).toArray();

        if (inventory.length === 0) return res.status(404).json({ error: "Inventory not found" });
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Inventory by ObjectId
exports.updateInventoryByObjectId = async (req, res) => {
    try {
        const updatedInventory = await req.db.collection("inventory").findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body },
            { returnDocument: "after" }
        );

        if (!updatedInventory.value) return res.status(404).json({ error: "Inventory not found" });
        res.json(updatedInventory.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Inventory by id
exports.updateInventoryById = async (req, res) => {
    try {
        const updatedInventory = await req.db.collection("inventory").findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { returnDocument: "after" }
        );

        if (!updatedInventory.value) return res.status(404).json({ error: "Inventory not found" });
        res.json(updatedInventory.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Inventory by name
exports.updateInventoryByName = async (req, res) => {
    try {
        const updatedInventory = await req.db.collection("inventory").findOneAndUpdate(
            { name: req.params.name },
            { $set: req.body },
            { returnDocument: "after" }
        );

        if (!updatedInventory.value) return res.status(404).json({ error: "Inventory not found" });
        res.json(updatedInventory.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Inventory by category
exports.updateInventoryByCategory = async (req, res) => {
    try {
        const updatedInventory = await req.db.collection("inventory").findOneAndUpdate(
            { category: req.params.category },
            { $set: req.body },
            { returnDocument: "after" }
        );

        if (!updatedInventory.value) return res.status(404).json({ error: "Inventory not found" });
        res.json(updatedInventory.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Inventory by ObjectId
exports.deleteInventoryByObjectId = async (req, res) => {
    try {
        const deletedInventory = await req.db.collection("inventory").deleteOne({ _id: new ObjectId(req.params.id) });

        if (deletedInventory.deletedCount === 0) return res.status(404).json({ error: "Inventory not found" });
        res.json({ message: "Inventory deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Inventory by id
exports.deleteInventoryById = async (req, res) => {
    try {
        const deletedInventory = await req.db.collection("inventory").deleteOne({ id: req.params.id });

        if (deletedInventory.deletedCount === 0) return res.status(404).json({ error: "Inventory not found" });
        res.json({ message: "Inventory deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Inventory by name
exports.deleteInventoryByName = async (req, res) => {
    try {
        const deletedInventory = await req.db.collection("inventory").deleteOne({ name: req.params.name });

        if (deletedInventory.deletedCount === 0) return res.status(404).json({ error: "Inventory not found" });
        res.json({ message: "Inventory deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Inventory by category
exports.deleteInventoryByCategory = async (req, res) => {
    try {
        const deletedInventory = await req.db.collection("inventory").deleteOne({ category: req.params.category });

        if (deletedInventory.deletedCount === 0) return res.status(404).json({ error: "Inventory not found" });
        res.json({ message: "Inventory deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
