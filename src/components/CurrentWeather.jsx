// src/components/CurrentWeather.jsx
import React from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import { WbSunny, Opacity, Air } from '@mui/icons-material';
import { useWeather } from '../context/WeatherContext';

const CurrentWeather = ({ unit }) => {
  const { currentWeather, loading, error } = useWeather();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" p={3}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!currentWeather) {
    return (
      <Typography align="center">
        Search for a location to see weather information
      </Typography>
    );
  }

  const convertTemp = (temp) => {
    return unit === 'fahrenheit' ? (temp * 9/5) + 32 : temp;
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box display="flex" alignItems="center">
              <WbSunny sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
              <Box>
                <Typography variant="h3">
                  {Math.round(convertTemp(currentWeather.temp))}°
                  {unit === 'celsius' ? 'C' : 'F'}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                  {currentWeather.description}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Opacity sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>
                    Humidity: {currentWeather.humidity}%
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Air sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>
                    Wind: {currentWeather.windSpeed} m/s
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;