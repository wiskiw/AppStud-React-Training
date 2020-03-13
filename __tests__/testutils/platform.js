const mockPlatform = (OS, version) => {
  jest.resetModules()
  jest.doMock('Platform', () => ({
    OS,
    select: (objs) => objs[OS],
    Version: version || undefined,
  }))
}

const unmockPlatform = () => {
  jest.unmock('Platform')
}

const mockIphoneX = () => {
  jest.resetModules()
  jest.doMock('react-native-iphone-x-helper', () => ({
    isIphoneX: () => true,
  }))
}

const unmockIphoneX = () => {
  jest.unmock('react-native-iphone-x-helper')
}

export default {
  mockPlatform,
  unmockPlatform,
  mockIphoneX,
  unmockIphoneX,
}
