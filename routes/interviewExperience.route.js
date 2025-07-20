const express = require("express");
const router = express.Router();
const { createInterviewExperience } = require("../controllers/interviewExperience.controller");

/**
 * @swagger
 * tags:
 *   name: InterviewExperience
 *   description: APIs for managing interview experiences
 *
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
 *           enum: [FY, SY, TY, LY]
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
 *           type: number
 *         numberOfRounds:
 *           type: number
 *         ctcOffered:
 *           type: number
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
 *             $ref: '#/components/schemas/InterviewExperience'
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
 *       500:
 *         description: Server error
 */

router.post("/api/interviewExperience", createInterviewExperience);

module.exports = router;