import { useState, useEffect } from 'react';
import { feedbackAPI } from '../services/api';

const AnalyticsCards = ({ refreshTrigger }) => {
  const [analytics, setAnalytics] = useState({
    totalFeedbacks: 0,
    averageRating: 0,
    positiveFeedbacks: 0,
    negativeFeedbacks: 0
  });

  const fetchAnalytics = async () => {
    try {
      const response = await feedbackAPI.getAllFeedback();
      if (response.success) {
        const feedbacks = response.data;
        const total = feedbacks.length;
        const avgRating = total > 0
          ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1)
          : 0;
        const positive = feedbacks.filter(f => f.rating >= 4).length;
        const negative = feedbacks.filter(f => f.rating <= 3).length;

        setAnalytics({
          totalFeedbacks: total,
          averageRating: avgRating,
          positiveFeedbacks: positive,
          negativeFeedbacks: negative
        });
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [refreshTrigger]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className=" from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium uppercase tracking-wide">Total Feedbacks</p>
            <p className="text-4xl font-bold mt-2">{analytics.totalFeedbacks}</p>
          </div>
          <div className="bg-blue-400 bg-opacity-30 rounded-full p-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className=" from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm font-medium uppercase tracking-wide">Average Rating</p>
            <div className="flex items-center mt-2">
              <p className="text-4xl font-bold">{analytics.averageRating}</p>
              <svg className="w-8 h-8 ml-2 text-yellow-300 fill-yellow-300" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
              </svg>
            </div>
          </div>
          <div className="bg-green-400 bg-opacity-30 rounded-full p-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
            </svg>
          </div>
        </div>
      </div>

      <div className="from-orange-500 to-orange-600 rounded-lg shadow-lg p-6 text-white transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm font-medium uppercase tracking-wide">Positive vs Negative</p>
            <div className="flex items-center mt-2 gap-4">
              <div>
                <p className="text-sm text-orange-100">Positive</p>
                <p className="text-3xl font-bold">{analytics.positiveFeedbacks}</p>
              </div>
              <div className="text-2xl font-light">|</div>
              <div>
                <p className="text-sm text-orange-100">Negative</p>
                <p className="text-3xl font-bold">{analytics.negativeFeedbacks}</p>
              </div>
            </div>
          </div>
          <div className="bg-orange-400 bg-opacity-30 rounded-full p-4">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCards;