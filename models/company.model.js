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
  company_logo: {
    type: String,
    trim: true,
    default: "",
  },
});

const Company = companyDB.model("Company", CompanySchema);
module.exports = Company;