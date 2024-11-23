# SkyTrek
Please click here for demo: https://sky-trek-pj92.vercel.app/
## Overview

The Weather App is a React application built with Vite that provides real-time weather information, including current conditions, hourly and daily forecasts. It offers location-based forecasting, push notifications for severe weather alerts, and multiple location support. Users can customize the app's theme and temperature units, access cached data offline, and enjoy a fast, optimized experience.

## Features

### Real-time Weather Info
- **Current Weather Conditions**: Displays real-time data including temperature, humidity, wind speed, and more.
- **Hourly and Daily Forecasts**: Provides detailed forecasts for the next hour and several days ahead.

### Location-Based Forecasting
- **Automatic Location Detection**: Detects and displays weather information for the user's current location.
- **Manual Location Setting**: Allows users to set and view weather information for any location of their choice.

### Multiple Locations
- **Save and Switch Locations**: Users can save multiple locations and easily switch between them to view weather updates.

### Customization
- **Theme Customization**: Users can toggle between light and dark themes.
- **Units Customization**: Switch between Celsius and Fahrenheit for temperature display.

### Offline Access
- **Cached Data**: Provides access to previously fetched weather data when offline.

### Performance
- **Optimized Loading**: Ensures fast loading times and smooth performance.

### Privacy & Security
- **Data Protection**: User data is handled with care and protected in accordance with relevant laws and regulations.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- An API key from OpenWeatherMap for weather data.
- A OneSignal account for push notifications.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sphllzulu/SkyTrek.git
   cd SkyTrek
   npm install
   npm run dev

2. **Navigate to the SkyTrek directory and install dependencies**
   ```bash
  
   cd SkyTrek
   npm install

3. **Create a .env file in the root directory and add your open weather api key**
   ```bash
  VITE_WEATHER_API_KEY=YOUR API KEY HERE  
   


4. **Run the project**
   ```bash
   npm run dev   
