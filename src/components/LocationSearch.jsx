// src/components/LocationSearch.jsx
import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Autocomplete,
  TextField,
  CircularProgress
} from '@mui/material';
import { Search, MyLocation } from '@mui/icons-material';
import { useWeather } from '../context/WeatherContext';

const LocationSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { fetchWeatherData, setCurrentLocation, addLocation } = useWeather();

  const handleSearch = async () => {
    if (searchInput) {
      setLoading(true);
      try {
        await fetchWeatherData(searchInput);
        setCurrentLocation(searchInput);
        addLocation({
          id: Date.now(),
          name: searchInput
        });
        setSearchInput('');
      } catch (error) {
        console.error('Search error:', error);
      }
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLoading(true);
        try {
          await fetchWeatherData(`${latitude},${longitude}`);
          setCurrentLocation('Current Location');
        } catch (error) {
          console.error('Location error:', error);
        }
        setLoading(false);
      });
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        mb: 3
      }}
      elevation={3}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a location..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <IconButton 
        type="submit" 
        sx={{ p: '10px' }} 
        aria-label="search"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : <Search />}
      </IconButton>
      <IconButton 
        sx={{ p: '10px' }} 
        aria-label="use current location"
        onClick={getCurrentLocation}
        disabled={loading}
      >
        <MyLocation />
      </IconButton>
    </Paper>
  );
};

export default LocationSearch;