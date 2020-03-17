/* istanbul ignore file */

import Config from 'react-native-config'
import Proxy from './Proxy'

/**
 * API related stuff.
 *
 * Use this file to perform common api operations like selecting the endpoint depending on
 * the .env file values, use mocks, ...
 */

// ToDo: fix .inv config parsing
// const apiEndpoint = Config.API_ENDPOINT
const apiEndpoint = 'https://afternoon-waters-49321.herokuapp.com/v1'
const debugMode = Config.DEBUG_MODE
const api = new Proxy(apiEndpoint, debugMode)

export default api
export { default as constants } from './constants'
