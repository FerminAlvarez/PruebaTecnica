const rentModel = require("../models/rent.model");
const scooterModel = require("../models/scooter.model");

const insertRent = async (req, res) => {
  const { DNI, Scooter_ID } = req.body;

  rentModel.findWithEndtimeNull(DNI).then((data) => {
    if (data.rows.length > 0) {
      return res.status(409).send({ message: "El usuario ya tiene monopatín alquilado." });
    } else {
      rentModel
      .create(DNI, Scooter_ID)
      .then((data) => {
        res
          .status(201)
          .send({
            message: "Se ha alquilado correctamente!",
            data: data.rows[0] || [],
          });
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
    }
  });

  
};

const updateRent = async (req, res) => {
  const { Rent_ID, Point_ID } = req.body;
  rentModel
    .update(Rent_ID)
    .then((data) => {
      scooterModel.update(data.rows[0].scooter_id, Point_ID).then(() => {
        res
          .status(201)
          .send({
            message: "Scooter updated successfully",
            data: data.rows[0],
          });
      });
    })
    .catch(() => {
      res.status(500).send({ message: "Scooter not founded" });
    });
};

module.exports = {
  insertRent,
  updateRent,
};
