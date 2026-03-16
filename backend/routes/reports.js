const express = require("express");
const {
  generateNextId,
  readJsonFile,
  writeJsonFile,
} = require("../utils/fileHandler");

const router = express.Router();

const validTypes = [
  "harassment",
  "unsafe_road",
  "suspicious_activity",
  "theft",
];
const validRisk = ["low", "medium", "high"];

router.get("/", async (req, res) => {
  try {
    const reports = await readJsonFile("safetyReports.json");
    res.json({ success: true, reports });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Unable to fetch reports." });
  }
});

router.get("/heatmap", async (req, res) => {
  try {
    const reports = await readJsonFile("safetyReports.json");
    const heatmap = reports.map((report) => ({
      id: report.id,
      latitude: report.latitude,
      longitude: report.longitude,
      riskLevel: report.riskLevel,
      weight:
        report.riskLevel === "high"
          ? 1
          : report.riskLevel === "medium"
            ? 0.65
            : 0.3,
      type: report.type,
    }));

    res.json({ success: true, heatmap });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Unable to fetch heatmap data." });
  }
});

router.post("/create", async (req, res) => {
  try {
    const {
      type,
      latitude,
      longitude,
      description,
      riskLevel = "medium",
    } = req.body;

    if (!validTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message:
          "type must be one of harassment, unsafe_road, suspicious_activity, theft.",
      });
    }

    if (
      typeof latitude !== "number" ||
      typeof longitude !== "number" ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "latitude, longitude, and description are required.",
      });
    }

    if (!validRisk.includes(riskLevel)) {
      return res.status(400).json({
        success: false,
        message: "riskLevel must be one of low, medium, high.",
      });
    }

    const reports = await readJsonFile("safetyReports.json");
    const newReport = {
      id: generateNextId(reports, "r"),
      type,
      latitude,
      longitude,
      description,
      riskLevel,
      timestamp: new Date().toISOString(),
    };

    reports.unshift(newReport);
    await writeJsonFile("safetyReports.json", reports);

    return res.status(201).json({
      success: true,
      message: "Safety report created successfully.",
      report: newReport,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create safety report.",
    });
  }
});

module.exports = router;
