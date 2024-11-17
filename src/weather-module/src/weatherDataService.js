/**
 * Fetch 5 days forecasts weather data.
 */
export class WeatherDataService {
  /**
   * Represent a WeatherDataService constructor.
   *
   * @param {string } apiKey The API key to use.
   */
  constructor (apiKey) {
    this.apiKey = apiKey
    this.baseUrl = 'https://api.openweathermap.org/'
  }

  /**
   * Get city's coordinate.
   *
   * @param {string} city The weather of a certain city in this country.
   * @param {string} country This is the designated country.
   * @returns {object} The city's coordinate.
   */
  async retrieveCityCooperatives (city, country) {
    console.log('get city and country at retrieveCityCooperatives(): ' + city + ' and ' + country)
    try {
      if (!city || !country) {
        throw new Error('City and country must be provided')
      }

      if (!this.apiKey) {
        throw new Error('No API key found')
      }

      const url = `${this.baseUrl}/geo/1.0/direct?q=${encodeURIComponent(city)},
      ${encodeURIComponent(country)}&limit=1&appid=${this.apiKey}`

      const response = await fetch(url)
      console.log(url)

      if (!response.ok) {
        throw new Error(`Failed to fetch coordinates: Status code ${response.status}`)
      }
      const data = await response.json()

      if (data.length === 0) {
        console.log('No data returned', data)
        throw new Error('City not found or invalid country code')
      }

      const matchedLocation = data.find(
        location => location.name.toLowerCase() === city.toLowerCase() &&
        location.country.toLowerCase() === country.toLowerCase()
      )

      if (!matchedLocation) {
        throw new Error(`No matching location found for ${city}, ${country}`)
      }

      console.log('Matched Coordinates:', matchedLocation)
      return { lat: matchedLocation.lat, lon: matchedLocation.lon }
    } catch (error) {
      console.error('Error fetching coordinates:', error)
      throw error
    }
  }

  /**
   * Represent citys lat, lon.
   *
   * @param {string} lat The citys lat.
   * @param {string} lon The citys lon.
   * @returns {object} The weather data.
   */
  async fetchWeatherData (lat, lon) {
    try {
      const response = await fetch(`${this.baseUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}`)
      console.log('response fetchWeatherData ', response)
      if (!response.ok) {
        throw new Error(`Error fetching weather data: ${response.statusText}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching coordinates:', error)
      throw error
    }
  }
}
