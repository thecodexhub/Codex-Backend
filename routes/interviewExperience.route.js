const express = require("express");
const router = express.Router();
const {
  createInterviewExperience,
  getAllInterviewExperiences,
  getInterviewExperienceById,
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
 *             required:
 *               - companyId
 *               - name
 *               - dept
 *             properties:
 *               companyId:
 *                 type: string
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
 *                   type: object
 *                   properties:
 *                     round_name:
 *                       type: string
 *                     isRoundOffline:
 *                       type: boolean
 *                     description:
 *                       type: string
 *               linkedinUrl:
 *                 type: string
 *               eligibilityCriteria:
 *                 type: string
 *     responses:
 *       201:
 *         description: Interview experience saved successfully
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post("/", createInterviewExperience);

/**
 * @swagger
 * /api/interviewExperience:
 *   get:
 *     summary: Get all interview experiences
 *     tags: [InterviewExperience]
 *     parameters:
 *       - in: query
 *         name: companyId
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter interview experiences by companyId
 *     responses:
 *       200:
 *         description: List of interview experiences
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InterviewExperience'
 */
router.get("/", getAllInterviewExperiences);

/**
 * @swagger
 * /api/interviewExperience/{id}:
 *   get:
 *     summary: Get a single interview experience by ID
 *     tags: [InterviewExperience]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Interview experience ID
 *     responses:
 *       200:
 *         description: Interview experience details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterviewExperience'
 *       404:
 *         description: Interview experience not found
 */
router.get("/:id", getInterviewExperienceById);

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
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 example: codex
 *     responses:
 *       200:
 *         description: All interview experiences deleted
 *       403:
 *         description: Invalid password
 *       500:
 *         description: Server error
 */
router.delete("/delete-all", deleteAllInterviewExperiences);

/**
 * @swagger
 * components:
 *   schemas:
 *     InterviewExperience:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         companyId:
 *           type: string
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
 *           type: string
 *         numberOfRounds:
 *           type: number
 *         ctcOffered:
 *           type: string
 *         rounds:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               round_name:
 *                 type: string
 *               isRoundOffline:
 *                 type: boolean
 *               description:
 *                 type: string
 *         linkedinUrl:
 *           type: string
 *         eligibilityCriteria:
 *           type: string
 */

module.exports = router;
