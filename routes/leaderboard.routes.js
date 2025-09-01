const express = require("express");
const router = express.Router();
const {
  getLeaderboard
} = require("../controllers/userProfile.controller");

/**
 * @swagger
 * tags:
 *   name: Leaderboard
 *   description: APIs for leaderboard management
 */

/**
 * @swagger
 * /api/leaderboard:
 *   get:
 *     summary: Get leaderboard with pagination
 *     tags: [Leaderboard]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of users per page (default 10)
 *     responses:
 *       200:
 *         description: Leaderboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 page:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalUsers:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fullName:
 *                         type: string
 *                       score:
 *                         type: integer
 *                         example: 0
 *                       avatar:
 *                         type: string
 *                         nullable: true
 *                       streak:
 *                         type: integer
 *                         example: 0
 */
router.get("/", getLeaderboard);

module.exports = router;
