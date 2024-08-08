



// // HourlyDaily.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CircularProgress from '@mui/material/CircularProgress';
// import Forecasts from './Forecasts';

// const HourlyDaily = () => {
//   const [weatherData, setWeatherData] = useState({
//     hourly: [],
//     daily: [],
//     loading: true,
//     error: false,
//   });

//   // Set the latitude and longitude for the location
//   const latitude = '40.7128'; // Replace with actual latitude
//   const longitude = '-74.0060'; // Replace with actual longitude

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       try {
//         const url = 'https://api.openweathermap.org/data/2.5/onecall';
//         const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
//         const response = await axios.get(url, {
//           params: {
//             lat: latitude,
//             lon: longitude,
//             exclude: 'minutely',
//             units: 'metric',
//             appid: api_key,
//           },
//         });
//         setWeatherData({
//           hourly: response.data.hourly,
//           daily: response.data.daily,
//           loading: false,
//           error: false,
//         });
//       } catch (error) {
//         setWeatherData({ hourly: [], daily: [], loading: false, error: true });
//         console.log('error', error);
//       }
//     };

//     fetchWeatherData();
//   }, [latitude, longitude]);

//   return (
//     <div>
//       {weatherData.loading && <CircularProgress color="inherit" />}
//       {weatherData.error && <span className="error-message">Error fetching weather data</span>}
//       <Forecasts hourly={weatherData.hourly} daily={weatherData.daily} />
//     </div>
//   );
// };

// export default HourlyDaily;


// HourlyDaily.jsx
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CircularProgress from '@mui/material/CircularProgress';
// import Forecasts from './Forecasts';

// const HourlyDaily = ({ lat, lon }) => {
//   const [weatherData, setWeatherData] = useState({
//     hourly: [],
//     daily: [],
//     loading: false,
//     error: false,
//   });

//   useEffect(() => {
//     const fetchWeatherData = async () => {
//       setWeatherData({ ...weatherData, loading: true });
//       const url = 'https://api.openweathermap.org/data/2.5/onecall';
//       const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
//       await axios
//         .get(url, {
//           params: {
//             lat,
//             lon,
//             exclude: 'minutely',
//             units: 'metric',
//             appid: api_key,
//           },
//         })
//         .then((res) => {
//           setWeatherData({
//             hourly: res.data.hourly,
//             daily: res.data.daily,
//             loading: false,
//             error: false,
//           });
//         })
//         .catch((error) => {
//           setWeatherData({ hourly: [], daily: [], loading: false, error: true });
//           console.log('error', error);
//         });
//     };

//     fetchWeatherData();
//   }, [lat, lon]);

//   return (
//     <div>
//       {weatherData.loading && <CircularProgress color="inherit" />}
//       {weatherData.error && <span className="error-message">Error fetching weather data</span>}
//       <Forecasts hourly={weatherData.hourly} daily={weatherData.daily} />
//     </div>
//   );
// };

// export default HourlyDaily;



import React from 'react';
import './HourlyDaily.css';

const HourlyDaily = ({ hourly, daily }) => {
  return (
    <div className="hourly-daily-container">
      <div className="hourly">
        <h3 style={{color:'lightgrey', fontSize:'30px'}}>Hourly Forecast</h3>
        <div className="hourly-forecasts">
          {hourly && hourly.length > 0 ? (
            hourly.slice(0, 5).map((hour, index) => (
              <div key={index} className="hourly-item">
                <p style={{color:'white'}}>{new Date(hour.dt * 1000).getHours()}:00</p>
                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt={hour.weather[0].description}
                />
                <p style={{color:'white'}}>{Math.round(hour.temp)}°C</p>
              </div>
            ))
          ) : (
            <p style={{color:'white'}}>No hourly data available</p>
          )}
        </div>
      </div>
      <div className="daily">
        <h2 style={{color:'lightgrey', fontSize:'30px'}}>Daily Forecast</h2>
        <div className="daily-forecasts">
          {daily && daily.length > 0 ? (
            daily.slice(1, 6).map((day, index) => (
              <div key={index} className="daily-item">
                <p style={{color:'white'}} className='small'>{new Date(day.dt * 1000).toDateString()}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                />
                <p  style={{color:'white'}}>{Math.round(day.temp.day)}°C</p>
                <p style={{color:'white'}}>{Math.round(day.temp.night)}°C</p>
              </div>
            ))
          ) : (
            <p style={{color:'white'}}>No daily data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HourlyDaily;
