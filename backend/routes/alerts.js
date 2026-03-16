const express = require("express");
const {
  generateNextId,
  readJsonFile,
  writeJsonFile,
} = require("../utils/fileHandler");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const alerts = await readJsonFile("alerts.json");
    res.json({ success: true, alerts });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Unable to fetch alerts." });
  }
});

router.post("/sos", async (req, res) => {
  try {
    const { userId, latitude, longitude, triggerType = "button" } = req.body;

    if (
      !userId ||
      typeof latitude !== "number" ||
      typeof longitude !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "userId, latitude, and longitude are required.",
      });
    }

    if (!["button", "shake", "voice"].includes(triggerType)) {
      return res.status(400).json({
        success: false,
        message: "triggerType must be one of: button, shake, voice.",
      });
    }

    const alerts = await readJsonFile("alerts.json");
    const newAlert = {
      id: generateNextId(alerts, "a"),
      userId,
      latitude,
      longitude,
      triggerType,
      timestamp: new Date().toISOString(),
      status: "active",
    };

    alerts.unshift(newAlert);
    await writeJsonFile("alerts.json", alerts);

    return res.status(201).json({
      success: true,
      message: "SOS alert stored successfully.",
      alert: newAlert,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create SOS alert.",
    });
  }
});

module.exports = router;
