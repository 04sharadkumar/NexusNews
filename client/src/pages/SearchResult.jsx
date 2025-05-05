import React, { useEffect, useState } from "react";
import axios from "axios";

const SearchResults = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const options = {
        method: "GET",
        url: "https://stock-market-news-live.p.rapidapi.com/news/moneycontrol",
        headers: {
          "x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
          "x-rapidapi-host": "stock-market-news-live.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>Stock Market</h2>
      <ul>
        {news.map((item, index) => (
          <li key={index}>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              {item.title.trim()}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
