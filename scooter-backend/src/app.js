require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import Routes

const app = express();
app.use(cors());
app.use(express.json());

// Routes

module.exports = app;
