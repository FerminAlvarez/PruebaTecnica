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

module.exports = {
  findAll,
  findByDNI,
  findByDNIAndDate
};
