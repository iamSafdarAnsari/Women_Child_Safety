const express = require("express");
const { readJsonFile } = require("../utils/fileHandler");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await readJsonFile("users.json");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to fetch users." });
  }
});

module.exports = router;
