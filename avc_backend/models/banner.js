const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});
bannerSchema.index({ createdAt: 1 });
const WildlifeObservation = mongoose.model("Banner", bannerSchema);

module.exports = WildlifeObservation;
