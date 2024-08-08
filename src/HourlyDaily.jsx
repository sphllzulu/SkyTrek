


import React from 'react';
import './HourlyDaily.css';

const HourlyDaily = ({ hourly, daily, unit }) => {
  // Function to convert temperatures
  const convertTemp = (temp) => {
    return unit === 'metric' ? temp : temp * 9/5 + 32;
  };

  // Unit symbol
  const tempUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="hourly-daily-container">
      <div className="hourly">
        <h3 style={{ color: 'lightgrey', fontSize: '30px' }}>Hourly Forecast</h3>
        <div className="hourly-forecasts">
          {hourly && hourly.length > 0 ? (
            hourly.slice(0, 5).map((hour, index) => (
              <div key={index} className="hourly-item">
                <p style={{ color: 'white' }}>{new Date(hour.dt * 1000).getHours()}:00</p>
                <img
                  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                  alt={hour.weather[0].description}
                />
                <p style={{ color: 'white' }}>{Math.round(convertTemp(hour.temp))}{tempUnit}</p>
              </div>
            ))
          ) : (
            <p style={{ color: 'white' }}>No hourly data available</p>
          )}
        </div>
      </div>
      <div className="daily">
        <h2 style={{ color: 'lightgrey', fontSize: '30px' }}>Daily Forecast</h2>
        <div className="daily-forecasts">
          {daily && daily.length > 0 ? (
            daily.slice(1, 6).map((day, index) => (
              <div key={index} className="daily-item">
                <p style={{ color: 'white' }} className='small'>{new Date(day.dt * 1000).toDateString()}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                />
                <p style={{ color: 'white' }}>Day: {Math.round(convertTemp(day.temp.day))}{tempUnit}</p>
                <p style={{ color: 'white' }}>Night: {Math.round(convertTemp(day.temp.night))}{tempUnit}</p>
              </div>
            ))
          ) : (
            <p style={{ color: 'white' }}>No daily data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HourlyDaily;
