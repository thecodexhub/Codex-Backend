const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const storyRoutes = require("./routes/userStory.routes");
const setupSwagger = require("./swagger/swagger");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user-story", storyRoutes);

setupSwagger(app);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);