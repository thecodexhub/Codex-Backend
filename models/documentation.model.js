const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  moduleId: {
    type: String,
    required: true,
  },
  chapterId: {
    type: String,
    required: true,
  },
  topicId: {
    type: String,
    required: true,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

progressSchema.index({ user: 1, moduleId: 1, chapterId: 1, topicId: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema);