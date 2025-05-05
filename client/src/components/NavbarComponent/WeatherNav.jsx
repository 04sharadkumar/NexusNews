import { useState, useEffect } from "react";
import { 
  Sun, Cloud, CloudRain, CloudSnow, CloudLightning, 
  CloudFog, Droplets, Wind, Thermometer, Eye, 
  Sunrise, Sunset, Loader2, Gauge, Compass,
  MapPin, Moon
} from "lucide-react";

const WeatherNav = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("celsius");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme("light"); // default light theme always
  }, []);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      const apiKey = "f05c5126624595469053bcd933efaa1e";
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      
      try {
        setLoading(true);
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod !== 200) {
          throw new Error(data.message || "Failed to fetch weather data");
        }
        
        setWeather(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch weather data");
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
        },
        () => {
          setError("Location access denied. Using default location (New York)...");
          fetchWeather(40.7128, -74.0060);
        }
      );
    } else {
      setError("Geolocation not supported. Using default location (New York)...");
      fetchWeather(40.7128, -74.0060);
    }
  }, []);

  const getWeatherIcon = () => {
    if (!weather) return <Sun className="w-14 h-14 text-yellow-400" />;
    
    const weatherMain = weather.weather[0].main.toLowerCase();
    const isDaytime = Date.now() / 1000 < weather.sys.sunset;

    switch(weatherMain) {
      case 'clear':
        return <Sun className={`w-14 h-14 ${isDaytime ? "text-yellow-400" : "text-indigo-200"}`} />;
      case 'clouds':
        return <Cloud className="w-14 h-14 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-14 h-14 text-blue-400" />;
      case 'drizzle':
        return <Droplets className="w-14 h-14 text-blue-300" />;
      case 'thunderstorm':
        return <CloudLightning className="w-14 h-14 text-purple-400" />;
      case 'snow':
        return <CloudSnow className="w-14 h-14 text-blue-100" />;
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'fog':
        return <CloudFog className="w-14 h-14 text-gray-300" />;
      default:
        return <Sun className="w-14 h-14 text-yellow-400" />;
    }
  };

  const toggleUnit = () => setUnit(unit === "celsius" ? "fahrenheit" : "celsius");
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const convertTemp = (temp) => {
    return unit === "fahrenheit" ? Math.round((temp * 9/5) + 32) : Math.round(temp);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getWindDirection = (degrees) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degrees % 360) / 45) % 8;
    return directions[index];
  };

  return (
    <div className={`min-h-screen w-full p-4 transition-colors duration-300  ${
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
      <div className={`w-full max-w-2xl mx-auto rounded-2xl shadow-xl overflow-hidden border mt-10 ${
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
      }`}>
        
        <div className={`flex justify-between items-center p-4 ${
          theme === "dark" ? "bg-gray-700" : "bg-black"
        } text-white`}>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <h1 className="text-lg font-bold">Weather Forecast</h1>
          </div>
          <button 
            onClick={toggleTheme}
            className="p-1 rounded-full hover:bg-white/10 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        ) : error ? (
          <div className="text-center p-6 text-red-500">{error}</div>
        ) : (
          weather && (
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="flex items-center gap-3">
                  {getWeatherIcon()}
                  <div>
                    <h2 className="text-xl font-bold">{weather.name}, {weather.sys.country}</h2>
                    <p className="text-sm capitalize">{weather.weather[0].description}</p>
                  </div>
                </div>
                <button 
                  onClick={toggleUnit} 
                  className="text-4xl font-bold hover:opacity-80 transition"
                >
                  {convertTemp(weather.main.temp)}°{unit === "celsius" ? "C" : "F"}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                <StatCard 
                  Icon={Thermometer} 
                  label="Feels Like" 
                  value={`${convertTemp(weather.main.feels_like)}°`} 
                  theme={theme}
                />
                <StatCard 
                  Icon={Droplets} 
                  label="Humidity" 
                  value={`${weather.main.humidity}%`} 
                  theme={theme}
                />
                <StatCard 
                  Icon={Wind} 
                  label="Wind" 
                  value={`${Math.round(weather.wind.speed * 3.6)} km/h`} 
                  theme={theme}
                />
                <StatCard 
                  Icon={Gauge} 
                  label="Pressure" 
                  value={`${weather.main.pressure} hPa`} 
                  theme={theme}
                />
              </div>

              <div className={`p-4 rounded-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-blue-50"
              } mb-6`}>
                <h3 className="font-semibold text-sm sm:text-base mb-3 flex items-center gap-2">
                  <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
                  Wind Details
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs sm:text-sm opacity-75">Direction</p>
                    <p className="font-medium">
                      {getWindDirection(weather.wind.deg)} ({weather.wind.deg}°)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm opacity-75">Gust</p>
                    <p className="font-medium">
                      {weather.wind.gust ? `${Math.round(weather.wind.gust * 3.6)} km/h` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-blue-50"
              }`}>
                <h3 className="font-semibold text-sm sm:text-base mb-3">Sun Times</h3>
                <div className="flex justify-around">
                  <div className="text-center">
                    <Sunrise className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 text-yellow-500" />
                    <p className="text-xs sm:text-sm opacity-75">Sunrise</p>
                    <p className="font-medium text-sm sm:text-base">
                      {formatTime(weather.sys.sunrise)}
                    </p>
                  </div>
                  <div className="text-center">
                    <Sunset className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 text-orange-500" />
                    <p className="text-xs sm:text-sm opacity-75">Sunset</p>
                    <p className="font-medium text-sm sm:text-base">
                      {formatTime(weather.sys.sunset)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const StatCard = ({ Icon, label, value, theme }) => (
  <div className={`p-3 rounded-lg ${
    theme === "dark" ? "bg-gray-700" : "bg-blue-50"
  } text-center`}>
    <Icon className="w-6 h-6 mx-auto mb-1" />
    <p className="text-xs sm:text-sm">{label}</p>
    <p className="font-semibold text-sm sm:text-base">{value}</p>
  </div>
);

export default WeatherNav;