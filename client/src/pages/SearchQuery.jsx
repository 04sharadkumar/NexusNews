import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SearchQuery = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();

    // Extract search query from URL
    const query = new URLSearchParams(location.search).get("q");

    // Get API Key from environment variables
    const API_KEY = import.meta.env.VITE_NEWS_API_KEY;


    useEffect(() => {
        if (!query) return;
        setLoading(true);
        setError(null);

        axios
            .get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`)
            .then((response) => {
                setNews(response.data.articles.slice(0, 10)); // Show 10 results
            })
            .catch(() => setError("Failed to fetch news."))
            .finally(() => setLoading(false));
    }, [query]);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white text-black rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">
                Search Results for "{query}"
            </h1>

            {loading && <p className="text-gray-600">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {news.length > 0 ? (
                <div>
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
            ) : (
                <p className="text-gray-600">No results found.</p>
            )}
        </div>
    );
};

export default SearchQuery;
