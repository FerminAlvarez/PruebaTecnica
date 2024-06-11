const rentModel = require("../models/rent.model");
const scooterModel = require("../models/scooter.model");
const bonus_penaltyModel = require("../models/bonus_penalty.model");

const TIMES_PER_WEEK = 120;
const BONUS_TIME = 30;

const BONUS = "bonus"
const PENALTY = "penalty"
const RESET = "reset"


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

const getRentByDNIAndDate = async (req, res) => {
  const { dni } = req.params;
  const { start_date, end_date } = req.body;

  console.log(`dni ${dni} start_date ${start_date} end_date ${end_date}`);

  const rents = await rentModel.findByDNIAndDate(dni, start_date, end_date);

  if (rents.rows.length > 0) res.status(200).json(rents.rows);
  else res.status(404).send("Rents not found");
};

const insertRent = async (req, res) => {
  const { DNI, Scooter_ID } = req.body;

  try {
    if (await userHasActiveRent(DNI)) {
      return res.status(409).send({
        message: "El usuario ya tiene un monopatín alquilado activo.",
      });
    }

    const rentData = await rentModel.create(DNI, Scooter_ID);
    const rents = await rentModel.findByDNI(DNI);

    await handleResetTime(DNI, rents);

    await handleBonus(DNI, rents);

    const total_time = await calculateTime(DNI);

    if (total_time < 0) 
      return res.status(409).send({ message: "Se ha quedado sin tiempo para alquilar." });

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


const handleResetTime = async(DNI) => {
  const lastReset = await bonus_penaltyModel.findByDNILastReset(DNI);

  if (!lastReset.rows[0]){
    await bonus_penaltyModel.create(DNI, RESET, TIMES_PER_WEEK);

  } else {
    const lastResetDate = new Date (lastReset.rows[0].date);
    const currentDateTimeMinus30sec = new Date(getCurrentDateTimeMinus7DaysInISOFormat());
    
    if (lastResetDate - currentDateTimeMinus30sec < 0) 
      await bonus_penaltyModel.create(DNI, RESET, TIMES_PER_WEEK);
  }
}

// Mejorable en cuanto a rendimiento!
const handleBonus = async (DNI, rents) => {
  if (rents.rows.length > 0 && rents.rows.length % 2 === 0) {
    await bonus_penaltyModel.create(DNI, BONUS, BONUS_TIME);
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
  const bonus_penalties = await bonus_penaltyModel.findByDNIAndDateFromLastReset(DNI);

  let total_time = 0;
  
  if (bonus_penalties.rows.length > 0)
    bonus_penalties.rows.map((bonus_penalty) => {
      if (bonus_penalty.type == BONUS || bonus_penalty.type == RESET) total_time += bonus_penalty.minutes;
      if (bonus_penalty.type == "penalty") total_time -= bonus_penalty.minutes;
    });
  return total_time;
};

const updateRent = async (req, res) => {
  const { DNI, Rent_ID, Scooter_ID, Point_ID } = req.body;

  try {
    const rentData = await rentModel.update(Rent_ID);
    await scooterModel.update(Scooter_ID, Point_ID);

    const bonus_penalties = await bonus_penaltyModel.findByDNIAndDate(
      DNI,
      getCurrentDateTimeMinus7DaysInISOFormat(),
      getCurrentDateTimeInISOFormat(),
    );

    total_time_bonus = 0;
    total_time_penalty = 0;
    if (bonus_penalties.rows.length > 0)
      bonus_penalties.rows.map((bonus_penalty) => {
        if (bonus_penalty.type == BONUS) total_time_bonus += bonus_penalty.minutes;
        if (bonus_penalty.type == PENALTY) total_time_penalty -= bonus_penalty.minutes;
      });

    res.status(201).send({
      message: "Monopatín entregado correctamente.",
      data: rentData.rows[0],
      total_time_bonus: total_time_bonus,
      total_time_penalty: total_time_penalty,
    });
  } catch (error) {
    res.status(500).send({ message: "Scooter not found" });
  }
};

module.exports = {
  getAllRents,
  getAllActiveRents,
  getRentByDNIAndDate,
  getActiveRentByDNI,
  insertRent,
  updateRent,
};
