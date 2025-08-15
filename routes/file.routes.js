const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadImage, viewImage } = require('../controllers/file.controller');

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   name: Image
 *   description: Image upload and retrieval
 */

/**
 * @swagger
 * /api/image/upload:
 *   post:
 *     summary: Upload an image to MongoDB
 *     tags: [Image]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 imageId:
 *                   type: string
 *                 imageUrl:
 *                  type: string
 */
router.post('/upload', upload.single('image'), uploadImage);

/**
 * @swagger
 * /api/image/view/{id}:
 *   get:
 *     summary: View image by ID
 *     tags: [Image]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The image ID
 *     responses:
 *       200:
 *         description: Image binary data
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 */
router.get('/view/:id', viewImage);

module.exports = router;