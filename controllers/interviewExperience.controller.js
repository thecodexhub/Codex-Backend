const InterviewExperience = require("../models/interviewExperience.model");

exports.createInterviewExperience = async (req, res) => {
  try {
    const data = req.body;
    
    data.ctcOffered = `${data.ctcOffered} LPA`;
    data.internshipPeriodInMonths = `${data.internshipPeriodInMonths} Months`;

    const experience = await InterviewExperience.create(data);

    res.status(201).json({ message: "Interview experience saved successfully", id: experience._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllInterviewExperiences = async (req, res) => {
  try {
    const experiences = await InterviewExperience.find();
    res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteAllInterviewExperiences = async (req, res) => {
  try {
    const { password } = req.body;

    if (password !== "codex") {
      return res.status(403).json({ message: "Unauthorized: Invalid password" });
    }

    await InterviewExperience.deleteMany({});
    res.status(200).json({ message: "All interview experiences have been deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};