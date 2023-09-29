const mongoose = require("mongoose");

const WildlifeObservationSchema = new mongoose.Schema(
  {
    animalName: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
    // image: {
    //   data: Buffer,
    //   contentType: String,
    // },
    taxonGroup: {
      type: String,
      enum: ["Birds", "Mammals", "Reptiles", "Amphibians"],
      required: true,
    },
    location: {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    observationDate: {
      type: Date,
      required: true,
    },
    observationTime: {
      type: String,
      required: true,
      // match: /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])\.\d{3}$/,
    },
    dayNight: {
      type: String,
      required: true,
    },
    climateType: {
      type: String,
      enum: ["Rainy", "Sunny", "Cloudy"],
      required: true,
    },
    observationRoad: {
      type: String,
      enum: ["Urban Roads", "Rural Roads", "Mountain Roads", "Costal Roads"],
      required: true,
    },
    roadCondition: {
      type: String,
      enum: ["Dirt Road", "Clear Road"],
      required: true,
    },
    trafficType: {
      type: String,
      enum: ["Busy", "Quiet"],
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);
WildlifeObservationSchema.index({ location: "2dsphere" });

const WildlifeObservation = mongoose.model(
  "WildlifeObservation",
  WildlifeObservationSchema
);
module.exports = WildlifeObservation;
