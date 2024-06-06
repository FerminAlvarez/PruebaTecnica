const { Router } = require("express");
const { getAllRents, getAllActiveRents, insertRent, updateRent } = require("../controllers/rent.controller.js");

const router = Router();

/**
 * @swagger
 * /rents:
 *   get:
 *     summary: Get all rents
 *     tags: [Rents]
 *     responses:
 *       '200':
 *         description: Rents
 */
router.get("/", getAllRents);

/**
 * @swagger
 * /rents/active:
 *   get:
 *     summary: Get all active rents
 *     tags: [Rents]
 *     responses:
 *       '200':
 *         description: Rents
 */
router.get("/active", getAllActiveRents);

/**
 * @swagger
 * /rents:
 *   post:
 *     summary: Create rent
 *     tags: [Rents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               DNI:
 *                 type: integer
 *                 description: dni
 *               Scooter_ID:
 *                 type: string
 *                 description: scooter id
 *     responses:
 *       '201':
 *         description: Rent created
 *       '500':
 *         description: Server error
 */
router.post("/", insertRent);

/**
 * @swagger
 * /rents:
 *   put:
 *     summary: Update rent
 *     tags: [Rents]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Rent_ID:
 *                 type: integer
 *                 description: rent id
 *               Point_ID:
 *                 type: integer
 *                 description: point id
 *     responses:
 *       '201':
 *         description: Rent updated
 *       '500':
 *         description: Server error
 */
router.put("/", updateRent);

module.exports = router;
