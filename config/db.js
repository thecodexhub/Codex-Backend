require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Default connection (primary DB)
    await mongoose.connect(process.env.mongoURI1, {
      dbName: "main", // optional: name your default DB
    });
    console.log("MongoDB (default) connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = { connectDB };
