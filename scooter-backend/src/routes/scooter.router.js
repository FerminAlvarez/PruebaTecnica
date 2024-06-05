const { Router } = require('express');
const {
  getScooters,
  getScooterById,
  insertScooter
} = require('../controllers/scooter.controller');

const router = Router();

/**
 * @swagger
 * /scooters:
 *   get:
 *     summary: Get all scooters
 *     tags: [Scooters]
 *     responses:
 *       '200':
 *         description: Scooters
 */
router.get('/', getScooters);

/**
 * @swagger
 * /scooters/{id}:
 *   get:
 *     summary: Get scooter by ID
 *     tags: [Scooters]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Scooter ID
 *     responses:
 *       '200':
 *         description: Scooter
 *       '404':
 *         description: Scooter not found
 */
router.get('/:id', getScooterById);

/**
 * @swagger
 * /scooters:
 *   post:
 *     summary: Create scooter
 *     tags: [Scooters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Scooter_ID:
 *                 type: string
 *                 description: scooter id
 *               Point_ID:
 *                 type: integer
 *                 description: scooter id
 *     responses:
 *       '201':
 *         description: Scooter created
 *       '400':
 *         description: Invalid scooter data
 */
router.post('/', insertScooter);

module.exports = router;
