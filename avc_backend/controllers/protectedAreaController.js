const Polygon = require("../models/protectedArea");

// Create a new polygon
exports.createPolygon = async (req, res) => {
  try {
    const { name, totalAreaKm2, lat, lng } = req.body;
    const polygon = new Polygon({ name, totalAreaKm2, lat, lng });
    await polygon.save();
    res.json(polygon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
// Get all polygons
exports.getAllPolygons = async (req, res) => {
  try {
    const polygons = await Polygon.find();
    res.json(polygons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a polygon by name
exports.deletePolygon = async (req, res) => {
  try {
    const name = req.params.name;
    const deletedPolygon = await Polygon.findOneAndDelete({ name });
    if (!deletedPolygon) {
      return res.status(404).json({ error: "Polygon not found" });
    }
    res.json({ message: "Polygon deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
