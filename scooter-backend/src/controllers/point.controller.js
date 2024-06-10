const pointModel = require("../models/point.model");

const getPoints = async (req, res) => {
  const points = await pointModel.findAll();

  if (points.rows.length > 0) res.status(200).json(points.rows);
  else res.status(404).send("Points not founded");
};

const getScooterByPointId = async (req, res) => {
  const scooters = await pointModel.findScootersByPointId(req.params.id);

  if (scooters.rows.length > 0) res.status(200).json(scooters.rows);
  else res.status(404).send("Scooters not found");
};

const insertPoint = async (req, res) => {
  const { pointId, location, capacity } = req.body;

  try {
    await pointModel.create(pointId, location, capacity);
    res.status(201).json({ message: "Point created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPoints,
  getScooterByPointId,
  insertPoint,
};
