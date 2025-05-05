import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import SidebarButton from "./SidebarButton";
import TimeDisplay from "./TimeDisplay";
import NavigationLinks from "./NavigationLinks";
import SearchBar from "./SearchBar";
import UserDropdown from "./UserDropdown";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBell, FaRegNewspaper, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getWeatherIconByCondition } from "@/utils/weatherUtils";

const Navbar = () => {
  const [time, setTime] = useState(new Date());
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [isDaytime, setIsDaytime] = useState(true);
  const [isWeatherPage, setIsWeatherPage] = useState(false);
  
  const previousPathRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const notificationsRef = useRef(null);

  // Handle Weather toggle
  const handleWeatherToggle = () => {
    if (!isWeatherPage) {
      previousPathRef.current = location.pathname;
      navigate("/WeatherNav");
    } else {
      navigate(previousPathRef.current || "/");
    }
    setIsWeatherPage(!isWeatherPage);
  };

  // Sync isWeatherPage with current path
  useEffect(() => {
    setIsWeatherPage(location.pathname === "/WeatherNav");
  }, [location.pathname]);

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulating different types of notifications
        const mockNotifications = [
          {
            id: 1,
            title: "New message received",
            message: "You have 3 unread messages in your inbox",
            timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
            read: false,
            type: "message"
          },
          {
            id: 2,
            title: "System update",
            message: "New features available in version 2.3",
            timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
            read: false,
            type: "system"
          },
          {
            id: 3,
            title: "Breaking news",
            message: "Major event happening in your area",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
            read: false,
            type: "news"
          },
          {
            id: 4,
            title: "Account activity",
            message: "Your password will expire in 7 days",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
            read: true,
            type: "account"
          }
        ];
        
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.read).length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        toast.error("Failed to load notifications");
      }
    };
    
    fetchNotifications();
  }, []);

  // Fetch weather
  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const apiKey = "f05c5126624595469053bcd933efaa1e";
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.cod === 200) {
          setWeatherCondition(data.weather[0].main);
          setIsDaytime(Date.now() / 1000 < data.sys.sunset);
        }
      } catch (err) {
        console.error("Weather fetch failed:", err);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => fetchWeather(pos.coords.latitude, pos.coords.longitude),
        () => fetchWeather(40.7128, -74.0060) // Fallback: New York
      );
    }
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNotifications = () => {
    if (showNotifications) {
      setShowNotifications(false);
    } else {
      // Mark all as read when opening
      const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
      setNotifications(updatedNotifications);
      setUnreadCount(0);
      setShowNotifications(true);
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60
    };
    
    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const interval = Math.floor(seconds / secondsInUnit);
      if (interval >= 1) {
        return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
      }
    }
    
    return "just now";
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    toast.success("All notifications cleared");
  };

  const removeNotification = (id, e) => {
    e.stopPropagation();
    const updatedNotifications = notifications.filter(n => n.id !== id);
    setNotifications(updatedNotifications);
    setUnreadCount(updatedNotifications.filter(n => !n.read).length);
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <nav className="bg-black text-white px-4 py-3 w-full sticky top-0 z-50 shadow-lg border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <SidebarButton />
            <FaRegNewspaper className="hidden sm:inline text-blue-600 dark:text-blue-400 text-2xl mr-2" />
            <Link to='/'>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                NexusNews
              </h1>
            </Link>
            <TimeDisplay time={time} className="hover:text-yellow-400 transition-all duration-200 cursor-pointer" />

            <button onClick={handleWeatherToggle}>
              {getWeatherIconByCondition(weatherCondition, isDaytime)}
            </button>
          </div>

          <NavigationLinks />

          <div className="flex items-center gap-4">
            <SearchBar />

            <div className="relative" ref={notificationsRef}>
              <button 
                onClick={toggleNotifications}
                className="p-2 rounded-full bg-gray-700 text-gray-300 hover:text-blue-400 relative"
              >
                <FaBell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-700 bg-gray-900 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Notifications</h3>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={clearAllNotifications}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Clear All
                      </button>
                      <button 
                        onClick={() => setShowNotifications(false)}
                        className="text-gray-400 hover:text-white"
                      >
                        <FaTimes size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`p-3 border-b border-gray-700 hover:bg-gray-700 cursor-pointer transition-colors ${!notification.read ? 'bg-gray-750' : ''}`}
                          onClick={() => {
                            // Handle notification click action
                            toast.info(`Opening: ${notification.title}`);
                            setShowNotifications(false);
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold text-blue-400">{notification.title}</h4>
                              <p className="text-sm text-gray-300">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {formatTimeAgo(notification.timestamp)}
                              </p>
                            </div>
                            <button 
                              onClick={(e) => removeNotification(notification.id, e)}
                              className="text-gray-500 hover:text-red-400"
                            >
                              <FaTimes size={12} />
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-400">
                        No notifications available
                      </div>
                    )}
                  </div>
                  
                  <div className="p-2 border-t border-gray-700 bg-gray-900 text-center">
                    <Link 
                      to="/notifications" 
                      className="text-sm text-blue-400 hover:underline"
                      onClick={() => setShowNotifications(false)}
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <UserDropdown className='p-2 bg-amber-500' />
            
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;