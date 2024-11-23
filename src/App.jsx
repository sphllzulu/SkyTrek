import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Paper,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  Box,
  Grid
} from '@mui/material';
import {
  DarkMode,
  LightMode,
  LocationOn,
  Search
} from '@mui/icons-material';
import CurrentWeather from './components/CurrentWeather';
import LocationSearch from './components/LocationSearch';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import SavedLocations from './components/SavedLocations';
import './App.css'

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [unit, setUnit] = useState('celsius');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#9c27b0', // Purple
      },
      secondary: {
        main: '#ba68c8', // Light Purple
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1e1e1e' : '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1, minHeight: '100vh' }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <LocationOn sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Weather App
            </Typography>
            <Switch
              color="default"
              checked={unit === 'fahrenheit'}
              onChange={() => setUnit(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
              icon={<Typography>°C</Typography>}
              checkedIcon={<Typography>°F</Typography>}
            />
            <IconButton 
              color="inherit" 
              onClick={() => setDarkMode(!darkMode)}
              sx={{ ml: 1 }}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <LocationSearch />
            </Grid>
            <Grid item xs={12}>
              <SavedLocations />
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <CurrentWeather unit={unit} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <HourlyForecast unit={unit} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <DailyForecast unit={unit} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;