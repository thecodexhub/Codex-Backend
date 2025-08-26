const express = require("express");
const router = express.Router();
const {
  createFeedback,
  getAllFeedback
} = require("../controllers/feedback.controller");

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Endpoints for managing user feedback
 *
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: MongoDB User ID who is giving feedback
 *         feedback_description:
 *           type: string
 *           description: Feedback message provided by the user
 *         number_of_stars:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           description: Rating out of 5
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date when feedback was submitted
 */

/**
 * @swagger
 * /api/feedback:
 *   post:
 *     summary: Submit feedback
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - feedback_description
 *               - number_of_stars
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: 66f0a57be8c0d6e75a88f0a2
 *               feedback_description:
 *                 type: string
 *                 example: "Great platform! Helped me learn quickly."
 *               number_of_stars:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Missing required fields
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
 *                   example: "All fields are required"
 *       404:
 *         description: User not found
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
 *                   example: "User not found"
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
 *                   example: "Server Error"
 */
router.post("/", createFeedback);

/**
 * @swagger
 * /api/feedback:
 *   get:
 *     summary: Get all feedback
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: List of all feedback
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       fullName:
 *                         type: string
 *                         example: "John Doe"
 *                       stars:
 *                         type: integer
 *                         example: 4
 *                       description:
 *                         type: string
 *                         example: "Good platform but UI can be improved."
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-08-26T10:20:30Z"
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
 *                   example: "Server Error"
 */
router.get("/", getAllFeedback);

module.exports = router;