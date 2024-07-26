/**
 * Repersent a weather module class.
 */
export class WeatherModule {
  /**
   * Represent a weatherModule constructor.
   *
   * @param {Array} temperaturesInKelvin The input temperatures data.
   * @param {Array} humidities The input humidities data.
   * @param {Array} windSpeeds The input wind speeds data.
   * @param {Array} rainfall The input rainfall data.
   */
  constructor (temperaturesInKelvin, humidities, windSpeeds, rainfall) {
    console.log('Toatl tempera at weathermodule constructor is :' + temperaturesInKelvin)
    this.temperaturesInKelvin = temperaturesInKelvin
    this.humidities = humidities
    this.windSpeeds = windSpeeds
    this.rainfall = rainfall
  }

  /**
   * Calculate average temperaturesInKelvin for the next 40 days.
   *
   * @returns {number} 40 days average temperatures in celsius.
   */
  calculateAverageTemperature () {
    try {
      const temperaturesInKelvinSum = this.temperaturesInKelvin.reduce((acc, curr) => acc + curr, 0)
      // Inspiration: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
      const averageTemperatureKelvin = temperaturesInKelvinSum / this.temperaturesInKelvin.length
      console.log('Temperatures In Kelvin Sum is: ' + temperaturesInKelvinSum)
      console.log('Average temperatures is around: ' + temperaturesInKelvinSum + '/' + this.temperaturesInKelvin.length + ' = ' + averageTemperatureKelvin + 'K')
      // Calculation results are kept to one decimal place.
      return Number(averageTemperatureKelvin.toFixed(1))
    } catch (error) {
      console.error('Error calculating average temperature:', error)
      // Handle error appropriately or rethrow to be handled by the caller
      throw new Error('Failed to calculate average temperature')
    }
  }

  /**
   * Calculate the average humidity for the next 40 days.
   *
   * @returns {number} 40 days average humidity.
   */
  calculateAverageHumidity () {
    try {
      const humiditySum = this.humidities.reduce((acc, curr) => acc + curr, 0)
      const averageHumidity = humiditySum / this.humidities.length
      console.log('Humidity Sum is: ' + humiditySum)
      console.log('Average humidity is around: ' + humiditySum + '/' + this.humidities.length + ' = ' + averageHumidity)
      return Number(averageHumidity.toFixed(1))
    } catch (error) {
      console.error('Error calculating average humidity:', error)
      throw new Error('Failed to calculate average humidity')
    }
  }

  /**
   * Calculate the average wind speed for the next 40 days.
   *
   * @returns {number} 40 days average wind speed.
   */
  calculateAverageWindSpeed () {
    try {
      const windSpeedSum = this.windSpeeds.reduce((acc, curr) => acc + curr, 0)

      const averageWindSpeed = windSpeedSum / this.windSpeeds.length
      console.log('Wind Speed Sum is: ' + windSpeedSum)
      console.log('Average humidity is: ' + windSpeedSum + '/' + this.windSpeeds.length + ' = ' + Number(averageWindSpeed.toFixed(1)))

      return Number(averageWindSpeed.toFixed(1))
    } catch (error) {
      console.error('Error calculating average temperature:', error)
      throw new Error('Failed to calculate average temperature')
    }
  }

  /**
   * Calculate the maximum rainfall for the next 40 days.
   *
   * @returns {number} Maximum rainfall in mm.
   */
  calculateMaximumRainfall () {
    try {
      const rainfallAmounts = this.rainfall.map(rain => Number(rain))
      const maxRainfall = Math.max(...rainfallAmounts)

      return maxRainfall || 0
    } catch (error) {
      console.error('Error calculating maximum rainfall:', error)
      throw new Error('Failed to calculate maximum rainfall')
    }
  }

  /**
   * Convert temperature in Kelvin to Celsius.
   *
   * @param {number} inputTemperatureKelvin input temperature in Kelvin.
   * @returns {number} The temperatures in celsius.
   */
  convertKelvinToCelsius (inputTemperatureKelvin) {
    try {
      return Number(inputTemperatureKelvin - 273.15).toFixed(1)
      // Inspiration: https://www.metric-conversions.org/temperature/kelvin-to-celsius.htm
    } catch (error) {
      console.error('Error converting Kelvin to Celsius:', error)
      throw new Error('Failed to convert temperature from Kelvin to Celsius')
    }
  }
}
