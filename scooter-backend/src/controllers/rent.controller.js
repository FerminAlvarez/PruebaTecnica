const rentModel = require("../models/rent.model");
const scooterModel = require("../models/scooter.model");
const bonus_penaltyModel = require("../models/bonus_penalty.model");

const BONUS_TIME = 30;
const PENALTY_TIME = 30;

const getAllRents = async (req, res) => {
  const rents = await rentModel.findAll();

  if (rents.rows.length > 0) res.status(200).json(rents.rows);
  else res.status(404).send("Rents not found");
};

const getAllActiveRents = async (req, res) => {
  const rents = await rentModel.findActiveRents();

  if (rents.rows.length > 0) res.status(200).json(rents.rows);
  else res.status(404).send("Rents not found");
};

const getActiveRentByDNI = async (req, res) => {
  const activeRent = await rentModel.findActiveRentByDNI(req.params.dni);

  if (activeRent.rows.length > 0) res.status(200).json(activeRent.rows[0]);
  else res.status(404).send("Rent not found");
};

const insertRent = async (req, res) => {
  const { DNI, Scooter_ID } = req.body;

  try {
    const activeRent = await userHasActiveRent(DNI);

    if (activeRent) {
      return res.status(409).send({
        message: "El usuario ya tiene un monopatín alquilado activo.",
      });
    }

    const rentData = await rentModel.create(DNI, Scooter_ID);
    const rents = await rentModel.findByDNI(DNI);

    await handleBonusLogic(DNI, rents);

    const total_time = await calculateTime(DNI);

    return res.status(201).send({
      message: `¡Se ha alquilado correctamente! Le quedan: ${total_time} minutos`,
      data: rentData.rows[0] || [],
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const userHasActiveRent = async (DNI) => {
  const data = await rentModel.findWithEndtimeNull(DNI);
  return data.rows.length > 0;
};

// Mejorable en cuanto a rendimiento!
const handleBonusLogic = async (DNI, rents) => {
  if (rents.rows.length > 0 && rents.rows.length % 2 === 0) {
    await bonus_penaltyModel.create(DNI, "bonus", BONUS_TIME);
  }
};

const getCurrentDateTimeInISOFormat = () => {
  const now = new Date();
  return now.toISOString();
};

const getCurrentDateTimeMinus7DaysInISOFormat = () => {
  const now = new Date();
  now.setDate(now.getDate() - 7);
  return now.toISOString();
};

const calculateTime = async (DNI) => {
  let total_time = 120;

  const bonus_penalties = await bonus_penaltyModel.findByDNIAndDate(
    DNI,
    getCurrentDateTimeMinus7DaysInISOFormat(),
    getCurrentDateTimeInISOFormat(),
  );
  if (bonus_penalties.rows.length > 0)
    bonus_penalties.rows.map((bonus_penalty) => {
      if (bonus_penalty.type == "bonus") total_time += BONUS_TIME;
      if (bonus_penalty.type == "penalty") total_time -= PENALTY_TIME;
    });
  return total_time;
};

const updateRent = async (req, res) => {
  const { Rent_ID, Scooter_ID } = req.body;

  try {
    const rentData = await rentModel.update(Rent_ID);
    await scooterModel.update(Scooter_ID, rentData.rows[0].Point_ID);

    res.status(201).send({
      message: "Monopatín entregado correctamente.",
      data: rentData.rows[0],
    });
  } catch (error) {
    res.status(500).send({ message: "Scooter not found" });
  }
};

module.exports = {
  getAllRents,
  getAllActiveRents,
  getActiveRentByDNI,
  insertRent,
  updateRent,
};
