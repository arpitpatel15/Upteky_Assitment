import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/feedback";

export const feedbackAPI = {
  submitFeedback: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, data);

      return {
        success: true,
        message: response.data.message,
        data: response.data.data
      };
    } catch (error) {
      console.error("Submit Feedback Error:", error.response?.data || error.message);

      return {
        success: false,
        message: error.response?.data?.message || "Failed to submit feedback"
      };
    }
  },
  getAllFeedback: async () => {
    try {
      const response = await axios.get(API_BASE_URL);

      return {
        success: true,
        data: response.data.feedbacks
      };
    } catch (error) {
      console.error("Get Feedback Error:", error.response?.data || error.message);

      return {
        success: false,
        data: []
      };
    }
  },
  getAnalytics: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/analytics`);

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error("Analytics Error:", error.response?.data || error.message);

      return {
        success: false,
        data: {
          total: 0,
          avgRating: 0,
          positive: 0,
          negative: 0
        }
      };
    }
  }
};
