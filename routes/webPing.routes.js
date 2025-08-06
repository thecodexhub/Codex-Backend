const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: HealthCheck
 *   description: Monitoring and health check endpoints
 */

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Health check route
 *     tags: [HealthCheck]
 *     description: Returns a simple message with IP and timestamp to confirm the server is live.
 *     responses:
 *       200:
 *         description: Successful ping
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Ping from ::1 at 2025-08-06T12:00:00.000Z
 */
router.get('/', (req, res) => {
  res.send(`Ping from ${req.ip} at ${new Date().toISOString()}`);
});

module.exports = router;