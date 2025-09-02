// models/payment.model.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  amount: { type: Number, required: true },
  screenshotUrl: { type: String, required: true },
  paymentStatus: {
    type: String,
    enum: ["NOT_PROCESSED", "IN_VERIFICATION", "VERIFIED", "DONE"],
    default: "NOT_PROCESSED",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
