const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
  startJourney,
  updateJourney,
  endJourney,
} = require("../controllers/journeyController");

const router = express.Router();

router.post("/start", authMiddleware, startJourney);
router.post("/update", authMiddleware, updateJourney);
router.post("/end", authMiddleware, endJourney);

module.exports = router;
