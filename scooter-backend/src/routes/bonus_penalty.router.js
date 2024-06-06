const { Router } = require("express");
const {
  getBonusAndPenalty,
  getBonusAndPenaltyByDNI,
  getBonusAndPenaltyByDNIAndDate,
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
 *   get:
 *     summary: Get bonus and penalties by DNI and date
 *     tags: [Bonus and Penalties]
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: integer
 *         required: true
 *         description: DNI of the user
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date-time
 *           example: 2017-07-21T17:32:28Z
 *         required: true
 *         description: Start date
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date-time
 *           example: 2017-07-21T17:32:28Z
 *         required: true
 *         description: End date
 *     responses:
 *       '200':
 *         description: Bonus and penalties
 */

router.get("/:dni/dates", getBonusAndPenaltyByDNIAndDate);



module.exports = router;
