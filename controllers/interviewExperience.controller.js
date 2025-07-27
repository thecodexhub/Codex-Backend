const InterviewExperience = require("../models/interviewExperience.model");

exports.createInterviewExperience = async (req, res) => {
  try {
    const data = req.body;

    if (!data.companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    data.ctcOffered = `${data.ctcOffered} LPA`;
    data.internshipPeriodInMonths = `${data.internshipPeriodInMonths} Months`;

    const experience = await InterviewExperience.create(data);

    res.status(201).json({
      message: "Interview experience saved successfully",
      id: experience._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllInterviewExperiences = async (req, res) => {
  try {
    const { companyId } = req.query;

    const filter = {};
    if (companyId) {
      filter.companyId = companyId;
    }

    const experiences = await InterviewExperience.find(filter);
    res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInterviewExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await InterviewExperience.findById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json(experience);
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