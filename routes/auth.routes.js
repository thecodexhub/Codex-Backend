const express = require("express");
const router = express.Router();
const verifyFirebaseToken = require("../middleware/firebaseMiddleware");
const { verifyUser } = require("../controllers/auth.controller");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Firebase authentication and user management
 */

/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Verifies Firebase ID token and returns user info
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     email:
 *                       type: string
 *       401:
 *         description: No token provided
 *       403:
 *         description: Token verification failed
 */
router.post("/verify", verifyFirebaseToken, verifyUser);

module.exports = router;