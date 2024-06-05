const database = require('../database/database');
const TABLE = 'Point';
const SCOOTER_TABLE = 'Scooter';

async function findAll () {
  return database.query(
    `SELECT * FROM ${TABLE} `
  );
}

async function findScootersByPointId (id) {
  return database.query(
    `SELECT ${SCOOTER_TABLE}.Scooter_ID, ${SCOOTER_TABLE}.Status 
    FROM ${TABLE} INNER JOIN ${SCOOTER_TABLE} ON ${TABLE}.Point_ID = ${SCOOTER_TABLE}.Point_ID 
    WHERE ${TABLE}.Point_ID = $1`,
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
  findScootersByPointId,
  create,
};
