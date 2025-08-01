const mongoose = require("mongoose");
const { DepartmentEnum } = require("../utils/enum");
const { createInterviewDBConnection } = require("../config/db");

const interviewDB = createInterviewDBConnection();

const RoundSchema = new mongoose.Schema({
  round_name: { type: String },
  isRoundOffline: { type: Boolean },
  description: { type: String },
});

const InterviewExperienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: { type: String },
  dept: {
    type: String,
    enum: DepartmentEnum,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  companyName: { type: String },
  role: { type: String },
  isInternshipOrTrainingProvided: { type: Boolean },
  internshipPeriodInMonths: { type: String },
  numberOfRounds: { type: Number },
  ctcOffered: { type: String },
  rounds: [RoundSchema],
  linkedinUrl: { type: String },
  eligibilityCriteria: { type: String },
});

module.exports = interviewDB.model("InterviewExperience", InterviewExperienceSchema);
