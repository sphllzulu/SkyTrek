// src/context/WeatherContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { weatherAPI } from '../utils/WeatherAPI';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [savedLocations, setSavedLocations] = useState(() => {
    const saved = localStorage.getItem('savedLocations');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const fetchWeatherData = async (location) => {
    try {
      setLoading(true);
      setError(null);
      
      // Try to get cached data first
      const cachedData = getCachedData(location);
      if (cachedData) {
        setCurrentWeather(cachedData.current);
        setHourlyForecast(cachedData.hourly);
        setDailyForecast(cachedData.daily);
        setLoading(false);
        return;
      }

      const data = await weatherAPI.getWeatherData(location);
      setCurrentWeather(data.current);
      setHourlyForecast(data.hourly);
      setDailyForecast(data.daily);
      
      // Cache the data
      setCacheData(location, data);
    } catch (err) {
      setError('Failed to fetch weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addLocation = (location) => {
    setSavedLocations(prev => {
      const newLocations = [...prev, location];
      localStorage.setItem('savedLocations', JSON.stringify(newLocations));
      return newLocations;
    });
  };

  const removeLocation = (locationId) => {
    setSavedLocations(prev => {
      const newLocations = prev.filter(loc => loc.id !== locationId);
      localStorage.setItem('savedLocations', JSON.stringify(newLocations));
      return newLocations;
    });
  };

  // Cache utilities
  const getCachedData = (location) => {
    const cached = localStorage.getItem(`weather_${location}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // Cache is valid for 30 minutes
      if (Date.now() - timestamp < 30 * 60 * 1000) {
        return data;
      }
    }
    return null;
  };

  const setCacheData = (location, data) => {
    localStorage.setItem(`weather_${location}`, JSON.stringify({
      data,
      timestamp: Date.now()
    }));
  };

  return (
    <WeatherContext.Provider value={{
      currentWeather,
      hourlyForecast,
      dailyForecast,
      savedLocations,
      loading,
      error,
      currentLocation,
      fetchWeatherData,
      addLocation,
      removeLocation,
      setCurrentLocation
    }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);