const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
  {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      trim: true,
    },
    recordedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false },
);

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  { _id: false },
);

const journeySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  startLocation: {
    type: locationSchema,
    required: true,
  },
  currentLocation: {
    type: locationSchema,
    required: true,
  },
  destination: {
    type: destinationSchema,
    required: true,
  },
  locationHistory: {
    type: [locationSchema],
    default: [],
  },
  startTime: {
    type: Date,
    required: true,
  },
  expectedArrival: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  overdueAlertTriggered: {
    type: Boolean,
    default: false,
  },
  overdueAlertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Alert",
  },
  status: {
    type: String,
    required: true,
    default: "ongoing",
    enum: ["planned", "ongoing", "completed", "cancelled"],
  },
});

module.exports = mongoose.model("Journey", journeySchema);
