// models/animal.js
const mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
  name: String,
  time: String,
});

const Animal = mongoose.model("Animal", animalSchema);

module.exports = Animal;
