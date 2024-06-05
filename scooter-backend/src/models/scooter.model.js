const database = require('../database/database');
const TABLE = 'Scooter';

async function findAll () {
  return database.query(
    `SELECT * FROM ${TABLE} `
  );
}

async function findById (id) {
  return database.query(
    `SELECT * FROM ${TABLE} WHERE Scooter_ID = $1`,
    [id]
  );
}

async function create (ScooterId, Point_ID) {
  return database.query(
    `INSERT INTO ${TABLE} (Scooter_ID, Point_ID) VALUES ($1, $2)`,
    [ScooterId, Point_ID]
  );
}

module.exports = {
  findAll,
  findById,
  create,
};
