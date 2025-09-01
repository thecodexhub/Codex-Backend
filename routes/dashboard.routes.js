const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/dashboard.controller");


/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: APIs for managing interview experiences
 */

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get weekly dashboard progress
 *     description: |
 *       Returns daily completion counts for the last 7 days (or a given date range) for:
 *       - **prog_progress** → moduleId = "C1"
 *       - **specialisation_prog** → moduleId = "S1" and "S2"
 *
 *       Each array contains 7 entries (one per day).
 *
 *     tags: [Dashboard]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the user
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: Start date (YYYY-MM-DD) of the 7-day range
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date (YYYY-MM-DD) of the 7-day range
 *     responses:
 *       200:
 *         description: Daily progress for given date range
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 prog_progress:
 *                   type: array
 *                   description: Completion counts for moduleId "C1"
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         example: "2025-08-25"
 *                       count:
 *                         type: integer
 *                         example: 2
 *                 specialisation_prog:
 *                   type: array
 *                   description: Combined completion counts for moduleId "S1" and "S2"
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         example: "2025-08-25"
 *                       count:
 *                         type: integer
 *                         example: 3
 *       400:
 *         description: Missing required params
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Missing required params (user_id, startDate, endDate)
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Server Error
 */
router.get("/", getDashboard);

module.exports = router;