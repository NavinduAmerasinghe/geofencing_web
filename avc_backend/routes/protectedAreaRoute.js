const express = require("express");
const router = express.Router();
const polygonController = require("../controllers/protectedAreaController");

// Create a new polygon
router.post("/", polygonController.createPolygon);
router.get("/", polygonController.getAllPolygons);
// Delete a polygon by name
router.delete("/:name", polygonController.deletePolygon);

module.exports = router;
