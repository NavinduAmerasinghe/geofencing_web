const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createObservation,
  getObservations,
  getObservation,
  updateObservation,
  deleteObservation,
  observationSummary,
  animalObservationTimeStats,
  animalCountByParameters,
  mostSceanAnimalDayNightStat,
  getAnimalCountByDate,
  getObservationsforLocation
} = require("../controllers/wildlifeObservationController");

// Multer storage configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// Create a new wildlife observation
router.post("/observations", createObservation);

// Get all wildlife observations
router.get("/observations", getObservations);

// Get a single wildlife observation by ID
router.get("/observations/:id", getObservation);

// Update a single wildlife observation by ID
router.put("/observations/:id", updateObservation);

// Delete a single wildlife observation by ID
router.delete("/observations/:id", deleteObservation);

// Get onservation summary
router.get("/observation/summary", observationSummary);

// Get Animal observation Statistics
router.get("/observation/animalObservationTime", animalObservationTimeStats);

// Get Animal observation with Road Statistics
router.get("/observation/animalObservationRoad", animalCountByParameters);

// Get Animal observation with Road Statistics
router.get(
  "/observation/animalObservationDayNight",
  mostSceanAnimalDayNightStat
);

// Get Animal Count By Date
router.get("/observation/getAnimalCountByDate", getAnimalCountByDate);

router.post("/observationsforLocation", getObservationsforLocation);

module.exports = router;
