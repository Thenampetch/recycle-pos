const express = require("express");
const router = express.Router();
const materialController = require("../controllers/material.controller");

// Create Material
router.post("/", materialController.createMaterial);

// Get All Materials
router.get("/", materialController.getAllMaterials);

// Get Material by ObjectId
router.get("/objectid/:id", materialController.getMaterialByObjectId);

// Get Material by id
router.get("/id/:id", materialController.getMaterialById);

// Get Material by name
router.get("/name/:name", materialController.getMaterialsByName);

// Get Material by category
router.get("/category/:category", materialController.getMaterialsByCategory);

// Update Material by ObjectId
router.put("/objectid/:id", materialController.updateMaterialByObjectId);

// Update Material by id
router.put("/id/:id", materialController.updateMaterialById);

// Update Material by name
router.put("/name/:name", materialController.updateMaterialByName);

// Update Material by category
router.put("/category/:category", materialController.updateMaterialByCategory);

// Delete Material by ObjectId
router.delete("/objectid/:id", materialController.deleteMaterialByObjectId);

// Delete Material by id
router.delete("/id/:id", materialController.deleteMaterialById);

// Delete Material by name
router.delete("/name/:name", materialController.deleteMaterialByName);

// Delete Material by category
router.delete("/category/:category", materialController.deleteMaterialByCategory);

module.exports = router;
