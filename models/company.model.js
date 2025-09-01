const mongoose = require("mongoose");

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

module.exports = mongoose.model("Company", CompanySchema);
