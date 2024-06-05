require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import Routes
const scooterRouter = require("./routes/scooter.router");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/scooters", scooterRouter);

module.exports = app;
