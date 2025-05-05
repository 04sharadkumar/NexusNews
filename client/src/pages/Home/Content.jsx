import React, { useEffect, useState } from "react";

const Content = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("in"); // Default: India
  const [language, setLanguage] = useState("en"); // Default: English

  const API_KEY = "pub_69501420d3ee9b949a72f7174ee7296400fa9";
  const API_URL = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=${country}&language=${language}`;

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.results) {
          setNews(data.results);
        } else {
          throw new Error("No news found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [country, language]);

  return (
    <div className="p-6 max-w-8xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex justify-center">Read with NexusNews</h2>

      {/* Dropdowns for Country and Language */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        {/* <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="in">India</option>
          <option value="us">United States</option>
          <option value="gb">United Kingdom</option>
          <option value="fr">France</option>
          <option value="de">Germany</option>
          <option value="cn">China</option>
          <option value="jp">Japan</option>
        </select> */}

        {/* <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
         
          
          <option value="zh">Chinese</option>
         
        </select> */}
      </div>

      {loading && (
        <p className="text-center text-gray-500 text-lg">Loading latest news...</p>
      )}
      {error && (
        <p className="text-center text-red-500 text-lg">Error: {error}</p>
      )}

      <ul className="space-y-6">
        {news.length > 0 ? (
          news.map((article, index) => (
            <li
              key={index}
              className="border border-gray-200 p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200"
            >
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {article.title}
              </a>
              <p className="mt-2 text-gray-600">
                {article.description ? article.description : "No description available"}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Source: {article.source_id} | Date: {article.pubDate}
              </p>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg">No latest news available.</p>
        )}
      </ul>
    </div>
  );
};

export default Content;