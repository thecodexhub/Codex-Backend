const express = require("express");
const router = express.Router();
const { updateUserStory } = require("../controllers/userStory.controller");

/**
 * @swagger
 * tags:
 *   name: UserStory
 *   description: Endpoints for updating user stories
 *
 * components:
 *   schemas:
 *     DepartmentEnum:
 *       type: string
 *       enum: [COMPUTER, IT, AIDS, CSD, ROBOSTICS, ENTC, OTHER]

 *     YearEnum:
 *       type: string
 *       enum: [FY, SY, TY, LY]

 *     CodingEnum:
 *       type: string
 *       enum: [COMPLETELY_NEW, JUST_STARTING, BASIC_CODING, EXPERIENCED]

 *     UpdateUserStory:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         department:
 *           $ref: '#/components/schemas/DepartmentEnum'
 *         year:
 *           $ref: '#/components/schemas/YearEnum'
 *         codingSoFar:
 *           $ref: '#/components/schemas/CodingEnum'
 */

/**
 * @swagger
 * /api/userStory/{id}:
 *   patch:
 *     summary: Update a user story
 *     tags: [UserStory]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUserStory'
 *     responses:
 *       200:
 *         description: The updated user story
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/UpdateUserStory'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

router.patch("/api/userStory/:id", updateUserStory);

module.exports = router;