const express = require("express");

const {
  createSosAlert,
  getAlertHistory,
} = require("../controllers/alertController");

const router = express.Router();

router.post("/sos", createSosAlert);
router.get("/history", getAlertHistory);

module.exports = router;
