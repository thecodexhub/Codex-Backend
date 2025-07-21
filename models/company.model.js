const mongoose = require("mongoose");
const { createInterviewDBConnection } = require("../config/db");

const companyDB = createInterviewDBConnection();

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Company = companyDB.model("Company", CompanySchema);
module.exports = Company;