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
    console.log('The total temperature set in the WeatherModule constructor is: ' + temperaturesInKelvin)
    this.temperaturesInKelvin = temperaturesInKelvin
    this.humidities = humidities
    this.windSpeeds = windSpeeds
    this.rainfall = rainfall
  }

  /**
   * Private method to calculate average of an array of weather measurements.
   *
   * @param {Array} measurements  Array of numerical weather measurements.
   * @param {string} metricType  Type of weather metric being calculated (e.g., 'temperature', 'humidity').
   * @returns {number} The calculated average, rounded to one decimal.
   */
  #calculateAverage (measurements, metricType) {
    try {
      const measurementTotal = measurements.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      const measurementCount = measurements.length
      const measurementAverage = measurementTotal / measurementCount

      console.log(`${metricType} Total: ${measurementTotal}`)
      console.log(`Average ${metricType}: ${measurementTotal}/${measurementCount} = ${measurementAverage}`)

      return Number(measurementAverage.toFixed(1))
    } catch (error) {
      console.error(`Error calculating average ${metricType}:`, error)
      throw new Error(`Failed to calculate average ${metricType}`)
    }
  }

  /**
   * Calculate average temperaturesInKelvin for the next 40 days.
   *
   * @returns {number} 40 days average temperatures in celsius.
   */
  calculateAverageTemperature () {
    return this.#calculateAverage(this.temperaturesInKelvin, 'temperature')
  }

  /**
   * Calculate the average humidity for the next 40 days.
   *
   * @returns {number} 40 days average humidity.
   */
  calculateAverageHumidity () {
    return this.#calculateAverage(this.humidities, 'humidity')
  }

  /**
   * Calculate the average wind speed for the next 40 days.
   *
   * @returns {number} 40 days average wind speed.
   */
  calculateAverageWindSpeed () {
    return this.#calculateAverage(this.windSpeeds, 'wind speed')
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
