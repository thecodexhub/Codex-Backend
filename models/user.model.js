const mongoose = require("mongoose");
const { DepartmentEnum, YearEnum, CodingEnum } = require("../utils/enum");

const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
  name: {
    firstName: { type: String },
    lastName: { type: String },
  },
  department: {
    type: String,
    enum: DepartmentEnum,
    default: null,
  },
  year: {
    type: String,
    enum: YearEnum,
    default: null,
  },
  codingSoFar: {
    type: String,
    enum: CodingEnum,
    default: null,
  },
});

module.exports = mongoose.model("User", userSchema);