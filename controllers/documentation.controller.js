const Progress = require("../models/documentation.model");

// 1. POST - Mark topic as complete/incomplete
exports.markTopicProgress = async (req, res) => {
  try {
    const { user_id, module_id, chapter_id, topic_id, isComplete } = req.body;

    if (!user_id || !module_id || !chapter_id || !topic_id) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const progress = await Progress.findOneAndUpdate(
      { user: user_id, moduleId: module_id, chapterId: chapter_id, topicId: topic_id },
      { isComplete, updatedAt: new Date() },
      { upsert: true, new: true }
    );

    return res.status(200).json({ success: true, data: progress });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 2. GET Chapters - Return chapters with topics & completion count
exports.getChaptersProgress = async (req, res) => {
  try {
    const { user_id, module_id } = req.query;

    if (!user_id || !module_id) {
      return res.status(400).json({ success: false, message: "Missing required params" });
    }

    const progressData = await Progress.find({ user: user_id, moduleId: module_id });

    // Group by chapters
    const chapters = {};
    progressData.forEach((item) => {
      if (!chapters[item.chapterId]) {
        chapters[item.chapterId] = { count: 0, topics: [] };
      }
      if (item.isComplete) chapters[item.chapterId].count++;
      chapters[item.chapterId].topics.push({
        topicId: item.topicId,
        isComplete: item.isComplete,
      });
    });

    res.status(200).json({ success: true, chapters });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// 3. GET Chapter by ID - Return topics only
exports.getChapterById = async (req, res) => {
  try {
    const { user_id, module_id, chapter_id } = req.query;

    if (!user_id || !module_id || !chapter_id) {
      return res.status(400).json({ success: false, message: "Missing required params" });
    }

    const topics = await Progress.find({ user: user_id, moduleId: module_id, chapterId: chapter_id })
      .select("topicId isComplete -_id");

    res.status(200).json({ success: true, topics });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
