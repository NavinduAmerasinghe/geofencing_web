// routes/animalRoutes.js
const express = require("express");
const router = express.Router();
const animalController = require("../controllers/yoloIdentificationController");

// Route to get the latest animal record
router.get("/latest", animalController.getLatestAnimal);
router.delete("/animals", animalController.deleteAllAnimals);

module.exports = router;
