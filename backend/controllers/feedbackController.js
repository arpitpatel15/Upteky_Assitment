const Feedback = require("../models/Feedback");
exports.submitFeedback = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    if (!name || !email || !message || !rating) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newFeedback = await Feedback.create({
      name,
      email,
      message,
      rating
    });
    return res.status(201).json({
      message: "Feedback submitted successfully.",
      data: newFeedback
    });
  } catch (err) {
    console.error("Submit Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      total: feedbacks.length,
      feedbacks
    });
  } catch (err) {
    console.error("Get Feedbacks Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    const total = feedbacks.length;

    const avgRating =
      total === 0
        ? 0
        : (feedbacks.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1);

    const positive = feedbacks.filter((f) => f.rating >= 4).length;
    const negative = feedbacks.filter((f) => f.rating <= 3).length;

    res.status(200).json({
      total,
      avgRating,
      positive,
      negative
    });
  } catch (err) {
    console.error("Analytics Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
