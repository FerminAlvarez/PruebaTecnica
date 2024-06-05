const database = require('../database/database');
const TABLE = 'Point';

async function findAll () {
  return database.query(
    `SELECT * FROM ${TABLE} `
  );
}

async function findById (id) {
  return database.query(
    `SELECT * FROM ${TABLE} WHERE Point_ID = $1`,
    [id]
  );
}

async function create (PointId, Location, Capacity) {
  return database.query(
    `INSERT INTO ${TABLE} (Point_ID, Location, Capacity) VALUES ($1, $2, $3)`,
    [PointId, Location, Capacity]
  );
}

module.exports = {
  findAll,
  findById,
  create,
};
