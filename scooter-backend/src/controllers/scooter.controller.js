const scooterModel = require("../models/scooter.model");

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
    const { Scooter_ID } = req.body;
    scooterModel.create(Scooter_ID)
    .then(() => {
      res.status(201).send({ message: "Scooter created successfully" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
};

module.exports = {
  getScooters,
  getScooterById,
  insertScooter
};
