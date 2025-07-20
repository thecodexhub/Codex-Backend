const mongoose = require("mongoose");
const { DepartmentEnum, YearEnum } = require("../utils/enum");
const { createInterviewDBConnection } = require("../config/db");

const interviewDB = createInterviewDBConnection();

const RoundSchema = new mongoose.Schema({
  round_name: { type: String },
  isRoundOffline: { type: Boolean },
  description: { type: String },
});

const InterviewExperienceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  year: {
    type: String,
    enum: YearEnum,
    required: true,
  },
  dept: {
    type: String,
    enum: DepartmentEnum,
    required: true,
  },
  companyName: { type: String },
  role: { type: String },
  isInternshipOrTrainingProvided: { type: Boolean },
  internshipPeriodInMonths: { type: Number },
  numberOfRounds: { type: Number },
  ctcOffered: { type: Number },
  rounds: [RoundSchema],
  linkedinUrl: { type: String },
  eligibilityCriteria: { type: String },
});

module.exports = interviewDB.model("InterviewExperience", InterviewExperienceSchema);
