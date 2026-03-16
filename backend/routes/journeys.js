const express = require("express");
const {
  generateNextId,
  readJsonFile,
  writeJsonFile,
} = require("../utils/fileHandler");

const router = express.Router();

router.post("/start", async (req, res) => {
  try {
    const { userId, startLocation, destination, expectedArrival } = req.body;

    if (!userId || !startLocation || !destination || !expectedArrival) {
      return res.status(400).json({
        success: false,
        message:
          "userId, startLocation, destination, and expectedArrival are required.",
      });
    }

    const journeys = await readJsonFile("journeys.json");
    const newJourney = {
      id: generateNextId(journeys, "j"),
      userId,
      startLocation,
      destination,
      startTime: new Date().toISOString(),
      expectedArrival,
      status: "ongoing",
    };

    journeys.unshift(newJourney);
    await writeJsonFile("journeys.json", journeys);

    return res.status(201).json({
      success: true,
      message: "Journey started successfully.",
      journey: newJourney,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to start journey.",
    });
  }
});

router.get("/list", async (req, res) => {
  try {
    const journeys = await readJsonFile("journeys.json");
    res.json({ success: true, journeys });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Unable to fetch journeys." });
  }
});

module.exports = router;
