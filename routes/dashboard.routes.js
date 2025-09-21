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
 *       Also includes total counts for the given date range:
 *       - **prog_progress_total** → total count for "C1"
 *       - **specialisation_prog_total** → combined total for "S1" and "S2"
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
 *         description: Start date (YYYY-MM-DD) of the range
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         required: true
 *         description: End date (YYYY-MM-DD) of the range
 *     responses:
 *       200:
 *         description: Daily progress and totals for given date range
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
 *                   description: Completion counts per day for moduleId "C1"
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
 *                   description: Combined completion counts per day for moduleId "S1" and "S2"
 *                   items:
 *                     type: object
 *                     properties:
 *                       day:
 *                         type: string
 *                         example: "2025-08-25"
 *                       count:
 *                         type: integer
 *                         example: 3
 *                 prog_progress_total:
 *                   type: integer
 *                   description: Total completions for moduleId "C1" within date range
 *                   example: 12
 *                 specialisation_prog_total:
 *                   type: integer
 *                   description: Total combined completions for moduleId "S1" and "S2" within date range
 *                   example: 25
 *             examples:
 *               sample:
 *                 value:
 *                   success: true
 *                   prog_progress:
 *                     - day: "2025-08-25"
 *                       count: 2
 *                   specialisation_prog:
 *                     - day: "2025-08-25"
 *                       count: 3
 *                   prog_progress_total: 12
 *                   specialisation_prog_total: 25
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
