

// // WeatherApp.jsx
// import React, { useState } from 'react';
// import axios from 'axios';
// import CircularProgress from '@mui/material/CircularProgress';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFrown } from '@fortawesome/free-solid-svg-icons';
// import HourlyDaily from './HourlyDaily';

// import './Weather.css';

// function WeatherApp() {
//   const [input, setInput] = useState('');
//   const [weather, setWeather] = useState({
//     loading: false,
//     data: {},
//     error: false,
//   });
//   const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

//   const toDateFunction = () => {
//     const months = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December',
//     ];
//     const WeekDays = [
//       'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
//     ];
//     const currentDate = new Date();
//     const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
//     return date;
//   };

//   const search = async (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       setWeather({ ...weather, loading: true });
//       const url = 'https://api.openweathermap.org/data/2.5/weather';
//       const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
//       await axios
//         .get(url, {
//           params: {
//             q: input,
//             units: 'metric',
//             appid: api_key,
//           },
//         })
//         .then((res) => {
//           setWeather({ data: res.data, loading: false, error: false });
//           setCoordinates({
//             lat: res.data.coord.lat,
//             lon: res.data.coord.lon,
//           });
//         })
//         .catch((error) => {
//           setWeather({ ...weather, data: {}, error: true });
//           console.log('error', error);
//         });
//     }
//   };

//   return (
//     <div className="App">
      
//       <div className="search-bar">
//         <input
//           type="text"
//           className="city-search"
//           placeholder="Enter City Name.."
//           value={input}
//           onChange={(event) => setInput(event.target.value)}
//           onKeyPress={search}
//         />
//       </div>
//       {weather.loading && <CircularProgress color="inherit" />}
//       {weather.error && (
//         <span className="error-message">
//           <FontAwesomeIcon icon={faFrown} />
//           <span style={{ fontSize: '20px' }}>City not found</span>
//         </span>
//       )}
//       {weather.data && weather.data.main && (
//         <div>
//           <div className="city-name">
//             <h2>
//               {weather.data.name}, <span>{weather.data.sys.country}</span>
//             </h2>
//           </div>
//           <div className="date">
//             <span>{toDateFunction()}</span>
//           </div>
//           <div className="icon-temp">
//             <img
//               src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
//               alt={weather.data.weather[0].description}
//             />
//             {Math.round(weather.data.main.temp)}
//             <sup className="deg">°C</sup>
//           </div>
//           <div className="des-wind">
//             <p>{weather.data.weather[0].description.toUpperCase()}</p>
//             <p>Wind Speed: {weather.data.wind.speed} m/s</p>
//             <p>Humidity: {weather.data.main.humidity}%</p>
//             <p>Precipitation: {weather.data.rain ? weather.data.rain['1h'] : 0} mm</p>
//           </div>
//         </div>
//       )}
//       {coordinates.lat && coordinates.lon && (
//         <HourlyDaily lat={coordinates.lat} lon={coordinates.lon} />
//       )}
//     </div>
//   );
// }

// export default WeatherApp;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CircularProgress from '@mui/material/CircularProgress';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFrown } from '@fortawesome/free-solid-svg-icons';
// import HourlyDaily from './HourlyDaily';

// import './Weather.css';

// function WeatherApp() {
//   const [weather, setWeather] = useState({
//     loading: false,
//     data: {},
//     error: false,
//   });
//   const [coordinates, setCoordinates] = useState({ lat: null, lon: null });

//   useEffect(() => {
//     // Function to get the user's current location
//     const getLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             setCoordinates({ lat: latitude, lon: longitude });
//           },
//           (error) => {
//             console.log('Error getting location', error);
//             setWeather({ ...weather, error: true });
//           }
//         );
//       } else {
//         console.log('Geolocation is not supported by this browser.');
//         setWeather({ ...weather, error: true });
//       }
//     };

//     // Fetch weather data when coordinates are set
//     if (coordinates.lat && coordinates.lon) {
//       fetchWeatherData(coordinates.lat, coordinates.lon);
//     } else {
//       getLocation();
//     }
//   }, [coordinates]);

//   const fetchWeatherData = async (lat, lon) => {
//     setWeather({ ...weather, loading: true });
//     const url = 'https://api.openweathermap.org/data/2.5/onecall';
//     const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

//     try {
//       const response = await axios.get(url, {
//         params: {
//           lat: lat,
//           lon: lon,
//           exclude: 'minutely',
//           units: 'metric',
//           appid: api_key,
//         },
//       });
//       setWeather({ data: response.data, loading: false, error: false });
//     } catch (error) {
//       setWeather({ ...weather, data: {}, error: true });
//       console.log('Error fetching weather data', error);
//     }
//   };

//   const toDateFunction = () => {
//     const months = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December',
//     ];
//     const WeekDays = [
//       'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
//     ];
//     const currentDate = new Date();
//     const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
//     return date;
//   };

//   return (
//     <div className="App">
//       {weather.loading && <CircularProgress color="inherit" />}
//       {weather.error && (
//         <span className="error-message">
//           <FontAwesomeIcon icon={faFrown} />
//           <span style={{ fontSize: '20px' }}>Unable to fetch weather data</span>
//         </span>
//       )}
//       {weather.data && weather.data.current && (
//         <div>
//           <div className="city-name">
//             <h2>
//               Current Location
//             </h2>
//           </div>
//           <div className="date">
//             <span>{toDateFunction()}</span>
//           </div>
//           <div className="icon-temp">
//             <img
//               src={`https://openweathermap.org/img/wn/${weather.data.current.weather[0].icon}@2x.png`}
//               alt={weather.data.current.weather[0].description}
//             />
//             {Math.round(weather.data.current.temp)}
//             <sup className="deg">°C</sup>
//           </div>
//           <div className="des-wind">
//             <p>{weather.data.current.weather[0].description.toUpperCase()}</p>
//             <p>Wind Speed: {weather.data.current.wind_speed} m/s</p>
//             <p>Humidity: {weather.data.current.humidity}%</p>
//             <p>Precipitation: {weather.data.current.rain ? weather.data.current.rain['1h'] : 0} mm</p>
//           </div>
//           <HourlyDaily hourly={weather.data.hourly} daily={weather.data.daily} />
//         </div>
//       )}
//     </div>
//   );
// }

// export default WeatherApp;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CircularProgress from '@mui/material/CircularProgress';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFrown } from '@fortawesome/free-solid-svg-icons';
// import HourlyDaily from './HourlyDaily';

// import './Weather.css';

// function WeatherApp() {
//   const [weather, setWeather] = useState({
//     loading: false,
//     data: {},
//     error: false,
//   });
//   const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
//   const [searchInput, setSearchInput] = useState('');
//   const [searchData, setSearchData] = useState(null);
//   const [useCurrentLocation, setUseCurrentLocation] = useState(true);

//   useEffect(() => {
//     if (useCurrentLocation) {
//       // Function to get the user's current location
//       const getLocation = () => {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (position) => {
//               const { latitude, longitude } = position.coords;
//               setCoordinates({ lat: latitude, lon: longitude });
//             },
//             (error) => {
//               console.log('Error getting location', error);
//               setWeather({ ...weather, error: true });
//             }
//           );
//         } else {
//           console.log('Geolocation is not supported by this browser.');
//           setWeather({ ...weather, error: true });
//         }
//       };

//       getLocation();
//     } else if (searchInput) {
//       fetchWeatherDataByLocation(searchInput);
//     }
//   }, [coordinates, searchInput, useCurrentLocation]);

//   const fetchWeatherData = async (lat, lon) => {
//     setWeather({ ...weather, loading: true });
//     const url = 'https://api.openweathermap.org/data/2.5/onecall';
//     const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

//     try {
//       const response = await axios.get(url, {
//         params: {
//           lat: lat,
//           lon: lon,
//           exclude: 'minutely',
//           units: 'metric',
//           appid: api_key,
//         },
//       });
//       setWeather({ data: response.data, loading: false, error: false });
//     } catch (error) {
//       setWeather({ ...weather, data: {}, error: true });
//       console.log('Error fetching weather data', error);
//     }
//   };

//   const fetchWeatherDataByLocation = async (location) => {
//     setWeather({ ...weather, loading: true });
//     const url = 'https://api.openweathermap.org/data/2.5/weather';
//     const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

//     try {
//       const response = await axios.get(url, {
//         params: {
//           q: location,
//           units: 'metric',
//           appid: api_key,
//         },
//       });
//       const { lat, lon } = response.data.coord;
//       fetchWeatherData(lat, lon);
//       setSearchData(response.data);
//       setUseCurrentLocation(false);
//     } catch (error) {
//       setWeather({ ...weather, data: {}, error: true });
//       console.log('Error fetching weather data by location', error);
//     }
//   };

//   const handleSearch = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       fetchWeatherDataByLocation(searchInput);
//     }
//   };

//   const toDateFunction = () => {
//     const months = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December',
//     ];
//     const WeekDays = [
//       'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
//     ];
//     const currentDate = new Date();
//     const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
//     return date;
//   };

//   const locationData = useCurrentLocation ? weather.data.current : searchData;

//   return (
//     <div className="App">
//       <div className="search-bar">
//         <input
//           type="text"
//           className="city-search"
//           placeholder="Enter City Name.."
//           value={searchInput}
//           onChange={(event) => setSearchInput(event.target.value)}
//           onKeyPress={handleSearch}
//         />
//         <button onClick={() => setUseCurrentLocation(true)}>Use Current Location</button>
//       </div>
//       {weather.loading && <CircularProgress color="inherit" />}
//       {weather.error && (
//         <span className="error-message">
//           <FontAwesomeIcon icon={faFrown} />
//           <span style={{ fontSize: '20px' }}>Unable to fetch weather data</span>
//         </span>
//       )}
//       {locationData && (
//         <div>
//           <div className="city-name">
//             <h2>
//               {useCurrentLocation ? 'Current Location' : locationData.name}, 
//               <span>{useCurrentLocation ? '' : locationData.sys.country}</span>
//             </h2>
//           </div>
//           <div className="date">
//             <span>{toDateFunction()}</span>
//           </div>
//           <div className="icon-temp">
//             <img
//               src={`https://openweathermap.org/img/wn/${locationData.weather[0].icon}@2x.png`}
//               alt={locationData.weather[0].description}
//             />
//             {Math.round(locationData.main.temp)}
//             <sup className="deg">°C</sup>
//           </div>
//           <div className="des-wind">
//             <p>{locationData.weather[0].description.toUpperCase()}</p>
//             <p>Wind Speed: {locationData.wind.speed} m/s</p>
//             <p>Humidity: {locationData.main.humidity}%</p>
//             <p>Precipitation: {locationData.rain ? locationData.rain['1h'] : 0} mm</p>
//           </div>
//           {weather.data && weather.data.hourly && weather.data.daily && (
//             <HourlyDaily hourly={weather.data.hourly} daily={weather.data.daily} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default WeatherApp;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import CircularProgress from '@mui/material/CircularProgress';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFrown } from '@fortawesome/free-solid-svg-icons';
// import HourlyDaily from './HourlyDaily';

// import './Weather.css';

// function WeatherApp() {
//   const [weather, setWeather] = useState({
//     loading: false,
//     data: {},
//     error: false,
//   });
//   const [coordinates, setCoordinates] = useState({ lat: null, lon: null });
//   const [searchInput, setSearchInput] = useState('');
//   const [searchData, setSearchData] = useState(null);
//   const [useCurrentLocation, setUseCurrentLocation] = useState(true);

//   useEffect(() => {
//     if (useCurrentLocation) {
//       // Function to get the user's current location
//       const getLocation = () => {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (position) => {
//               const { latitude, longitude } = position.coords;
//               setCoordinates({ lat: latitude, lon: longitude });
//             },
//             (error) => {
//               console.log('Error getting location', error);
//               setWeather({ ...weather, error: true });
//             }
//           );
//         } else {
//           console.log('Geolocation is not supported by this browser.');
//           setWeather({ ...weather, error: true });
//         }
//       };

//       getLocation();
//     } else if (searchInput) {
//       fetchWeatherDataByLocation(searchInput);
//     }
//   }, [coordinates, searchInput, useCurrentLocation]);

//   const fetchWeatherData = async (lat, lon) => {
//     setWeather({ ...weather, loading: true });
//     const url = 'https://api.openweathermap.org/data/2.5/onecall';
//     const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

//     try {
//       const response = await axios.get(url, {
//         params: {
//           lat: lat,
//           lon: lon,
//           exclude: 'minutely',
//           units: 'metric',
//           appid: api_key,
//         },
//       });
//       setWeather({ data: response.data, loading: false, error: false });
//     } catch (error) {
//       setWeather({ ...weather, data: {}, error: true });
//       console.log('Error fetching weather data', error);
//     }
//   };

//   const fetchWeatherDataByLocation = async (location) => {
//     setWeather({ ...weather, loading: true });
//     const url = 'https://api.openweathermap.org/data/2.5/weather';
//     const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

//     try {
//       const response = await axios.get(url, {
//         params: {
//           q: location,
//           units: 'metric',
//           appid: api_key,
//         },
//       });
//       const { lat, lon } = response.data.coord;
//       fetchWeatherData(lat, lon);
//       setSearchData(response.data);
//       setUseCurrentLocation(false);
//     } catch (error) {
//       setWeather({ ...weather, data: {}, error: true });
//       console.log('Error fetching weather data by location', error);
//     }
//   };

//   const handleSearch = (event) => {
//     if (event.key === 'Enter') {
//       event.preventDefault();
//       fetchWeatherDataByLocation(searchInput);
//     }
//   };

//   const toDateFunction = () => {
//     const months = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December',
//     ];
//     const WeekDays = [
//       'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',
//     ];
//     const currentDate = new Date();
//     const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
//     return date;
//   };

//   const locationData = useCurrentLocation ? weather.data.current : searchData;

//   return (
//     <div className="App">
//       <div className="search-bar">
//         <input
//           type="text"
//           className="city-search"
//           placeholder="Enter City Name.."
//           value={searchInput}
//           onChange={(event) => setSearchInput(event.target.value)}
//           onKeyPress={handleSearch}
//         />
//         <button onClick={() => setUseCurrentLocation(true)}>Use Current Location</button>
//       </div>
//       {weather.loading && <CircularProgress color="inherit" />}
//       {weather.error && (
//         <span className="error-message">
//           <FontAwesomeIcon icon={faFrown} />
//           <span style={{ fontSize: '20px' }}>Unable to fetch weather data</span>
//         </span>
//       )}
//       {locationData && locationData.main && (
//         <div>
//           <div className="city-name">
//             <h2>
//               {useCurrentLocation ? 'Current Location' : locationData.name}, 
//               <span>{useCurrentLocation ? '' : locationData.sys.country}</span>
//             </h2>
//           </div>
//           <div className="date">
//             <span>{toDateFunction()}</span>
//           </div>
//           <div className="icon-temp">
//             <img
//               src={`https://openweathermap.org/img/wn/${locationData.weather[0].icon}@2x.png`}
//               alt={locationData.weather[0].description}
//             />
//             {Math.round(locationData.main.temp)}
//             <sup className="deg">°C</sup>
//           </div>
//           <div className="des-wind">
//             <p>{locationData.weather[0].description.toUpperCase()}</p>
//             <p>Wind Speed: {locationData.wind.speed} m/s</p>
//             <p>Humidity: {locationData.main.humidity}%</p>
//             <p>Precipitation: {locationData.rain ? locationData.rain['1h'] : 0} mm</p>
//           </div>
//           {weather.data && weather.data.hourly && weather.data.daily && (
//             <HourlyDaily hourly={weather.data.hourly} daily={weather.data.daily} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default WeatherApp;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
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
  const [searchInput, setSearchInput] = useState('');
  const [searchData, setSearchData] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);

  useEffect(() => {
    const fetchWeatherFromCache = () => {
      const cachedWeather = localStorage.getItem('weatherData');
      if (cachedWeather) {
        setWeather({ data: JSON.parse(cachedWeather), loading: false, error: false });
      }
    };

    if (useCurrentLocation) {
      // Function to get the user's current location
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setCoordinates({ lat: latitude, lon: longitude });
            },
            (error) => {
              console.log('Error getting location', error);
              setWeather({ ...weather, error: true });
            }
          );
        } else {
          console.log('Geolocation is not supported by this browser.');
          setWeather({ ...weather, error: true });
        }
      };

      fetchWeatherFromCache();
      getLocation();
    } else if (searchInput) {
      fetchWeatherDataByLocation(searchInput);
    }
  }, [coordinates, searchInput, useCurrentLocation]);

  const fetchWeatherData = async (lat, lon) => {
    setWeather({ ...weather, loading: true });
    const url = 'https://api.openweathermap.org/data/2.5/onecall';
    const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

    try {
      const response = await axios.get(url, {
        params: {
          lat: lat,
          lon: lon,
          exclude: 'minutely',
          units: 'metric',
          appid: api_key,
        },
      });
      localStorage.setItem('weatherData', JSON.stringify(response.data)); // Cache weather data
      setWeather({ data: response.data, loading: false, error: false });
    } catch (error) {
      setWeather({ ...weather, data: {}, error: true });
      console.log('Error fetching weather data', error);
    }
  };

  const fetchWeatherDataByLocation = async (location) => {
    setWeather({ ...weather, loading: true });
    const url = 'https://api.openweathermap.org/data/2.5/weather';
    const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

    try {
      const response = await axios.get(url, {
        params: {
          q: location,
          units: 'metric',
          appid: api_key,
        },
      });
      const { lat, lon } = response.data.coord;
      fetchWeatherData(lat, lon);
      setSearchData(response.data);
      setUseCurrentLocation(false);
    } catch (error) {
      setWeather({ ...weather, data: {}, error: true });
      console.log('Error fetching weather data by location', error);
    }
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      fetchWeatherDataByLocation(searchInput);
    }
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
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  };

  const locationData = useCurrentLocation ? weather.data.current : searchData;

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Enter City Name.."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          onKeyPress={handleSearch}
        />
        <button onClick={() => setUseCurrentLocation(true)}>Use Current Location</button>
      </div>
      {weather.loading && <CircularProgress color="inherit" />}
      {weather.error && (
        <span className="error-message">
          <FontAwesomeIcon icon={faFrown} />
          <span style={{ fontSize: '20px' }}>Unable to fetch weather data</span>
        </span>
      )}
      {locationData && locationData.main && (
        <div>
          <div className="city-name">
            <h2>
              {useCurrentLocation ? 'Current Location' : locationData.name}, 
              <span>{useCurrentLocation ? '' : locationData.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>
          <div className="icon-temp">
            <img
              src={`https://openweathermap.org/img/wn/${locationData.weather[0].icon}@2x.png`}
              alt={locationData.weather[0].description}
            />
            {Math.round(locationData.main.temp)}
            <sup className="deg">°C</sup>
          </div>
          <div className="des-wind">
            <p>{locationData.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {locationData.wind.speed} m/s</p>
            <p>Humidity: {locationData.main.humidity}%</p>
            <p>Precipitation: {locationData.rain ? locationData.rain['1h'] : 0} mm</p>
          </div>
          {weather.data && weather.data.hourly && weather.data.daily && (
            <HourlyDaily hourly={weather.data.hourly} daily={weather.data.daily} />
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;

