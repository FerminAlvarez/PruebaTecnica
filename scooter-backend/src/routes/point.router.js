const { Router } = require('express');
const {
  getPoints,
  getScooterByPointId,
  insertPoint
} = require('../controllers/point.controller');

const router = Router();

/**
 * @swagger
 * /points:
 *   get:
 *     summary: Get all points
 *     tags: [Points]
 *     responses:
 *       '200':
 *         description: Points
 */
router.get('/', getPoints);

/**
 * @swagger
 * /points/{id}/scooters:
 *   get:
 *     summary: Get Scooters by Point ID
 *     tags: [Points]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Point ID
 *     responses:
 *       '200':
 *         description: Point
 *       '404':
 *         description: Point not found
 */
router.get('/:id/scooters', getScooterByPointId);

/**
 * @swagger
 * /points:
 *   post:
 *     summary: Create point
 *     tags: [Points]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Point_ID:
 *                 type: integer
 *                 description: ID of the point
 *               Location:
 *                 type: string
 *                 description: location of the point
 *               Capacity:
 *                 type: number
 *                 description: capacity of the point
 *     responses:
 *       '201':
 *         description: Point created
 *       '400':
 *         description: Invalid point data
 */
router.post('/', insertPoint);

module.exports = router;
