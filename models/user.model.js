const mongoose = require("mongoose");
const { DepartmentEnum, YearEnum, CodingEnum } = require("../utils/enum");

const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
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