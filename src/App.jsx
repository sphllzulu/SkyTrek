// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Home from './Home';
import Cards from './Cards';
import "./App.css"


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cards" element={<Cards/>}/>
          {/* <Route path="/settings" element={<SettingsPage />} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
