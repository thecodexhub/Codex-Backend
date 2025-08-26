const Feedback = require("../models/feedback.model");
const User = require("../models/user.model");

// Create feedback
exports.createFeedback = async (req, res) => {
  try {
    const { user_id, feedback_description, number_of_stars } = req.body;

    if (!user_id || !feedback_description || !number_of_stars) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const feedback = new Feedback({
      user: user_id,
      description: feedback_description,
      stars: number_of_stars,
    });

    await feedback.save();

    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get all feedback with user details
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate("user", "name.firstName name.lastName")
      .sort({ createdAt: -1 });

    const formatted = feedbacks.map((fb) => ({
      fullName: `${fb.user.name.firstName} ${fb.user.name.lastName}`,
      stars: fb.stars,
      description: fb.description,
      date: fb.createdAt,
    }));

    res.status(200).json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};