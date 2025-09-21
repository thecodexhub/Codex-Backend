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
 *     summary: Get paginated list of companies with optional search
 *     tags: [Company]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Page number (9 companies per page)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Optional text to filter company names (partial match)
 *     responses:
 *       200:
 *         description: Paginated and filtered list of companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       company_logo:
 *                         type: string
 *                       interviewCount:
 *                         type: integer
 *                 currentPage:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalCompanies:
 *                   type: integer
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
 *     summary: Bulk upload companies with logo
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companies
 *             properties:
 *               companies:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     company_logo:
 *                       type: string
 *                 example:
 *                   - name: BOSLEO
 *                     company_logo: https://logo.com/bosleo.png
 *                   - name: MICROSOFT
 *                     company_logo: https://logo.com/ms.png
 *     responses:
 *       201:
 *         description: List of companies added and skipped
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/bulk-add", bulkAddCompanies);

module.exports = router;