const mongoose = require("mongoose");

const Alert = require("../models/Alert");
const User = require("../models/User");

const allowedTriggerTypes = ["button", "shake", "voice"];

const createSosAlert = async (req, res) => {
  try {
    const { userId, latitude, longitude, triggerType } = req.body;

    if (
      !userId ||
      latitude === undefined ||
      longitude === undefined ||
      !triggerType
    ) {
      return res.status(400).json({
        message: "userId, latitude, longitude, and triggerType are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    if (!allowedTriggerTypes.includes(triggerType)) {
      return res.status(400).json({
        message: "triggerType must be one of: button, shake, voice",
      });
    }

    if (Number.isNaN(Number(latitude)) || Number.isNaN(Number(longitude))) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude must be valid numbers" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const alert = await Alert.create({
      userId,
      latitude: Number(latitude),
      longitude: Number(longitude),
      triggerType,
      status: "active",
    });

    return res.status(201).json({
      message: "SOS alert created successfully",
      alert,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const getAlertHistory = async (req, res) => {
  try {
    const alerts = await Alert.find()
      .populate("userId", "name email phone")
      .sort({ timestamp: -1 });

    return res.status(200).json({
      count: alerts.length,
      alerts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createSosAlert,
  getAlertHistory,
};
