import {
    Sun, Cloud, CloudRain, CloudSnow, CloudLightning, 
    CloudFog, Droplets, Moon
  } from "lucide-react";
  
  export const getWeatherIconByCondition = (weather, isDaytime = true) => {
    if (!weather) return <Sun className="w-5 h-5 text-yellow-400" />;
  
    const condition = weather.toLowerCase();
  
    switch (condition) {
      case 'clear':
        return isDaytime 
          ? <Sun className="w-5 h-5 text-yellow-400" /> 
          : <Moon className="w-5 h-5 text-indigo-300" />;
      case 'clouds':
        return <Cloud className="w-5 h-5 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-5 h-5 text-blue-400" />;
      case 'drizzle':
        return <Droplets className="w-5 h-5 text-blue-300" />;
      case 'thunderstorm':
        return <CloudLightning className="w-5 h-5 text-purple-400" />;
      case 'snow':
        return <CloudSnow className="w-5 h-5 text-blue-100" />;
      case 'mist':
      case 'fog':
      case 'haze':
      case 'smoke':
        return <CloudFog className="w-5 h-5 text-gray-300" />;
      default:
        return <Sun className="w-5 h-5 text-yellow-400" />;
    }
  };
  