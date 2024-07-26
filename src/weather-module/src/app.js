/**
 * Where the application starts.
 *
 * @author Dongzhu Tan <dt222ha@student.lnu.se>
 */

import { WeatherModule } from './weatherModule.js'
import { WeatherDataService } from './weatherDataService.js'

/**
 * The main function of the application.
 *
 * @param {string} city The input city to fetch.
 * @param {string} country The input country to fetch.
 * @returns {string} Return the average temperature, temperature to celsius, humidity, and wind speed.
 */
export const fetchAndCalculateWeatherData = async (city, country) => {
  if (!city || !country) {
    throw new Error('City name and country code are required.')
  }

  try {
    const weatherFetcher = new WeatherDataService(process.env.REACT_APP_API_KEY)
    const coordinates = await weatherFetcher.retrieveCityCooperatives(city, country)
    const weatherData = await weatherFetcher.fetchWeatherData(coordinates.lat, coordinates.lon)

    const weatherDataList = weatherData.list
    console.log('The days: ' + weatherDataList.length)

    const temperaturesInKelvin = weatherDataList.map(item => item.main.temp)
    const humidities = weatherDataList.map(item => item.main.humidity)
    const windSpeeds = weatherDataList.map(item => item.wind.speed)
    const rainfall = weatherDataList.map(item => item.rain && item.rain['3h'] ? item.rain['3h'] : 0)

    const weatherModule = new WeatherModule(temperaturesInKelvin, humidities, windSpeeds, rainfall)
    const averageTemperature = await weatherModule.calculateAverageTemperature()
    const averageTemperatureInCelsius = await weatherModule.convertKelvinToCelsius(averageTemperature)
    const averageHumidity = await weatherModule.calculateAverageHumidity()
    const averageWindSpeed = await weatherModule.calculateAverageWindSpeed()
    const maxRainfall = await weatherModule.calculateMaximumRainfall(rainfall)
    return {
      averageTemperature,
      averageTemperatureInCelsius,
      averageHumidity,
      averageWindSpeed,
      maxRainfall
    }
  } catch (error) {
    console.error(error.message)
    throw error
  }
}
