// routes/payment.routes.js
const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPaymentStatusByUser,
  updatePaymentStatus,
  getAllPayments,
  deletePaymentById,
} = require("../controllers/payment.controller");

/**
 * @swagger
 * tags:
 *   name: CustomPayments
 *   description: Custom payment tracking (manual verification system)
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment record
 *     tags: [CustomPayments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - firstName
 *               - lastName
 *               - amount
 *               - screenshotUrl
 *             properties:
 *               user_id:
 *                 type: string
 *                 description: MongoDB User ID
 *                 example: 64f2b1c2e8f1a2b3c4d5e6f7
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Doe
 *               amount:
 *                 type: number
 *                 example: 500
 *               screenshotUrl:
 *                 type: string
 *                 description: URL of payment screenshot
 *                 example: "https://example.com/uploads/screenshot.png"
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 paymentId:
 *                   type: string
 *                   example: 650cba27a2f1b1c2d3e4f5a6
 *                 userId:
 *                   type: string
 *                   example: 64f2b1c2e8f1a2b3c4d5e6f7
 *                 paymentStatus:
 *                   type: string
 *                   example: IN_REVIEW
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/user/{userId}:
 *   get:
 *     summary: Get latest payment status by User ID
 *     tags: [CustomPayments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB User ID
 *         example: 64f2b1c2e8f1a2b3c4d5e6f7
 *     responses:
 *       200:
 *         description: Latest payment status for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 userId:
 *                   type: string
 *                   example: 64f2b1c2e8f1a2b3c4d5e6f7
 *                 paymentStatus:
 *                   type: string
 *                   example: VERIFIED
 *       200_alt:
 *         description: No payment found → returns NOT_PROCESSED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 userId:
 *                   type: string
 *                   example: 64f2b1c2e8f1a2b3c4d5e6f7
 *                 paymentStatus:
 *                   type: string
 *                   example: NOT_PROCESSED
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/payments/{userId}/{paymentId}:
 *   patch:
 *     summary: Update payment status manually
 *     tags: [CustomPayments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID linked to the payment
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Payment ID to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - paymentStatus
 *             properties:
 *               paymentStatus:
 *                 type: string
 *                 enum: [IN_REVIEW, VERIFIED]
 *                 example: VERIFIED
 *     responses:
 *       200:
 *         description: Payment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 paymentId:
 *                   type: string
 *                   example: 650cba27a2f1b1c2d3e4f5a6
 *                 userId:
 *                   type: string
 *                   example: 64f2b1c2e8f1a2b3c4d5e6f7
 *                 paymentStatus:
 *                   type: string
 *                   example: VERIFIED
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */

// /**
//  * @swagger
//  * /api/payments:
//  *   delete:
//  *     summary: Delete all payments
//  *     tags: [CustomPayments]
//  *     responses:
//  *       200:
//  *         description: All payments deleted successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 success:
//  *                   type: boolean
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *                   example: All payments deleted
//  *       500:
//  *         description: Server error
//  */

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [CustomPayments]
 *     responses:
 *       200:
 *         description: List of all payments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: number
 *                   example: 3
 *                 payments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *       500:
 *         description: Server error
 *
 * /api/payments/{paymentId}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [CustomPayments]
 *     parameters:
 *       - in: path
 *         name: paymentId
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB Payment ID
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Server error
 */

router.post("/", createPayment);
router.get("/user/:userId", getPaymentStatusByUser);
router.patch("/:userId/:paymentId", updatePaymentStatus);
// router.delete("/", deleteAllPayments);
router.get("/", getAllPayments);
router.delete("/:paymentId", deletePaymentById);

module.exports = router;
