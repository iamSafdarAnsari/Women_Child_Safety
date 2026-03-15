const Report = require("../models/Report");

const allowedReportTypes = ["harassment", "unsafe road", "suspicious activity"];

const normalizeLocation = (location) => {
  if (!location || typeof location !== "object") {
    return { error: "location is required" };
  }

  const latitude = Number(location.latitude);
  const longitude = Number(location.longitude);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return {
      error: "location.latitude and location.longitude must be valid numbers",
    };
  }

  const normalizedLocation = {
    latitude,
    longitude,
  };

  if (typeof location.address === "string" && location.address.trim()) {
    normalizedLocation.address = location.address.trim();
  }

  return { value: normalizedLocation };
};

const createReport = async (req, res) => {
  try {
    const { type, location, description } = req.body;

    if (!type || !location || !description) {
      return res.status(400).json({
        message: "type, location, and description are required",
      });
    }

    if (!allowedReportTypes.includes(type)) {
      return res.status(400).json({
        message:
          "type must be one of: harassment, unsafe road, suspicious activity",
      });
    }

    const parsedLocation = normalizeLocation(location);
    if (parsedLocation.error) {
      return res.status(400).json({ message: parsedLocation.error });
    }

    if (typeof description !== "string" || !description.trim()) {
      return res.status(400).json({
        message: "description must be a non-empty string",
      });
    }

    const report = await Report.create({
      userId: req.user._id,
      type,
      location: parsedLocation.value,
      description: description.trim(),
    });

    return res.status(201).json({
      message: "Safety report created successfully",
      report,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const listReports = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("userId", "name email phone")
      .sort({ timestamp: -1 });

    return res.status(200).json({
      count: reports.length,
      reports,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createReport,
  listReports,
};
