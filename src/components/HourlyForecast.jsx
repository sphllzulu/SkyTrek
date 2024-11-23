
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

const HourlyForecast = ({ unit }) => {
  const { hourlyForecast, loading, error } = useWeather();

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

  if (!hourlyForecast?.length) {
    return null;
  }

  const convertTemp = (temp) => {
    return unit === 'fahrenheit' ? (temp * 9/5) + 32 : temp;
  };

  const formatHour = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Hourly Forecast
      </Typography>
      <Box sx={{ overflowX: 'auto' }}>
        <Grid container spacing={2} sx={{ minWidth: 700 }}>
          {hourlyForecast.map((hour, index) => (
            <Grid item key={index} xs={2}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 2, 
                  textAlign: 'center',
                  backgroundColor: 'background.default' 
                }}
              >
                <Typography variant="subtitle2" color="textSecondary">
                  {formatHour(hour.time)}
                </Typography>
                <Box
                  component="img"
                  src={`http://openweathermap.org/img/wn/${hour.icon}@2x.png`}
                  alt="weather icon"
                  sx={{ width: 50, height: 50 }}
                />
                <Typography variant="h6">
                  {Math.round(convertTemp(hour.temp))}°
                  {unit === 'celsius' ? 'C' : 'F'}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HourlyForecast;