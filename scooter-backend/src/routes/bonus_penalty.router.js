const { Router } = require("express");
const {
  getBonusAndPenalty,
  getBonusAndPenaltyByDNI,
  getBonusAndPenaltyByDNIAndDate,
  createBonusOrPenalty
} = require("../controllers/bonus_penalty.controller");

const router = Router();

/**
 * @swagger
 * /bonus_penalties:
 *   get:
 *     summary: Get all bonus and penalties
 *     tags: [Bonus and Penalties]
 *     responses:
 *       '200':
 *         description: Bonus and penalties
 */
router.get("/", getBonusAndPenalty);

/**
 * @swagger
 * /bonus_penalties/{dni}:
 *   get:
 *     summary: Get bonus and penalties by DNI
 *     tags: [Bonus and Penalties]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: integer
 *         required: true
 *         description: DNI of the user
 *     responses:
 *       '200':
 *         description: Bonus and penalties
 */
router.get("/:dni", getBonusAndPenaltyByDNI);

/**
 * @swagger
 * /bonus_penalties/{dni}/dates:
 *   post:
 *     summary: Get bonus and penalties by DNI and date
 *     tags: [Bonus and Penalties]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: integer
 *         required: true
 *         description: DNI of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *                 required: true
 *                 example: 2017-07-21T17:32:28Z
 *               end_date:
 *                 type: string
 *                 format: date
 *                 required: true
 *                 example: 2017-07-21T17:32:28Z
 *     responses:
 *       '200':
 *         description: Bonus and penalties
 */

router.post("/:dni/dates", getBonusAndPenaltyByDNIAndDate);

/**
 * @swagger
 * /bonus_penalties/{dni}:
 *   post:
 *     summary: Create bonus or penalty
 *     tags: [Bonus and Penalties]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: integer
 *         required: true
 *         description: DNI of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Type:
 *                 type: string
 *                 enum: [bonus, penalty]
 *                 required: true
 *               Minutes:
 *                 type: integer
 *                 required: true
 *     responses:
 *       '200':
 *         description: Bonus or penalty created
 */
router.post("/:dni", createBonusOrPenalty);

module.exports = router;
