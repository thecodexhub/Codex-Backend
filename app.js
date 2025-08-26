const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ← Import CORS
const { connectDB } = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const userProfile = require("./routes/userProfile.routes");
const interviewExperienceRoutes = require("./routes/interviewExperience.route");
const companyRoutes = require("./routes/company.routes");
const feedbackRoutes = require("./routes/feedback.routes");
const pingRoutes = require("./routes/webPing.routes");
const fileRoutes = require("./routes/file.routes");

const path = require("path");

const setupSwagger = require("./swagger/swagger");

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // ← Enable CORS for all routes and origins

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/userProfile", userProfile);
app.use("/api/interviewExperience", interviewExperienceRoutes);
app.use("/api/company", companyRoutes);
app.use("api/feedback", feedbackRoutes);
app.use("/api/ping", pingRoutes);
app.use("/api/image", fileRoutes);

setupSwagger(app);

app.get('/ping', (req, res) => {
  res.send(`Ping from ${req.ip} at ${new Date().toISOString()}`);
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);