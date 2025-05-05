import React, { useState, useEffect } from 'react';
import { FiClock, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const NewsHero = ({ darkMode }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const newsItems = [
    {
      id: 1,
      category: "FUTURE TECH",
      title: "The Next Decade of Innovation: What to Expect",
      description: "Experts predict the technologies that will transform our lives by 2030",
      readTime: "8 min read",
      author: "Dr. Alan Turing",
      image: "https://assets.weforum.org/article/image/responsive_big_webp_uYJ_L4bNuO-lnvXUIv9X77vMsMxBk2ShXGxGqp6bpTw.webp"
    },
    {
      id: 2,
      category: "SUSTAINABILITY",
      title: "Green Energy Breakthroughs in 2023",
      description: "New technologies making renewable energy more efficient than ever",
      readTime: "6 min read",
      author: "Dr. Jane Goodall",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
    },
    {
      id: 3,
      category: "HEALTH TECH",
      title: "The Future of Personalized Medicine",
      description: "How AI is revolutionizing healthcare treatments",
      readTime: "10 min read",
      author: "Dr. Lisa Sanders",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1));
  };

  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="mb-12 relative group"> {/* Added group class for hover effects */}
      <div className="relative">
        {/* Hidden navigation buttons that appear on hover */}
        <button 
          onClick={prevSlide}
          className={`absolute left-4 top-1/2 z-10 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600 text-white' : 'bg-white/80 hover:bg-gray-100 text-gray-800'} shadow-md`}
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextSlide}
          className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${darkMode ? 'bg-gray-700/80 hover:bg-gray-600 text-white' : 'bg-white/80 hover:bg-gray-100 text-gray-800'} shadow-md`}
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Slides container */}
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {newsItems.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0">
                <div className={`rounded-xl overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="relative h-96 w-full">
                    <img 
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-gray-900/90 via-gray-900/30' : 'from-gray-900/90 via-gray-900/20'}`}></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <span className={`text-xs font-medium px-2 py-1 rounded-md mb-2 inline-block ${darkMode ? 'bg-blue-900/70 text-blue-200' : 'bg-blue-100 text-blue-800'}`}>
                        {item.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{item.title}</h2>
                      <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-200'} mb-4`}>{item.description}</p>
                      <div className="flex items-center text-sm text-gray-300">
                        <span className="flex items-center mr-4">
                          <FiClock className="mr-1" /> {item.readTime}
                        </span>
                        <span>By {item.author}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slide indicators - hidden by default, shown on hover */}
        <div className="flex justify-center mt-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? (darkMode ? 'bg-blue-400 w-6' : 'bg-blue-600 w-6') : (darkMode ? 'bg-gray-600' : 'bg-gray-300')}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsHero;