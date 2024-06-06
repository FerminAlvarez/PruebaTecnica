const database = require("../database/database");
const TABLE = "Scooter";

async function findAll() {
  return database.query(`SELECT * FROM ${TABLE} `);
}

async function findById(id) {
  return database.query(`SELECT * FROM ${TABLE} WHERE Scooter_ID = $1`, [id]);
}

async function create(ScooterId, Point_ID) {
  return database.query(
    `INSERT INTO ${TABLE} (Scooter_ID, Point_ID) VALUES ($1, $2)`,
    [ScooterId, Point_ID],
  );
}

async function update(ScooterId, Point_ID) {
  return database.query(
    `UPDATE ${TABLE} SET Point_ID = $1 WHERE Scooter_ID = $2`,
    [Point_ID, ScooterId],
  );
}

module.exports = {
  findAll,
  findById,
  create,
  update,
};
