const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors"); // ← Import CORS
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const storyRoutes = require("./routes/userStory.routes");
const interviewExperienceRoutes = require("./routes/interviewExperience.route");
const companyRoutes = require("./routes/company.routes");
const setupSwagger = require("./swagger/swagger");

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // ← Enable CORS for all routes and origins

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/userStory", storyRoutes);
app.use("/api/interviewExperience", interviewExperienceRoutes);
app.use("/api/company", companyRoutes);

setupSwagger(app);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);