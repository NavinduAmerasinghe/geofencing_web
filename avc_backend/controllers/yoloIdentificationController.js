// controllers/animalController.js
const Animal = require("../models/yoloIdentification");

// Get the latest record with the latest time
exports.getLatestAnimal = async (req, res) => {
  try {
    const latestAnimal = await Animal.findOne().sort({ time: -1 }).limit(1);
    res.json(latestAnimal);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteAllAnimals = async (req, res) => {
  try {
    await Animal.deleteMany({});
    res.json({ message: "All animals deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
