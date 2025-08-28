const express = require("express");
const router = express.Router();
const {
  markTopicProgress,
  getChaptersProgress,
  getChapterById
} = require("../controllers/documentation.controller");

/**
 * @swagger
 * tags:
 *   name: Documentation
 *   description: Track user progress in modules, chapters, and topics
 *
 * components:
 *   schemas:
 *     TopicProgress:
 *       type: object
 *       properties:
 *         topicId:
 *           type: string
 *           example: "T1"
 *         isComplete:
 *           type: boolean
 *           example: true
 *
 *     ChapterProgress:
 *       type: object
 *       properties:
 *         chapterId:
 *           type: string
 *           example: "C1"
 *         count:
 *           type: integer
 *           description: Number of completed topics
 *           example: 3
 *         topics:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/TopicProgress'
 *
 *     ProgressResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               type: string
 *               example: "66f0a57be8c0d6e75a88f0a2"
 *             moduleId:
 *               type: string
 *               example: "M1"
 *             chapterId:
 *               type: string
 *               example: "C1"
 *             topicId:
 *               type: string
 *               example: "T1"
 *             isComplete:
 *               type: boolean
 *               example: true
 *             updatedAt:
 *               type: string
 *               format: date-time
 *               example: "2025-08-26T12:45:30Z"
 */

/**
 * @swagger
 * /api/documentation:
 *   post:
 *     summary: Mark a topic as complete/incomplete for a user
 *     tags: [Documentation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - module_id
 *               - chapter_id
 *               - topic_id
 *               - isComplete
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "66f0a57be8c0d6e75a88f0a2"
 *               module_id:
 *                 type: string
 *                 example: "M1"
 *               chapter_id:
 *                 type: string
 *                 example: "C1"
 *               topic_id:
 *                 type: string
 *                 example: "T1"
 *               isComplete:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Topic progress updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProgressResponse'
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
 *                   example: "Missing required fields"
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
router.post("/", markTopicProgress);

/**
 * @swagger
 * /api/documentation/allChapters:
 *   get:
 *     summary: Get all chapters progress for a user in a module
 *     tags: [Documentation]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "66f0a57be8c0d6e75a88f0a2"
 *       - in: query
 *         name: module_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "M1"
 *     responses:
 *       200:
 *         description: Chapters progress retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 chapters:
 *                   type: object
 *                   additionalProperties:
 *                     $ref: '#/components/schemas/ChapterProgress'
 *                 example:
 *                   success: true
 *                   chapters:
 *                     C1:
 *                       count: 3
 *                       topics:
 *                         - topicId: "T1"
 *                           isComplete: true
 *                         - topicId: "T2"
 *                           isComplete: true
 *                         - topicId: "T3"
 *                           isComplete: false
 *                         - topicId: "T4"
 *                           isComplete: true
 *                     C2:
 *                       count: 1
 *                       topics:
 *                         - topicId: "T1"
 *                           isComplete: false
 *                         - topicId: "T2"
 *                           isComplete: true
 *       400:
 *         description: Missing required params
 *       500:
 *         description: Server error
 */
router.get("/allChapters", getChaptersProgress);

/**
 * @swagger
 * /api/documentation/chapter:
 *   get:
 *     summary: Get progress of a specific chapter for a user
 *     tags: [Documentation]
 *     parameters:
 *       - in: query
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "66f0a57be8c0d6e75a88f0a2"
 *       - in: query
 *         name: module_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "M1"
 *       - in: query
 *         name: chapter_id
 *         required: true
 *         schema:
 *           type: string
 *           example: "C1"
 *     responses:
 *       200:
 *         description: Topics progress in a chapter retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 topics:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TopicProgress'
 *                 example:
 *                   success: true
 *                   topics:
 *                     - topicId: "T1"
 *                       isComplete: true
 *                     - topicId: "T2"
 *                       isComplete: false
 *                     - topicId: "T3"
 *                       isComplete: true
 *       400:
 *         description: Missing required params
 *       500:
 *         description: Server error
 */
router.get("/chapter", getChapterById);

module.exports = router;