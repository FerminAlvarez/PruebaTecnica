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
  const { Scooter_ID, Point_ID } = req.body;

  try {
    const point = await pointModel.findById(Point_ID);
    if (!point) return res.status(404).send("Point not found");

    const isFull = await isPointAtCapacity(Point_ID);
    if (isFull) return res.status(409).send("Point is full");

    await insertScooterToPoint(Scooter_ID, Point_ID);
    res.status(201).send({ message: "Scooter created successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const isPointAtCapacity = async (Point_ID) => {
  const point = await pointModel.findById(Point_ID);
  if (!point) throw new Error("Point not found");

  const scootersAtPoint = await pointModel.findScootersByPointId(Point_ID);
  return scootersAtPoint.rows.length >= point.capacity;
};

const insertScooterToPoint = async (Scooter_ID, Point_ID) => {
  try {
    await scooterModel.create(Scooter_ID, Point_ID);
  } catch (error) {
    throw new Error("Failed to create scooter: " + error.message);
  }
};

module.exports = {
  getScooters,
  getScooterById,
  insertScooter,
};
