import platformTestUtils from '../../testutils/platform'


describe('platform utils', () => {
  describe('android', () => {
    beforeEach(() => {
      platformTestUtils.mockPlatform('android')
    })

    afterEach(() => {
      platformTestUtils.unmockPlatform()
    })

    it('checks if platform is android', () => {
      const { IS_IOS, IS_ANDROID } = require('../../../src/commons/utils/platform')

      expect(IS_IOS).toBeFalse()
      expect(IS_ANDROID).toBeTrue()
    })
  })

  describe('iOS', () => {
    beforeEach(() => {
      platformTestUtils.mockPlatform('ios')
    })

    afterEach(() => {
      platformTestUtils.unmockPlatform()
      platformTestUtils.unmockIphoneX()
    })

    it('checks if platform is iOS', () => {
      const { IS_IOS, IS_ANDROID } = require('../../../src/commons/utils/platform')
      expect(IS_IOS).toBeTrue()
      expect(IS_ANDROID).toBeFalse()
    })

    it('checks if platform is not iPhoneX', () => {
      const { IS_IOS, IS_IPHONE_X } = require('../../../src/commons/utils/platform')
      expect(IS_IOS).toBeTrue()
      expect(IS_IPHONE_X).toBeFalse()
    })

    it('checks if platform is iPhoneX', () => {
      platformTestUtils.mockIphoneX()
      const { IS_IOS, IS_IPHONE_X } = require('../../../src/commons/utils/platform')
      expect(IS_IOS).toBeTrue()
      expect(IS_IPHONE_X).toBeTrue()
    })

    it('checks iphone status bar height for iPhone', () => {
      const { IS_IOS, IS_IPHONE_X, IPHONE_STATUSBAR_HEIGHT } = require('../../../src/commons/utils/platform')
      expect(IS_IOS).toBeTrue()
      expect(IS_IPHONE_X).toBeFalse()
      expect(IPHONE_STATUSBAR_HEIGHT).toBe(20)
    })

    it('checks iphone status bar height for iPhoneX', () => {
      platformTestUtils.mockIphoneX()
      const { IS_IOS, IS_IPHONE_X, IPHONE_STATUSBAR_HEIGHT } = require('../../../src/commons/utils/platform')
      expect(IS_IOS).toBeTrue()
      expect(IS_IPHONE_X).toBeTrue()
      expect(IPHONE_STATUSBAR_HEIGHT).toBe(40)
    })
  })
})
