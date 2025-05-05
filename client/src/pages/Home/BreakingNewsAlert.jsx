import React from 'react';

const BreakingNewsAlert = ({ breakingNews, darkMode }) => {
  if (!breakingNews.length) return null;

  return (
    <div className={`mb-6 p-3 rounded-lg flex items-center ${darkMode ? 'bg-red-900/30 border-l-4 border-red-500' : 'bg-red-50 border-l-4 border-red-600'}`}>
      <span className={`font-bold mr-3 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>BREAKING</span>
      <div className="flex-1 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {breakingNews.map((news, index) => (
            <span key={news.id} className="mr-8">
              <a href="#" className={`font-medium ${darkMode ? 'hover:text-red-300' : 'hover:text-red-700'}`}>
                {news.title}
              </a>
              {index < breakingNews.length - 1 && ' • '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsAlert;