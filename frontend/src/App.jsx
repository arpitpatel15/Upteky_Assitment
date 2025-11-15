import { useState, useEffect } from 'react';
import AnalyticsCards from './components/AnalyticsCards';
import FeedbackForm from './components/FeedbackForm';
import FeedbackTable from './components/FeedbackTable';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('form');

  // --- Apply Dark Theme ---
  // Effect to apply the 'dark' class to the html tag on mount
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark');
  }, []);
  // --- End Theme ---

  const handleFeedbackSubmitted = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    // Always use dark background
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        
        <header className="text-center mb-8 relative">
          <h1 className="text-5xl font-bold text-white mb-3">
            Feedback Management Dashboard
          </h1>
          <p className="text-lg text-gray-300">
            Share your feedback and track customer insights
          </p>
          {/* Theme Toggle Button Removed */}
        </header>

        <AnalyticsCards refreshTrigger={refreshTrigger} />

        <div className="mb-6">
          <div className="flex gap-4 justify-center border-b border-gray-700">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'form'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Submit Feedback
            </button>
            <button
              onClick={() => setActiveTab('table')}
              className={`px-6 py-3 font-semibold transition-all ${
                activeTab === 'table'
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              View All Feedbacks
            </button>
          </div>
        </div>

        <div className="mb-8">
          {activeTab === 'form' && (
            <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
          )}
          {activeTab === 'table' && (
            <FeedbackTable refreshTrigger={refreshTrigger} />
          )}
        </div>

        <footer className="text-center text-gray-400 text-sm mt-12 pb-6">
          <p>Built with React + TailwindCSS</p>
        </footer>
      </div>
    </div>
  );
}

export default App;