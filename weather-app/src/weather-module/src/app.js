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
  console.log('get city and country at main: ' + city + ' and ' + country)
  if (!city || !country) {
    throw new Error('City name and country code are required.')
  }

  try {
    const weatherFetcher = new WeatherDataService(process.env.REACT_APP_API_KEY)
    const coordinates = await weatherFetcher.retrieveCityCooperatives(city, country)
    console.log('Selected coordinates:', coordinates)
    const weatherData = await weatherFetcher.fetchWeatherData(coordinates.lat, coordinates.lon)
    console.log(weatherData)

    // Save corresponding to an array and sent it to corresponding function.
    const weatherDataList = weatherData.list
    const temperaturesInKelvin = weatherDataList.map(item => item.main.temp)
    console.log('The temperatures from directict fecting is ' + temperaturesInKelvin)
    console.log('This is the temperature forecast for the next ' + temperaturesInKelvin.length + ' days.')

    const humidities = weatherDataList.map(item => item.main.humidity)
    console.log('This is the humidities forecast for the next ' + humidities.length + ' days.')

    const windSpeeds = weatherDataList.map(item => item.wind.speed)
    console.log('This is the windSpeeds for the next ' + windSpeeds.length + ' days.')

    const rainfall = weatherDataList.map(item => item.rain && item.rain['3h'] ? item.rain['3h'] : 0)
    // Check if item.rain exists and has a property '3h'
    console.log('rainfall form app.js console.log:' + rainfall)

    const weatherModule = new WeatherModule(temperaturesInKelvin, humidities, windSpeeds, rainfall)

    const averageTemperature = await weatherModule.calculateAverageTemperature()
    // console.log('The average temperature in kelvin for the next 40 days is around: ' + averageTemperature + 'K.')

    const averageTemperatureInCelsius = await weatherModule.convertKelvinToCelsius(averageTemperature)
    console.log('The average temperature in kelvin is around ' + averageTemperature + ' K' + ' which is around (' + averageTemperature + ' - 273.15) = ' + averageTemperatureInCelsius + '°C in Celsius.')
    // console.log('The average temperature in kelvin is ' + averageTemperature + 'K' + ' which is around ' + averageTemperatureInCelsius + '°C in Celsius.')

    const averageHumidity = await weatherModule.calculateAverageHumidity()
    // console.log('The average humidity for the next 40 days is around: ' + averageHumidity + '%.')

    const averageWindSpeed = await weatherModule.calculateAverageWindSpeed()
    // console.log('The average wind speed for the next 40 days is around: ' + averageWindSpeed + 'm/s.')

    const maxRainfall = await weatherModule.calculateMaximumRainfall(rainfall)
    // console.log('The maximum rainfall for the next 40 days is around: ' + maxRainfall + 'mm.')

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
