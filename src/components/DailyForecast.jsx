// src/components/DailyForecast.jsx
import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Divider
} from '@mui/material';
import { useWeather } from '../context/WeatherContext';

const DailyForecast = ({ unit }) => {
  const { dailyForecast, loading, error } = useWeather();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
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

  if (!dailyForecast?.length) {
    return null;
  }

  const convertTemp = (temp) => {
    return unit === 'fahrenheit' ? (temp * 9/5) + 32 : temp;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        7-Day Forecast
      </Typography>
      <Grid container spacing={2}>
        {dailyForecast.map((day, index) => (
          <Grid item xs={12} key={index}>
            <Paper 
              elevation={1} 
              sx={{ 
                p: 2,
                backgroundColor: 'background.default'
              }}
            >
              <Grid container alignItems="center" spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="subtitle1">
                    {formatDate(day.date)}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Box
                    component="img"
                    src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt="weather icon"
                    sx={{ width: 50, height: 50 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography>
                      High: {Math.round(convertTemp(day.maxTemp))}°
                      {unit === 'celsius' ? 'C' : 'F'}
                    </Typography>
                    <Typography color="textSecondary">
                      Low: {Math.round(convertTemp(day.minTemp))}°
                      {unit === 'celsius' ? 'C' : 'F'}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DailyForecast;