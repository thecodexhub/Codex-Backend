const express = require("express");
const router = express.Router();
const {
  createInterviewExperience,
  getAllInterviewExperiences,
  deleteAllInterviewExperiences,
} = require("../controllers/interviewExperience.controller");

/**
 * @swagger
 * tags:
 *   name: InterviewExperience
 *   description: APIs for managing interview experiences
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Round:
 *       type: object
 *       properties:
 *         round_name:
 *           type: string
 *         isRoundOffline:
 *           type: boolean
 *         description:
 *           type: string
 *
 *     InterviewExperience:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         year:
 *           type: string
 *         dept:
 *           type: string
 *           enum: [COMPUTER, IT, AIDS, CSD, ROBOSTICS, ENTC, OTHER]
 *         companyName:
 *           type: string
 *         role:
 *           type: string
 *         isInternshipOrTrainingProvided:
 *           type: boolean
 *         internshipPeriodInMonths:
 *           type: string    # ← Returned as formatted string in GET
 *         numberOfRounds:
 *           type: number
 *         ctcOffered:
 *           type: string    # ← Returned as formatted string in GET
 *         rounds:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Round'
 *         linkedinUrl:
 *           type: string
 *         eligibilityCriteria:
 *           type: string
 */

/**
 * @swagger
 * /api/interviewExperience:
 *   post:
 *     summary: Submit an interview experience
 *     tags: [InterviewExperience]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               year:
 *                 type: string
 *               dept:
 *                 type: string
 *                 enum: [COMPUTER, IT, AIDS, CSD, ROBOSTICS, ENTC, OTHER]
 *               companyName:
 *                 type: string
 *               role:
 *                 type: string
 *               isInternshipOrTrainingProvided:
 *                 type: boolean
 *               internshipPeriodInMonths:
 *                 type: number
 *               numberOfRounds:
 *                 type: number
 *               ctcOffered:
 *                 type: number
 *               rounds:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Round'
 *               linkedinUrl:
 *                 type: string
 *               eligibilityCriteria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Interview experience saved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Interview experience saved successfully
 *                 id:
 *                   type: string
 *       500:
 *         description: Server error
 *
 *   get:
 *     summary: Get all interview experiences
 *     tags: [InterviewExperience]
 *     responses:
 *       200:
 *         description: List of all interview experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InterviewExperience'
 *       500:
 *         description: Server error
 */

router.post("/", createInterviewExperience);
router.get("/", getAllInterviewExperiences);

/**
 * @swagger
 * /api/interviewExperience/delete-all:
 *   delete:
 *     summary: Delete all interview experiences
 *     tags: [InterviewExperience]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: codex
 *     responses:
 *       200:
 *         description: All interview experiences deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       403:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Server error
 */
router.delete("/delete-all", deleteAllInterviewExperiences);  // Make sure this line exists

module.exports = router;