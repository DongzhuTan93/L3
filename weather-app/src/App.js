import React, { useState } from 'react';
import { fetchAndCalculateWeatherData } from "./weather-module/src/app.js";
import './App.css';
import { WiThermometer, WiHumidity, WiStrongWind, WiRain } from 'react-icons/wi';
import logo from './images/logo.png';

function App() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleWeatherFetch = async () => {
    if (!city || !country) {
      setError('City and country must be provided!');
      return;
    }

    try {
      setError('');
      const moduleResult = await fetchAndCalculateWeatherData(city, country);
      setWeatherData({
        temperature: {
          value: moduleResult.averageTemperatureInCelsius,
          unit: '°C',
          icon: <WiThermometer />,
          label: 'Temperature'
        },
        humidity: {
          value: moduleResult.averageHumidity,
          unit: '%',
          icon: <WiHumidity />,
          label: 'Humidity'
        },
        windSpeed: {
          value: moduleResult.averageWindSpeed,
          unit: 'm/s',
          icon: <WiStrongWind />,
          label: 'Wind Speed'
        },
        rainfall: {
          value: moduleResult.maxRainfall,
          unit: 'mm',
          icon: <WiRain />,
          label: 'Rainfall'
        }
      });
    } catch (error) {
      console.error(error);
      setError("Sorry, we couldn't fetch the weather data. Please try again later.");
    }
  };

  return (
    <div className="App">
      <div className="content-wrapper">
        <header className="App-header">
          <img src={logo} alt="Logo" className="App-logo" />
          <h1>Weather Forecast</h1>
        </header>
        <div className="form-container">
          <input
            className="input-field"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name (Kalmar, London, Beijing...)"
          />
          <input
            className="input-field"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country code ('SE, UK, US, CN...')"
          />
          <button onClick={handleWeatherFetch}>Get Weather</button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {weatherData && (
          <div className="weather-container">
            {Object.entries(weatherData).map(([key, data], index) => (
              <div key={key} className={`weather-card weather-card-${index + 1}`}>
                <div className="weather-city">{city}</div>
                <div className="weather-icon">{data.icon}</div>
                <div className="weather-value">{data.value}{data.unit}</div>
                <div className="weather-type">{data.label}</div>
                <div className="weather-bottom"><p>Average {data.label} forecast for the next 40 days</p></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
