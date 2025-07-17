const User = require("../models/user.model");

exports.updateUserStory = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      department,
      year,
      codingSoFar,
    } = req.body;

    const updatedFields = {};

    if (firstName) updatedFields["name.firstName"] = firstName;
    if (lastName) updatedFields["name.lastName"] = lastName;
    if (department) updatedFields.department = department;
    if (year) updatedFields.year = year;
    if (codingSoFar) updatedFields.codingSoFar = codingSoFar;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, data: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};