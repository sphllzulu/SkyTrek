// src/components/SavedLocations.jsx
import React from 'react';
import {
  Box,
  Chip,
  Typography,
  Paper,
  Stack
} from '@mui/material';
import { LocationOn, Close } from '@mui/icons-material';
import { useWeather } from '../context/WeatherContext';

const SavedLocations = () => {
  const { 
    savedLocations, 
    removeLocation, 
    fetchWeatherData, 
    setCurrentLocation,
    currentLocation 
  } = useWeather();

  const handleLocationClick = async (location) => {
    await fetchWeatherData(location.name);
    setCurrentLocation(location.name);
  };

  if (!savedLocations.length) return null;

  return (
    <Paper sx={{ p: 2, mb: 3 }} elevation={3}>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Saved Locations
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
        {savedLocations.map((location) => (
          <Chip
            key={location.id}
            icon={<LocationOn />}
            label={location.name}
            onClick={() => handleLocationClick(location)}
            onDelete={() => removeLocation(location.id)}
            deleteIcon={<Close />}
            color={currentLocation === location.name ? "primary" : "default"}
            variant={currentLocation === location.name ? "filled" : "outlined"}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default SavedLocations;