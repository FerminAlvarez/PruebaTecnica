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

async function create (ScooterId) {
  return database.query(
    `INSERT INTO ${TABLE} (Scooter_ID) VALUES ($1)`,
    [ScooterId]
  );
}

module.exports = {
  findAll,
  findById,
  create,
};
