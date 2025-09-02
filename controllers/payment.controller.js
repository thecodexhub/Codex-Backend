// controllers/payment.controller.js
const Payment = require("../models/payment.model");

// Create a payment request (POST)
exports.createPayment = async (req, res) => {
  try {
    const { user_id, firstName, lastName, amount, screenshotUrl } = req.body;

    if (!user_id || !firstName || !lastName || !amount || !screenshotUrl) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const payment = new Payment({
      userId: user_id,
      firstName,
      lastName,
      amount,
      screenshotUrl,
      paymentStatus: "IN_VERIFICATION",
    });

    await payment.save();

    res.status(201).json({
      success: true,
      paymentId: payment._id,
      userId: payment.userId,
      paymentStatus: payment.paymentStatus,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get payment status by ID (GET)
exports.getPaymentStatusByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const latestPayment = await Payment.findOne({ userId }).sort({ createdAt: -1 });

    if (!latestPayment) {
      return res.status(200).json({
        success: true,
        userId,
        paymentStatus: "NOT_PROCESSED",
      });
    }

    res.status(200).json({
      success: true,
      userId,
      paymentStatus: latestPayment.paymentStatus,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// Update payment status manually (PATCH)
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { userId, paymentId } = req.params;
    const { paymentStatus } = req.body;

    if (!["NOT_PROCESSED", "IN_VERIFICATION", "VERIFIED", "DONE"].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const payment = await Payment.findOne({ _id: paymentId, userId });

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    payment.paymentStatus = paymentStatus;
    await payment.save();

    res.status(200).json({
      success: true,
      paymentId: payment._id,
      userId: payment.userId,
      paymentStatus: payment.paymentStatus,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Delete all payments (DELETE)
exports.deleteAllPayments = async (req, res) => {
  try {
    await Payment.deleteMany({});
    res.status(200).json({ success: true, message: "All payments deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
