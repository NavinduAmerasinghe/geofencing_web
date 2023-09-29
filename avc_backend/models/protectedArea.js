// const mongoose = require("mongoose");

// const protectedAreaSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   coords: {
//     type: [Array],
//     required: true,
//   },
//   totalAreaKm2: {
//     type: Number,
//     required: true,
//   },
// });

// const ProtectedArea = mongoose.model("ProtectedArea", protectedAreaSchema);
// module.exports = ProtectedArea;
const mongoose = require("mongoose");

const polygonSchema = new mongoose.Schema({
  name: String,
  totalAreaKm2: Number,
  lat: Number,
  lng: Number,
});

const Polygon = mongoose.model("Polygon", polygonSchema);

module.exports = Polygon;
