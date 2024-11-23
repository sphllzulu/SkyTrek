
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';



export const weatherAPI = {
  async getWeatherData(location) {
    try {
      // Check if location is coordinates (contains comma)
      const isCoordinates = location.includes(',');
      let lat, lon, queryString;

      if (isCoordinates) {
        [lat, lon] = location.split(',');
        queryString = `lat=${lat}&lon=${lon}`;
      } else {
        queryString = `q=${location}`;
      }

      const [current, forecast] = await Promise.all([
        fetch(`${BASE_URL}/weather?${queryString}&appid=${API_KEY}&units=metric`),
        fetch(`${BASE_URL}/forecast?${queryString}&appid=${API_KEY}&units=metric`)
      ]);

      if (!current.ok || !forecast.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const currentData = await current.json();
      const forecastData = await forecast.json();

      return {
        current: {
          temp: currentData.main.temp,
          humidity: currentData.main.humidity,
          windSpeed: currentData.wind.speed,
          description: currentData.weather[0].description,
          icon: currentData.weather[0].icon,
          location: currentData.name // Add city name to response
        },
        hourly: forecastData.list.slice(0, 24).map(item => ({
          time: new Date(item.dt * 1000),
          temp: item.main.temp,
          icon: item.weather[0].icon
        })),
        daily: this.processDailyForecast(forecastData.list)
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  },

  processDailyForecast(forecastList) {
    const dailyData = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          temps: [],
          icons: []
        };
      }
      dailyData[date].temps.push(item.main.temp);
      dailyData[date].icons.push(item.weather[0].icon);
    });

    return Object.entries(dailyData).map(([date, data]) => ({
      date: new Date(date),
      maxTemp: Math.max(...data.temps),
      minTemp: Math.min(...data.temps),
      icon: this.getMostFrequentIcon(data.icons)
    })).slice(0, 7);
  },

  getMostFrequentIcon(icons) {
    return icons.sort((a, b) =>
      icons.filter(v => v === a).length - icons.filter(v => v === b).length
    ).pop();
  }
};