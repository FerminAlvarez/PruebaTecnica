const scooterModel = require("../models/scooter.model");
const pointModel = require("../models/point.model");

const getScooters = async (req, res) => {
  const scooters = await scooterModel.findAll();

  if (scooters.rows.length > 0) res.status(200).json(scooters.rows);
  else res.status(404).send("Scooters not found");
};

const getScooterById = async (req, res) => {
  const scooter = await scooterModel.findById(req.params.id);

  if (scooter.rows.length > 0) res.status(200).json(scooter.rows);
  else res.status(404).send("Scooter not found");
};

const insertScooter = async (req, res) => {
  const { scooterId, pointId } = req.body;

  try {
    const point = await pointModel.findById(pointId);
    if (!point) return res.status(404).send("Point not found");

    const isFull = await isPointAtCapacity(pointId);
    if (isFull) return res.status(409).send("Point is full");

    await insertScooterToPoint(scooterId, pointId);
    res.status(201).send({ message: "Scooter created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const isPointAtCapacity = async (pointId) => {
  const point = await findPointById(pointId);
  if (!point) throw new Error("Point not found");

  const scootersAtPoint = await pointModel.findScootersByPointId(pointId);
  return scootersAtPoint.rows.length >= point.capacity;
};

const insertScooterToPoint = async (scooterId, pointId) => {
  try {
    await scooterModel.create(scooterId, pointId);
  } catch (error) {
    throw new Error("Failed to create scooter: " + error.message);
  }
};

module.exports = {
  getScooters,
  getScooterById,
  insertScooter,
};
