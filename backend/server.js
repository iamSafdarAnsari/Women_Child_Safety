const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users");
const alertRoutes = require("./routes/alerts");
const journeyRoutes = require("./routes/journeys");
const reportRoutes = require("./routes/reports");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Women & Child Safety Platform local JSON API is running",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/journey", journeyRoutes);
app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
