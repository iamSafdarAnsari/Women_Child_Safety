const Journey = require("../models/Journey");
const Alert = require("../models/Alert");

const parseDateValue = (value, fieldName) => {
  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return { error: `${fieldName} must be a valid date` };
  }

  return { value: parsedDate };
};

const normalizeLocation = (location, fieldName) => {
  if (!location || typeof location !== "object") {
    return { error: `${fieldName} is required` };
  }

  const latitude = Number(location.latitude);
  const longitude = Number(location.longitude);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return {
      error: `${fieldName}.latitude and ${fieldName}.longitude must be valid numbers`,
    };
  }

  const normalizedLocation = {
    latitude,
    longitude,
    recordedAt: new Date(),
  };

  if (typeof location.address === "string" && location.address.trim()) {
    normalizedLocation.address = location.address.trim();
  }

  return { value: normalizedLocation };
};

const normalizeDestination = (destination) => {
  if (typeof destination === "string" && destination.trim()) {
    return { value: { name: destination.trim() } };
  }

  if (!destination || typeof destination !== "object") {
    return { error: "destination is required" };
  }

  const name =
    typeof destination.name === "string" && destination.name.trim()
      ? destination.name.trim()
      : typeof destination.address === "string" && destination.address.trim()
        ? destination.address.trim()
        : "";

  if (!name) {
    return {
      error: "destination.name or destination.address is required",
    };
  }

  const normalizedDestination = { name };

  if (typeof destination.address === "string" && destination.address.trim()) {
    normalizedDestination.address = destination.address.trim();
  }

  if (destination.latitude !== undefined) {
    const latitude = Number(destination.latitude);

    if (Number.isNaN(latitude)) {
      return { error: "destination.latitude must be a valid number" };
    }

    normalizedDestination.latitude = latitude;
  }

  if (destination.longitude !== undefined) {
    const longitude = Number(destination.longitude);

    if (Number.isNaN(longitude)) {
      return { error: "destination.longitude must be a valid number" };
    }

    normalizedDestination.longitude = longitude;
  }

  return { value: normalizedDestination };
};

const buildJourneyQuery = (userId, journeyId) => ({
  _id: journeyId,
  userId,
  status: "ongoing",
});

const createOverdueAlertIfNeeded = async (journey) => {
  if (
    journey.status !== "ongoing" ||
    journey.overdueAlertTriggered ||
    journey.expectedArrival.getTime() > Date.now()
  ) {
    return null;
  }

  const activeLocation = journey.currentLocation || journey.startLocation;
  const overdueAlert = await Alert.create({
    userId: journey.userId,
    latitude: activeLocation.latitude,
    longitude: activeLocation.longitude,
    triggerType: "journey_overdue",
    status: "active",
  });

  journey.overdueAlertTriggered = true;
  journey.overdueAlertId = overdueAlert._id;

  return overdueAlert;
};

const startJourney = async (req, res) => {
  try {
    const { startLocation, destination, expectedArrival, startTime } = req.body;

    const parsedStartLocation = normalizeLocation(
      startLocation,
      "startLocation",
    );
    if (parsedStartLocation.error) {
      return res.status(400).json({ message: parsedStartLocation.error });
    }

    const parsedDestination = normalizeDestination(destination);
    if (parsedDestination.error) {
      return res.status(400).json({ message: parsedDestination.error });
    }

    if (!expectedArrival) {
      return res.status(400).json({ message: "expectedArrival is required" });
    }

    const parsedStartTime = startTime
      ? parseDateValue(startTime, "startTime")
      : { value: new Date() };
    if (parsedStartTime.error) {
      return res.status(400).json({ message: parsedStartTime.error });
    }

    const parsedExpectedArrival = parseDateValue(
      expectedArrival,
      "expectedArrival",
    );
    if (parsedExpectedArrival.error) {
      return res.status(400).json({ message: parsedExpectedArrival.error });
    }

    if (parsedExpectedArrival.value <= parsedStartTime.value) {
      return res.status(400).json({
        message: "expectedArrival must be later than startTime",
      });
    }

    const existingJourney = await Journey.findOne({
      userId: req.user._id,
      status: "ongoing",
    });

    if (existingJourney) {
      return res.status(409).json({
        message: "An ongoing journey already exists for this user",
      });
    }

    const initialLocation = {
      ...parsedStartLocation.value,
      recordedAt: parsedStartTime.value,
    };

    const journey = new Journey({
      userId: req.user._id,
      startLocation: initialLocation,
      currentLocation: initialLocation,
      destination: parsedDestination.value,
      locationHistory: [initialLocation],
      startTime: parsedStartTime.value,
      expectedArrival: parsedExpectedArrival.value,
      status: "ongoing",
    });

    const overdueAlert = await createOverdueAlertIfNeeded(journey);

    await journey.save();

    return res.status(201).json({
      message: "Journey started successfully",
      journey,
      alertTriggered: Boolean(overdueAlert),
      alert: overdueAlert,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const updateJourney = async (req, res) => {
  try {
    const { journeyId, location } = req.body;

    if (!journeyId) {
      return res.status(400).json({ message: "journeyId is required" });
    }

    const parsedLocation = normalizeLocation(location, "location");
    if (parsedLocation.error) {
      return res.status(400).json({ message: parsedLocation.error });
    }

    const journey = await Journey.findOne(
      buildJourneyQuery(req.user._id, journeyId),
    );

    if (!journey) {
      return res.status(404).json({
        message: "Ongoing journey not found",
      });
    }

    journey.currentLocation = parsedLocation.value;
    journey.locationHistory.push(parsedLocation.value);

    const overdueAlert = await createOverdueAlertIfNeeded(journey);

    await journey.save();

    return res.status(200).json({
      message: "Journey location updated successfully",
      journey,
      alertTriggered: Boolean(overdueAlert),
      alert: overdueAlert,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const endJourney = async (req, res) => {
  try {
    const { journeyId, endLocation } = req.body;

    if (!journeyId) {
      return res.status(400).json({ message: "journeyId is required" });
    }

    const journey = await Journey.findOne(
      buildJourneyQuery(req.user._id, journeyId),
    );

    if (!journey) {
      return res.status(404).json({
        message: "Ongoing journey not found",
      });
    }

    if (endLocation !== undefined) {
      const parsedEndLocation = normalizeLocation(endLocation, "endLocation");
      if (parsedEndLocation.error) {
        return res.status(400).json({ message: parsedEndLocation.error });
      }

      journey.currentLocation = parsedEndLocation.value;
      journey.locationHistory.push(parsedEndLocation.value);
    }

    journey.status = "completed";
    journey.endTime = new Date();

    await journey.save();

    return res.status(200).json({
      message: "Journey ended successfully",
      journey,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  startJourney,
  updateJourney,
  endJourney,
};
