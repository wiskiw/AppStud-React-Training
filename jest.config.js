module.exports = {
  preset: 'react-native',
  globals: {
    window: {},
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-navigation|@react-navigation/.*))',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/testutils/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
  ],
  setupFilesAfterEnv: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jest.setup.js',
  ],
}
