// More generic matchers.
require('jest-extended')

// More react-native matches.
// Do not import everything because it has name conflicts with jest-extended.
import { toHaveStyle } from '@testing-library/jest-native'
expect.extend({ toHaveStyle })

// Allows to mock fetch responses.
global.fetch = require('jest-fetch-mock')
