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