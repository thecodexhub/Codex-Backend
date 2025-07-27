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
      uid,
    } = req.body;

    const updatedFields = {};

    if (firstName) updatedFields["name.firstName"] = firstName;
    if (lastName) updatedFields["name.lastName"] = lastName;
    if (department) updatedFields.department = department;
    if (year) updatedFields.year = year;
    if (codingSoFar) updatedFields.codingSoFar = codingSoFar;
    if (uid) updatedFields.uid = uid;

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

exports.createOrFindUser = async (req, res) => {
  try {
    const { uid, email } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ success: false, message: "uid and email are required" });
    }

    let user = await User.findOne({ uid, email });

    if (user) {
      return res.status(200).json({
        success: true,
        isNewUser: false,
        _id: user._id,
      });
    }

    user = new User({
      uid,
      email,
    });

    await user.save();

    return res.status(200).json({
      success: true,
      isNewUser: true,
      _id: user._id,
    });
  } catch (error) {
    console.error("Error in createOrFindUser:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
