import { useState, useEffect } from 'react';
import { feedbackAPI } from '../services/api';

const FeedbackTable = ({ refreshTrigger }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchFeedbacks = async () => {
    setIsLoading(true);
    try {
      const response = await feedbackAPI.getAllFeedback();
      if (response.success) {
        setFeedbacks(response.data);
        setFilteredFeedbacks(response.data); // default list
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [refreshTrigger]);

  // -----------------------------
  // SEARCH FUNCTIONALITY
  // -----------------------------
  useEffect(() => {
    const result = feedbacks.filter((fb) =>
      fb.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFeedbacks(result);
  }, [searchTerm, feedbacks]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // -----------------------------
  // EXPORT CSV FUNCTIONALITY
  // -----------------------------
  const exportToCSV = () => {
    if (filteredFeedbacks.length === 0) {
      alert("No feedbacks to export");
      return;
    }

    const rows = [
      ["Name", "Email", "Rating", "Message", "Created At"],
      ...filteredFeedbacks.map(f => [
        f.name,
        f.email,
        f.rating,
        f.message.replace(/\n/g, " "), 
        formatDate(f.createdAt)
      ])
    ];

    const csvContent = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "feedbacks.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderStars = (rating) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-5 h-5 ${
            star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
          }`}
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      ))}
      <span className="ml-2 text-gray-700 dark:text-gray-200 font-medium">{rating}</span>
    </div>
  );

  // -----------------------------
  // LOADING STATE
  // -----------------------------
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">All Feedbacks</h2>
        <div className="flex items-center justify-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-600 rounded-full animate-spin border-t-transparent absolute top-0 left-0"></div>
          </div>
          <span className="ml-4 text-gray-600 dark:text-gray-300 text-lg">Loading feedbacks...</span>
        </div>
      </div>
    );
  }

  // -----------------------------
  // EMPTY STATE
  // -----------------------------
  if (filteredFeedbacks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">All Feedbacks</h2>

          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md transition"
          >
            Export CSV
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-4 mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">No matching results</p>
        </div>
      </div>
    );
  }

  // -----------------------------
  // MAIN TABLE
  // -----------------------------
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">

      {/* Header + Export */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">All Feedbacks</h2>

        <button
          onClick={exportToCSV}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-md transition"
        >
          Export CSV
        </button>
      </div>

      {/* Search Bar */}
      <div className="mt-2 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredFeedbacks.map((feedback, index) => (
              <tr
                key={feedback._id}
                className={`transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {feedback.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {feedback.name}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700 dark:text-gray-300">{feedback.email}</div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {renderStars(feedback.rating)}
                </td>

                <td className="px-6 py-4">
                  <div className="text-sm text-gray-700 dark:text-gray-300 max-w-md">
                    {feedback.message}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {formatDate(feedback.createdAt)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default FeedbackTable;
