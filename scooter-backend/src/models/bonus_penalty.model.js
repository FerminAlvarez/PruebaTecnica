const database = require("../database/database");
const TABLE = "Bonus_Penalty_History";

async function findAll() {
  return database.query(`SELECT * FROM ${TABLE} `);
}

async function findByDNI(DNI) {
  return database.query(
    `SELECT * FROM ${TABLE} WHERE DNI = $1`,
    [DNI],
  );
}

async function findByDNIAndDate(dni, start_date, end_date) {
  return database.query(
    `SELECT * FROM ${TABLE} WHERE DNI = $1 AND Date >= $2 AND Date <= $3`,
    [dni, start_date, end_date],
  );
}

async function create(DNI, Type, Minutes) {
  return database.query(
    `INSERT INTO ${TABLE} (DNI, Type, Minutes, Date) VALUES ($1, $2, $3, NOW()) returning *`,
    [DNI, Type, Minutes],
  );
}

module.exports = {
  findAll,
  findByDNI,
  findByDNIAndDate,
  create
};
