const User = require("../models/user.model");

exports.userProfile = async (req, res) => {
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
      if( user.year ){
        return res.status(200).json({ success: true, isNewUser: false, _id: user._id });
      }
      else{
        return res.status(200).json({ success: true, isNewUser: true, _id: user._id });
      }
    }

    user = new User({ uid, email });
    await user.save();

    return res.status(200).json({ success: true, isNewUser: true, _id: user._id });

  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.deleteAllUsers = async (req, res) => {
  try {
    const { password } = req.body;

    if (password !== "codex") {
      return res.status(401).json({ success: false, message: "Unauthorized: Invalid password" });
    }

    await User.deleteMany({});
    res.status(200).json({ success: true, message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



