import React, { useState } from 'react'
import { fetchAndCalculateWeatherData } from "./weather-module/src/app.js"


function App() {
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState('')
  const [temperatureData, setTemperatureData] = useState('')
  const [humidityData, setHumidityData] = useState('')
  const [windSpeedData, setWindSpeedData] = useState('')
  const [rainfallData, setRainfallData] = useState('')


  const handleWeatherFetch = async () => {
    if (!city || !country) {
      setError('City and country must be provided！')
      return // Exit the function if city or country is empty
    }

    try {
      setError('') // Clear any previous errors

      console.log('Submitting city: ' + city)
      console.log('Submitting country: ' + country)
      const moduleResult = await fetchAndCalculateWeatherData(city, country) // Await the async call
      setTemperatureData(`The average temperature for the next 40 days at ` + city + ` is around : ${moduleResult.averageTemperature} °K, which is ${moduleResult.averageTemperatureInCelsius} °C.`)
      setHumidityData(`The average humidity for the next 40 days at ` + city + ` is around : ${moduleResult.averageHumidity} %.`)
      setWindSpeedData(`The average windSpeed for the next 40 days at ` + city + ` is around : ${moduleResult.averageWindSpeed} m/s.`)
      setRainfallData(`The average rainfall for the next 40 days at ` + city + ` is around : ${moduleResult.maxRainfall} mm.`)
    } catch (error) {
      console.error(error)
      setError("Sorry, we couldn't fetch the weather data. Please try again later.")
    }
  }

  return (
    <div className="App">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Please enter capital letters！"
      />
      <button onClick={handleWeatherFetch}>Get Weather</button>
      <p>Opps!! Please enter the city code in capital letters (For example 'GB' for the United Kingdom, 'SE' for Sweden, and 'US' for the United States)</p>
       <p>The result is:</p>
       <p>{temperatureData}</p> {/* Render the temperature data */}
       <p>{humidityData}</p> {/* Render the humidity data */}
       <p>{windSpeedData}</p> {/* Render the wind speed data */}
       <p>{rainfallData}</p> {/* Render the rain fall data */}
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}

export default App
