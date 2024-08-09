



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import HourlyDaily from './HourlyDaily';
import './Weather.css';

function WeatherApp() {
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false,
  });
  const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [locationConsent, setLocationConsent] = useState(null); // New state for location consent

  useEffect(() => {
    // Function to handle location access
    const requestLocationAccess = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ lat: latitude, lon: longitude });
            fetchWeatherData(latitude, longitude);
            setLocationConsent(true); // User agreed
          },
          (error) => {
            console.log('Error getting location', error);
            setLocationConsent(false); // User declined or error occurred
            fetchWeatherFromCache(); // Load cached weather data if available
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
        setLocationConsent(false); // Geolocation not supported
        fetchWeatherFromCache(); // Load cached weather data if available
      }
    };

    if (locationConsent === null) { // Check if user consent is not yet determined
      const consent = window.confirm('This application requires access to your location to provide weather information for your current location. Do you agree?');
      if (consent) {
        requestLocationAccess();
      } else {
        setLocationConsent(false);
        // Prompt the user to search for a location
      }
    } else if (coordinates.lat && coordinates.lon) {
      fetchWeatherData(coordinates.lat, coordinates.lon);
    } else if (selectedLocation) {
      fetchWeatherDataByLocation(selectedLocation);
    } else {
      fetchWeatherFromCache();
    }
  }, [coordinates, selectedLocation, unit, locationConsent]);

  const fetchWeatherData = async (lat, lon) => {
    setWeather({ ...weather, loading: true });
    const url = 'https://api.openweathermap.org/data/2.5/onecall';
    const api_key = import.meta.env.VITE_WEATHER_API_KEY; // Access environment variable

    try {
      const response = await axios.get(url, {
        params: {
          lat: lat,
          lon: lon,
          exclude: 'minutely',
          units: unit,
          appid: api_key,
        },
      });
      setWeather({ data: response.data, loading: false, error: false });
      updateCache(lat, lon, response.data); // Update cache
    } catch (error) {
      console.log('Error fetching weather data', error);
      fetchWeatherFromCache(); // Fallback to cache on error
    }
  };

  const fetchWeatherDataByLocation = async (location) => {
    setWeather({ ...weather, loading: true });
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const api_key = import.meta.env.VITE_WEATHER_API_KEY; // Access environment variable

    try {
      const response = await axios.get(url, {
        params: {
          q: location,
          units: unit,
          appid: api_key,
        },
      });
      const { lat, lon } = response.data.coord;
      setSelectedLocation(response.data.name); // Store the city name
      fetchWeatherData(lat, lon);
    } catch (error) {
      setWeather({ ...weather, data: {}, error: true });
      console.log('Error fetching weather data by location', error);
    }
  };

  const fetchWeatherFromCache = () => {
    const cachedWeather = localStorage.getItem('weatherData');
    if (cachedWeather) {
      setWeather({ data: JSON.parse(cachedWeather), loading: false, error: false });
    } else {
      setWeather({ ...weather, loading: false, error: true });
    }
  };

  const updateCache = (lat, lon, data) => {
    const cacheKey = `${lat},${lon}`;
    const cachedLocations = JSON.parse(localStorage.getItem('savedLocations')) || {};
    cachedLocations[cacheKey] = data;
    localStorage.setItem('savedLocations', JSON.stringify(cachedLocations));
    localStorage.setItem('weatherData', JSON.stringify(data)); // Update main cache
  };

  const handleAddLocation = () => {
    const location = prompt('Enter a city name to add:');
    if (location) {
      fetchWeatherDataByLocation(location);
      setLocations([...locations, location]);
    }
  };

  const handleSelectLocation = (event) => {
    const location = event.target.value;
    setSelectedLocation(location);
    fetchWeatherDataByLocation(location);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => prevUnit === 'metric' ? 'imperial' : 'metric');
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toDateFunction = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const WeekDays = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
    ];
    const currentDate = new Date();
    const date = <p style={{ color: 'white' }}>{WeekDays[currentDate.getDay()]} {currentDate.getDate()} {months[currentDate.getMonth()]}</p>;
    return date;
  };

  const locationData = weather.data.current ? weather.data : null;

  return (
    <div className={`App ${theme}`}>
      <div className="search-bar">
        <Stack spacing={4} direction="row" sx={{ padding: 2 }}>
          <Button onClick={handleAddLocation} variant="contained" sx={{ backgroundColor: '#7393B3' }}>Search City</Button>
          <Button onClick={toggleUnit} variant="contained" sx={{ backgroundColor: '#7393B3' }}>
            {unit === 'metric' ? ' °C' : ' °F'}
          </Button>
        </Stack>
        <div className="location-dropdown">
          <select
            value={selectedLocation || ''}
            onChange={handleSelectLocation}
            style={{backgroundColor:'lightgrey', border:'none',padding:'10px', outline:'none'}}
          >
            <option value="" disabled>Previous location</option>
            {locations.length > 0 ? (
              locations.map((loc, index) => (
                <option key={index} value={loc}>{loc}</option>
              ))
            ) : (
              <option value="" disabled>No recently searched locations</option>
            )}
          </select>
        </div>
      </div>
      {weather.loading && <CircularProgress />}
      {weather.error && (
        <span className="error-message">
          <FontAwesomeIcon icon={faFrown} />
          <span style={{ fontSize: '20px' }}>Unable to fetch weather data</span>
        </span>
      )}
      {locationData && locationData.current && (
        <div>
          <div className="city-name">
            <h2 style={{ color: 'whitesmoke' }}>
              {selectedLocation || 'Current Location'}
            </h2>
          </div>
          <div className="date">
            {toDateFunction()}
          </div>
          <div className="icon-temp">
            <img
              src={`https://openweathermap.org/img/wn/${locationData.current.weather[0].icon}@2x.png`}
              alt={locationData.current.weather[0].description}
            />
            <p style={{ color: 'whitesmoke' }}>{Math.round(locationData.current.temp)}{unit === 'metric' ? '°C' : '°F'}</p>
          </div>
          <div className="des-wind">
            <p style={{ color: 'white' }}>{locationData.current.weather[0].description.toUpperCase()}</p>
            <p style={{ color: 'white' }}>Wind Speed: {locationData.current.wind_speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
            <p style={{ color: 'white' }}>Humidity: {locationData.current.humidity}%</p>
            <p style={{ color: 'white' }}>Precipitation: {locationData.current.rain ? locationData.current.rain['1h'] : 0} mm</p>
          </div>
          <HourlyDaily hourly={locationData.hourly} daily={locationData.daily} unit={unit} />
        </div>
      )}
      {locationConsent === false && !selectedLocation && (
        <div className="location-prompt">
          <p style={{ color: 'white' }}></p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

