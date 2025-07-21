const express = require("express");
const router = express.Router();
const {
  searchCompanies,
  addCompany,
  bulkAddCompanies,
  getAllCompanies,
} = require("../controllers/company.controller");


/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company search and management
 */

/**
 * @swagger
 * /api/company/search:
 *   get:
 *     summary: Search companies by name prefix
 *     tags: [Company]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Company name prefix
 *     responses:
 *       200:
 *         description: List of matching companies
 *       500:
 *         description: Server error
 */
router.get("/search", searchCompanies);

/**
 * @swagger
 * /api/company/all:
 *   get:
 *     summary: Get all company names
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Array of company names
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 *                 example: BOSLEO, DESEX, MICROSOFT
 *       500:
 *         description: Server error
 */
router.get("/all", getAllCompanies);

/**
 * @swagger
 * /api/company/add:
 *   post:
 *     summary: Add a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company added
 *       200:
 *         description: Company already exists
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/add", addCompany);

/**
 * @swagger
 * /api/company/bulk-add:
 *   post:
 *     summary: Bulk upload company names
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - names
 *             properties:
 *               names:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["BOSLEO", "DESEX", "MICROSOFT"]
 *     responses:
 *       201:
 *         description: List of companies added and skipped
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 inserted:
 *                   type: array
 *                   items:
 *                     type: string
 *                 skipped:
 *                   type: array
 *                   items:
 *                     type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/bulk-add", bulkAddCompanies);

module.exports = router;