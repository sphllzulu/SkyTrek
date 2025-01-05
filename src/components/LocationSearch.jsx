import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  Alert,
  Snackbar,
  CircularProgress
} from '@mui/material';
import { Search, MyLocation } from '@mui/icons-material';
import { useWeather } from '../context/WeatherContext';

const LocationSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
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
        setError('Failed to fetch weather data for this location');
        setShowError(true);
      }
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setShowError(true);
      return;
    }

    setLoading(true);
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'denied') {
        setError('Please enable location access in your browser settings to use this feature');
        setShowError(true);
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            await fetchWeatherData(`${latitude},${longitude}`);
            setCurrentLocation('Current Location');
          } catch (error) {
            setError('Failed to fetch weather data for your location');
            setShowError(true);
          }
          setLoading(false);
        },
        (error) => {
          let errorMessage = 'Failed to get your location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location access was denied. Please enable it in your browser settings.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information is unavailable.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out.';
              break;
            default:
              errorMessage = 'An unknown error occurred while getting your location.';
          }
          setError(errorMessage);
          setShowError(true);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    });
  };

  return (
    <>
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

      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowError(false)} 
          severity="error" 
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LocationSearch;
