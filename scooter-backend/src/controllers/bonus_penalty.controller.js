const bonus_penaltyModel = require("../models/bonus_penalty.model");

const getBonusAndPenalty = async (req, res) => {
  const bonus_penalty = await bonus_penaltyModel.findAll();

  if (bonus_penalty.rows.length > 0) res.status(200).json(bonus_penalty.rows);
  else res.status(404).send("Bonus/Penalty not founded");
};
const getBonusAndPenaltyByDNI = async (req, res) => {
  const { dni } = req.params;
  const bonus_penalty = await bonus_penaltyModel.findByDNI(dni);

  if (bonus_penalty.rows.length > 0) res.status(200).json(bonus_penalty.rows);
  else res.status(404).send("Bonus/Penalty not founded");
};

const getBonusAndPenaltyByDNIAndDate = async (req, res) => {
  const { dni } = req.params;
  const { start_date, end_date } = req.body;

  const bonus_penalty = await bonus_penaltyModel.findByDNIAndDate(
    dni,
    start_date,
    end_date,
  );
  if (bonus_penalty.rows.length > 0) res.status(200).json(bonus_penalty.rows);
  else res.status(404).send("Bonus/Penalty not founded");
};

const createBonusOrPenalty = async (req, res) => {
  try {
    const { dni } = req.params;
    const { Type, Minutes } = req.body;
  
    await bonus_penaltyModel.create(dni, Type, Minutes);
    res.status(200).json(`${Type} created successfully`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBonusAndPenalty,
  getBonusAndPenaltyByDNI,
  getBonusAndPenaltyByDNIAndDate,
  createBonusOrPenalty
};
