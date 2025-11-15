const express = require("express");
const router = express.Router();
const {submitFeedback,getAllFeedbacks,getAnalytics
} = require("../controllers/feedbackController");

router.post("/", submitFeedback);
router.get("/", getAllFeedbacks);
router.get("/analytics", getAnalytics);

module.exports = router;
