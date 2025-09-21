const Progress = require("../models/documentation.model");
const mongoose = require("mongoose");

// 4. GET Dashboard - Weekly Progress
exports.getDashboard = async (req, res) => {
  try {
    const { user_id, startDate, endDate } = req.query;

    if (!user_id || !startDate || !endDate) {
      return res.status(400).json({ success: false, message: "Missing required params (user_id, startDate, endDate)" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Aggregate function to count per day
    const getProgressCounts = async (moduleIds) => {
      return await Progress.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(user_id),
            moduleId: { $in: moduleIds },
            isComplete: true,
            updatedAt: { $gte: start, $lte: end },
          },
        },
        {
          $group: {
            _id: {
              day: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" } },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.day": 1 } },
      ]);
    };

    // Aggregate function to get total count
    const getTotalCount = async (moduleIds) => {
      const result = await Progress.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(user_id),
            moduleId: { $in: moduleIds },
            isComplete: true,
            updatedAt: { $gte: start, $lte: end },
          },
        },
        {
          $count: "total",
        },
      ]);
      return result.length > 0 ? result[0].total : 0;
    };

    // Fetch both progress sets
    const progProgress = await getProgressCounts(["C1"]);
    const specProgress = await getProgressCounts(["S1", "S2"]);

    // Get total counts
    const prog_progress_total = await getTotalCount(["C1"]);
    const specialisation_prog_total = await getTotalCount(["S1", "S2"]);

    // Utility → fill all 7 days (even if 0)
    const fillSevenDays = (start, end, progressArr) => {
      const result = [];
      let current = new Date(start);

      while (current <= end) {
        const dayStr = current.toISOString().split("T")[0];
        const found = progressArr.find((p) => p._id.day === dayStr);
        result.push({
          day: dayStr,
          count: found ? found.count : 0,
        });
        current.setDate(current.getDate() + 1);
      }
      return result;
    };

    const prog_progress = fillSevenDays(start, end, progProgress);
    const specialisation_prog = fillSevenDays(start, end, specProgress);

    res.status(200).json({
      success: true,
      prog_progress,
      specialisation_prog,
      prog_progress_total,
      specialisation_prog_total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
