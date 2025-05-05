import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { FiClock, FiUser, FiAlertTriangle, FiTrendingUp } from 'react-icons/fi';
import { MdOutlineDownloading } from "react-icons/md";
function Articles() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleArticles, setVisibleArticles] = useState(6);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/showNews');
        setNews(res.data.news.reverse());
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError('Failed to load news articles. Please try again later.');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = news.filter(item => {
    const matchesFilter = filter === 'all' || 
                         (filter === 'breaking' && item.isBreaking) || 
                         (filter === 'trending' && item.isTrending) ||
                         item.category.toLowerCase() === filter;
    
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const loadMoreArticles = () => {
    setVisibleArticles(prev => prev + 6);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 text-lg font-medium">Loading latest news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-6xl mx-auto py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <div className="flex items-start">
            <FiAlertTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0" size={20} />
            <div>
              <h3 className="text-lg font-medium text-red-800 mb-2">Error loading articles</h3>
              <p className="text-red-700">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-8xl mx-auto px-4 sm:px-6 py-2">
      {/* Header Section */}
      <div className="text-center mb-10 md:mb-12">
  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Latest News & Updates</h1>
  <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-normal">
    Stay informed with carefully curated news from around the world
  </p>
</div>

      {/* Filters and Search */}
      <div className="mb-12 bg-white rounded-xl shadow-sm p-2  border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="relative flex-grow max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${filter === 'all' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All News
            </button>
            <button
              onClick={() => setFilter('breaking')}
              className={`px-4 py-2 text-sm font-medium rounded-full flex items-center gap-2 transition-colors ${filter === 'breaking' ? 'bg-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <FiAlertTriangle size={16} /> Breaking
            </button>
            <button
              onClick={() => setFilter('trending')}
              className={`px-4 py-2 text-sm font-medium rounded-full flex items-center gap-2 transition-colors ${filter === 'trending' ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <FiTrendingUp size={16} /> Trending
            </button>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      {filteredNews.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto h-24 w-24 text-gray-300 mb-6">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-lg text-gray-500 max-w-md mx-auto">
            {searchTerm ? 'Try adjusting your search query' : 'No articles match the selected filters'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.slice(0, visibleArticles).map((item, index) => (
              <article 
                key={index} 
                className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col h-full bg-white border border-gray-100"
              >
                {item.image && (
                  <div className="relative h-56 w-full overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      {item.isBreaking && (
                        <span className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center shadow-md">
                          <FiAlertTriangle className="mr-1.5" size={12} /> BREAKING
                        </span>
                      )}
                      {item.isTrending && (
                        <span className="px-3 py-1.5 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center shadow-md">
                          <FiTrendingUp className="mr-1.5" size={12} /> TRENDING
                        </span>
                      )}
                    </div>
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4">
                    <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 text-gray-900 line-clamp-2 leading-snug">
                    {item.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-5 border-t border-gray-100">
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center">
                        <FiUser className="mr-2 text-gray-400" size={16} />
                        <span className="font-medium">{item.author}</span>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-2 text-gray-400" size={16} />
                        <span>{format(new Date(item.date), 'MMM d, yyyy')}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                        {item.readTime} read
                      </span>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center">
                        Read More <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          {visibleArticles < filteredNews.length && (
            <div className="mt-14 text-center">
              <button 
                onClick={loadMoreArticles}
                className="px-8 py-3 bg-white border border-gray-200 flex justify-end rounded-lg text-gray-700 hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md font-medium text-lg"
              >Load More Articles . . .
                
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Articles;