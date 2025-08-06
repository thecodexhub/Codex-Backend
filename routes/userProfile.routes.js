const express = require("express");
const router = express.Router();
const { userProfile, createOrFindUser, deleteAllUsers, getAllUsers, getUserById } = require("../controllers/userProfile.controller");

/**
 * @swagger
 * tags:
 *   name: UserProfile
 *   description: Endpoints for managing user profiles
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

 *     UserProfile:
 *       type: object
 *       properties:
 *         uid:
 *           type: string
 *           description: Firebase UID or authentication ID
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
 * /api/userProfile:
 *   post:
 *     summary: Create or find a user by uid and email
 *     tags: [UserProfile]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uid
 *               - email
 *             properties:
 *               uid:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User found or created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 isNewUser:
 *                   type: boolean
 *                 _id:
 *                   type: string
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post("/", createOrFindUser);

/**
 * @swagger
 * /api/userProfile/{id}:
 *   patch:
 *     summary: Update a user story
 *     tags: [UserProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user MongoDB document ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
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
 *                   $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.patch("/:id", userProfile);

/**
 * @swagger
 * /api/userProfile:
 *   get:
 *     summary: Get all users
 *     tags: [UserProfile]
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/UserProfile'
 *       500:
 *         description: Server error
 */
router.get("/", getAllUsers);

/**
 * @swagger
 * /api/userProfile/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [UserProfile]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB document ID of the user
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/UserProfile'
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get("/:id", getUserById);

/**
 * @swagger
 * /api/userProfile/delete-all:
 *   delete:
 *     summary: Delete all Users
 *     tags: [UserProfile]
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
 *         description: All Users deleted
 *       403:
 *         description: Invalid password
 *       500:
 *         description: Server error
 */
router.delete("/delete-all", deleteAllUsers);

module.exports = router;