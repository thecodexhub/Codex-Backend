// models/payment.model.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  amount: { type: Number, required: true },
  screenshotUrl: { type: String, required: true },
  paymentStatus: {
    type: String,
    enum: ["NOT_PROCESSED", "IN_REVIEW", "VERIFIED"],
    default: "IN_REVIEW",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
