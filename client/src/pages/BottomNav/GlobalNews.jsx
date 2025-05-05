import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiGlobe } from 'react-icons/fi';

const GlobalNews = () => {
    const [query, setQuery] = useState('');
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNews = async (initial = false) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`http://localhost:5000/api/news/globalNews`, {
                params: { query: query || 'latest' }
            });
            setNews(response.data.articles.slice(0, initial ? 5 : 10));
        } catch (err) {
            setError('Could not fetch news data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(true);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchNews();
    };

    return (
        <div className="p-6 max-w-full mx-auto bg-blue-100 text-black rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-900">Global News Hub</h1>
            <form onSubmit={handleSubmit} className="flex gap-2 justify-center mb-6">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search news topics..."
                    className="p-2 border border-gray-400 bg-white text-black rounded-lg w-full max-w-md shadow-sm"
                />
                <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black">
                    Search
                </button>
            </form>

            {loading && <p className="text-center text-gray-600">Loading...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}
            {news.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center mb-4 border-b border-gray-300 pb-2 bg-blue-100 p-3 rounded-lg shadow-sm">
                        <FiGlobe className="text-gray-800 text-2xl mr-2" />
                        <h3 className="text-xl font-semibold text-gray-900">Latest Headlines</h3>
                    </div>
                    {news.map((article, index) => (
                        <div key={index} className="mb-4 p-4 border-b border-gray-200 bg-gray-100 shadow-sm rounded-lg">
                            <h2 className="text-lg font-bold text-gray-900">{article.title}</h2>
                            <p className="text-gray-700 mt-1">{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" 
                                className="text-blue-600 hover:underline mt-2 inline-block">
                                Read more
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default GlobalNews;
