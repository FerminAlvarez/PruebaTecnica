require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import Routes
const scooterRouter = require("./routes/scooter.router");
const pointRouter = require("./routes/point.router");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/scooters", scooterRouter);
app.use("/points", pointRouter);

module.exports = app;
