import i18n from 'i18n-js'
import axios from 'axios'
import AxiosLogger from 'axios-logger'

/**
 * Backend api should be proxied via one or more classes so the code elsewhere should
 * not have to directly make network calls to the backend.
 */
export default class Proxy {
  constructor(apiEndpoint, debugMode) {
    // Transform truthy / falsy values.
    this.debugMode = !!(debugMode)

    this.axios = axios.create({
      baseURL: apiEndpoint,
      timeout: 2000,
      headers: Proxy.getCommonHeaders(),
    })

    if (debugMode === 'true') {
      this.axios.interceptors.request.use(AxiosLogger.requestLogger)
      this.axios.interceptors.response.use(AxiosLogger.responseLogger)
    }
  }

  /**
   * Returns common headers to send for all api requests.
   *
   * @returns {{'content-type': string, 'Accept-Language': (string|string|*)}}
   *   The headers to use for all requests to the api.
   */
  static getCommonHeaders() {
    return {
      'content-type': 'application/json',
      'Accept-Language': i18n.locale,
    }
  }
}
