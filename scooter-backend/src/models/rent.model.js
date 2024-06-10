const database = require("../database/database");
const TABLE = "Rent";

async function findAll() {
  return database.query(`SELECT * FROM ${TABLE}`);
}

async function findByDNI(DNI) {
  return database.query(`SELECT * FROM ${TABLE} WHERE DNI = $1`, [DNI]);
}

async function findActiveRents() {
  return database.query(`SELECT * FROM ${TABLE} WHERE End_Date_Time IS NULL`);
}

async function findActiveRentByDNI(DNI) {
  return database.query(
    `SELECT * FROM ${TABLE} WHERE End_Date_Time IS NULL and DNI = $1`,
    [DNI],
  );
}

async function findWithEndtimeNull(DNI) {
  return database.query(
    `SELECT * FROM ${TABLE} WHERE DNI = $1 AND End_Date_Time IS NULL`,
    [DNI],
  );
}

async function create(DNI, Scooter_ID) {
  return database.query(
    `INSERT INTO ${TABLE} (DNI, Scooter_ID, Start_Date_Time) VALUES ($1, $2, NOW()) returning *`,
    [DNI, Scooter_ID],
  );
}

async function update(Rent_ID) {
  return database.query(
    `UPDATE ${TABLE} 
     SET End_Date_Time = NOW(), 
         Minutes_Duration = EXTRACT(EPOCH FROM (NOW() - Start_Date_Time)) / 60 
     WHERE Rent_ID = $1
     RETURNING *`,
    [Rent_ID],
  );
}

module.exports = {
  findAll,
  findByDNI,
  findActiveRents,
  findActiveRentByDNI,
  findWithEndtimeNull,
  create,
  update,
};
