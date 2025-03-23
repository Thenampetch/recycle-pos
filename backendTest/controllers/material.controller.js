const { ObjectId } = require("mongodb");

// Create Material
exports.createMaterial = async (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        const newMaterial = { id, name, price, category };

        const result = await req.db.collection("materials").insertOne(newMaterial);
        res.status(201).json({ _id: result.insertedId, ...newMaterial });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Materials
exports.getAllMaterials = async (req, res) => {
    try {
        const materials = await req.db.collection("materials").find().toArray();
        res.json(materials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Material by ObjectId
exports.getMaterialByObjectId = async (req, res) => {
    try {
        const material = await req.db.collection("materials").findOne({ _id: new ObjectId(req.params.id) });

        if (!material) return res.status(404).json({ error: "Material not found" });
        res.json(material);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Material by id
exports.getMaterialById = async (req, res) => {
    try {
        const material = await req.db.collection("materials").findOne({ id: req.params.id });

        if (!material) return res.status(404).json({ error: "Material not found" });
        res.json(material);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Materials by name
exports.getMaterialsByName = async (req, res) => {
    try {
        const materials = await req.db.collection("materials").find({ name: req.params.name }).toArray();

        if (materials.length === 0) return res.status(404).json({ error: "Materials not found" });
        res.json(materials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Materials by category
exports.getMaterialsByCategory = async (req, res) => {
    try {
        const materials = await req.db.collection("materials").find({ category: req.params.category }).toArray();

        if (materials.length === 0) return res.status(404).json({ error: "Materials not found" });
        res.json(materials);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Material by ObjectId
exports.updateMaterialByObjectId = async (req, res) => {
    try {
        const updatedMaterial = await req.db.collection("materials").findOneAndUpdate(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body },
            { returnDocument: "after" }
        );

        if (!updatedMaterial.value) return res.status(404).json({ error: "Material not found" });
        res.json(updatedMaterial.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Material by id
exports.updateMaterialById = async (req, res) => {
    try {
        const updatedMaterial = await req.db.collection("materials").findOneAndUpdate(
            { id: req.params.id },
            { $set: req.body },
            { returnDocument: "after" }
        );

        if (!updatedMaterial.value) return res.status(404).json({ error: "Material not found" });
        res.json(updatedMaterial.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Material by name
exports.updateMaterialByName = async (req, res) => {
    try {
        const updatedMaterial = await req.db.collection("materials").findOneAndUpdate(
            { name: req.params.name },
            { $set: req.body },
            { returnDocument: "after" }
        );

        if (!updatedMaterial.value) return res.status(404).json({ error: "Material not found" });
        res.json(updatedMaterial.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update Material by category
exports.updateMaterialByCategory = async (req, res) => {
    try {
        const updatedMaterial = await req.db.collection("materials").findOneAndUpdate(
            { category: req.params.category },
            { $set: req.body },
            { returnDocument: "after" }
        );

        if (!updatedMaterial.value) return res.status(404).json({ error: "Material not found" });
        res.json(updatedMaterial.value);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Material by ObjectId
exports.deleteMaterialByObjectId = async (req, res) => {
    try {
        const deletedMaterial = await req.db.collection("materials").deleteOne({ _id: new ObjectId(req.params.id) });

        if (deletedMaterial.deletedCount === 0) return res.status(404).json({ error: "Material not found" });
        res.json({ message: "Material deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Material by id
exports.deleteMaterialById = async (req, res) => {
    try {
        const deletedMaterial = await req.db.collection("materials").deleteOne({ id: req.params.id });

        if (deletedMaterial.deletedCount === 0) return res.status(404).json({ error: "Material not found" });
        res.json({ message: "Material deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Material by name
exports.deleteMaterialByName = async (req, res) => {
    try {
        const deletedMaterial = await req.db.collection("materials").deleteOne({ name: req.params.name });

        if (deletedMaterial.deletedCount === 0) return res.status(404).json({ error: "Material not found" });
        res.json({ message: "Material deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete Material by category
exports.deleteMaterialByCategory = async (req, res) => {
    try {
        const deletedMaterial = await req.db.collection("materials").deleteOne({ category: req.params.category });

        if (deletedMaterial.deletedCount === 0) return res.status(404).json({ error: "Material not found" });
        res.json({ message: "Material deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
