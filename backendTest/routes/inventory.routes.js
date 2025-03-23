const router = require("express").Router();
const InventoryController = require("../controllers/inventory.controller");

// Create Inventory
router.post("/", InventoryController.createInventory);

// Get All Inventory
router.get("/", InventoryController.getAllInventory);

// Get Inventory by id
router.get("/id/:id", InventoryController.getInventoryById);

// Get Inventory by name
router.get("/name/:name", InventoryController.getInventoryByName);

// Get Inventory by category
router.get("/category/:category", InventoryController.getInventoryByCategory);

// Update Inventory by id
router.put("/id/:id", InventoryController.updateInventoryById);

// Update Inventory by name
router.put("/name/:name", InventoryController.updateInventoryByName);

// Update Inventory by category
router.put("/category/:category", InventoryController.updateInventoryByCategory);

// Delete Inventory by id
router.delete("/id/:id", InventoryController.deleteInventoryById);

// Delete Inventory by name
router.delete("/name/:name", InventoryController.deleteInventoryByName);

// Delete Inventory by category
router.delete("/category/:category", InventoryController.deleteInventoryByCategory);

module.exports = router;
