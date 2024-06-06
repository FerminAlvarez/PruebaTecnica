const database = require("../database/database");
const TABLE = "Rent";

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
  create,
  update,
};