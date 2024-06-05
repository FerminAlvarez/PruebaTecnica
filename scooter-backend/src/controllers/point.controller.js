const pointModel = require("../models/point.model");

const getPoints = async (req, res) => {
  const points = await pointModel.findAll();

  if (points.rows.length > 0) res.status(200).json(points.rows);
  else res.status(404).send("Points not founded");
};

const getPointById = async (req, res) => {
  const point = await pointModel.findById(req.params.id);

  if (point.rows.length > 0) res.status(200).json(point.rows);
  else res.status(404).send("Point not found");
};

const insertPoint = async (req, res) => {
    const { Point_ID, Location, Capacity } = req.body;
    pointModel.create(Point_ID, Location, Capacity)
    .then(() => {
      res.status(201).send({ message: "Point created successfully" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

module.exports = {
  getPoints,
  getPointById,
  insertPoint
};
