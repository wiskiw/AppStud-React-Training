import Proxy from '../../src/api/Proxy'

describe('API', () => {
  describe('Proxy constructor', () => {
    it('initializes correctly', () => {
      const proxy = new Proxy('http://google.com', false)
      expect(proxy.axios.defaults.baseURL).toBe('http://google.com')
      expect(proxy.axios.defaults.timeout).toBe(2000)
      expect(proxy.axios.defaults.headers).toBeObject()
      expect(proxy.axios.defaults.headers['content-type']).toBe('application/json')
      expect(proxy.axios.defaults.headers['Accept-Language']).toBe('en')
    })

    it('initializes correctly in debug mode', () => {
      const proxy = new Proxy('http://google.com', 'true')
      expect(proxy.debugMode).toBeTrue()
    })
  })
})
