import React from "react";
import { FaChartLine, FaArrowUp, FaArrowDown, FaRupeeSign, FaInfoCircle, FaSearch } from "react-icons/fa";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";

const StocksNews = () => {
  // Data
  const indices = [
    { name: "NIFTY 50", value: "22,494.25", change: "+1.25%", isPositive: true },
    { name: "SENSEX", value: "73,492.75", change: "+1.12%", isPositive: true },
    { name: "BANKNIFTY", value: "47,394.80", change: "+0.89%", isPositive: true },
    { name: "NIFTY IT", value: "34,005.60", change: "-0.45%", isPositive: false },
    { name: "NIFTY AUTO", value: "19,842.30", change: "+2.15%", isPositive: true },
  ];

  const gainers = [
    { symbol: "TATAMOTORS", price: "678.45", change: "+3.5%", volume: "12.4M" },
    { symbol: "HDFCBANK", price: "1,540.75", change: "+2.1%", volume: "8.2M" },
    { symbol: "INFY", price: "1,345.90", change: "+0.9%", volume: "5.7M" },
    { symbol: "BHARTIARTL", price: "1,128.30", change: "+2.8%", volume: "4.3M" },
    { symbol: "LT", price: "3,412.50", change: "+1.9%", volume: "3.1M" },
  ];

  const losers = [
    { symbol: "RELIANCE", price: "2,410.50", change: "-1.2%", volume: "9.8M" },
    { symbol: "ICICIBANK", price: "945.30", change: "-0.5%", volume: "7.5M" },
    { symbol: "TCS", price: "3,845.60", change: "-0.8%", volume: "3.2M" },
    { symbol: "HINDUNILVR", price: "2,345.25", change: "-0.3%", volume: "2.1M" },
    { symbol: "ITC", price: "412.80", change: "-0.7%", volume: "6.4M" },
  ];

  const mostTraded = [
    {
      name: "Tata Motors",
      symbol: "TATAMOTORS",
      price: "678.45",
      change: "+3.5%",
      img: "https://logo.clearbit.com/tatamotors.com",
      isPositive: true,
      sector: "Automobile",
      volume: "12.4M"
    },
    {
      name: "Reliance Industries",
      symbol: "RELIANCE",
      price: "2,410.50",
      change: "-1.2%",
      img: "https://logo.clearbit.com/ril.com",
      isPositive: false,
      sector: "Oil & Gas",
      volume: "9.8M"
    },
    {
      name: "HDFC Bank",
      symbol: "HDFCBANK",
      price: "1,540.75",
      change: "+2.1%",
      img: "https://logo.clearbit.com/hdfcbank.com",
      isPositive: true,
      sector: "Banking",
      volume: "8.2M"
    },
    {
      name: "Infosys",
      symbol: "INFY",
      price: "1,345.90",
      change: "+0.9%",
      img: "https://logo.clearbit.com/infosys.com",
      isPositive: true,
      sector: "IT",
      volume: "5.7M"
    },
    {
      name: "ICICI Bank",
      symbol: "ICICIBANK",
      price: "945.30",
      change: "-0.5%",
      img: "https://logo.clearbit.com/icicibank.com",
      isPositive: false,
      sector: "Banking",
      volume: "7.5M"
    },
  ];

  const marketNews = [
    {
      id: 1,
      title: "Sensex surges 600 points as RBI keeps rates unchanged",
      description: "The Reserve Bank of India maintained status quo on key policy rates as expected, sending banking stocks higher.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtsURAwKjjUzi4tC03S_7m5i9rHGmfmd-gpw&s",
      date: "2 hours ago",
      source: "Economic Times"
    },
    {
      id: 2,
      title: "Tata Motors reports 35% jump in Q4 profit",
      description: "Automaker beats street estimates with strong performance in domestic and Jaguar Land Rover businesses.",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "4 hours ago",
      source: "Business Standard"
    },
    {
      id: 3,
      title: "Global markets rally as Fed signals dovish stance",
      description: "Asian markets followed Wall Street higher after the US Federal Reserve indicated no immediate rate hikes.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "6 hours ago",
      source: "Reuters"
    },
    {
      id: 4,
      title: "Gold prices hit record high amid geopolitical tensions",
      description: "Safe-haven demand pushes gold to all-time high as investors seek refuge from market volatility.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY0rqpJxnhH8eNKYlDUv_39zGXk-PKhjnL5g&s",
      date: "8 hours ago",
      source: "Bloomberg"
    },
    {
      id: 5,
      title: "IT sector outlook remains strong despite margin pressures",
      description: "Analysts maintain positive stance on IT stocks as deal pipelines remain robust across top firms.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      date: "10 hours ago",
      source: "Moneycontrol"
    },
    {
      id: 6,
      title: "Oil prices decline after US inventory build-up",
      description: "Brent crude falls below $85 per barrel as US stockpiles rise more than expected last week.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSprSa1D-P28i-2kgRPBuugTmtnwdub4r4ikQ&s",
      date: "12 hours ago",
      source: "CNBC"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header with Search */}
    

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {/* Market Overview */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Market Overview</h2>
            <div className="text-sm text-gray-500 flex items-center">
              <span className="mr-2">As of {new Date().toLocaleTimeString()}</span>
              <FaInfoCircle className="text-blue-500" />
            </div>
          </div>
          
          {/* Indices */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {indices.map((index, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200 hover:border-blue-300 transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600">{index.name}</h3>
                    <p className="text-xl font-bold text-gray-900">{index.value}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${index.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {index.change}
                  </span>
                </div>
                <div className={`mt-2 h-1 rounded-full ${index.isPositive ? 'bg-green-500' : 'bg-red-500'}`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Traded Stocks */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Most Traded Stocks</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mostTraded.map((stock, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full bg-white p-1 border border-gray-200" src={stock.img} alt={stock.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{stock.name}</div>
                          <div className="text-sm text-gray-500">{stock.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FaRupeeSign className="text-gray-400 mr-1" />
                        <span className="text-sm font-medium">{stock.price}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${stock.isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {stock.change}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.volume}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.sector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Gainers & Losers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gainers */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-500 p-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <BsGraphUpArrow className="mr-2" /> Top Gainers
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {gainers.map((stock, index) => (
                    <tr key={index} className="hover:bg-green-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                        <FaRupeeSign className="text-gray-400 mr-1" />
                        {stock.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {stock.change}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Losers */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-500 p-4">
              <h2 className="text-xl font-bold text-white flex items-center">
                <BsGraphDownArrow className="mr-2" /> Top Losers
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {losers.map((stock, index) => (
                    <tr key={index} className="hover:bg-red-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stock.symbol}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                        <FaRupeeSign className="text-gray-400 mr-1" />
                        {stock.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          {stock.change}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.volume}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Market News */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Market News</h2>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All News →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketNews.map((news) => (
              <div key={news.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 relative">
                  <img 
                    src={news.image} 
                    alt={news.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = "https://via.placeholder.com/500x300?text=Market+News";
                    }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="text-xs text-white bg-blue-600 px-2 py-1 rounded-full">{news.source}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{news.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{news.date}</span>
                    <button className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center">
                      Read more <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StocksNews;