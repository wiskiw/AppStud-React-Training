import { capitalize, isValidEmail } from '../../../src/commons/utils/strings'

describe('strings utils', () => {
  describe('capitalize', () => {
    it('capitalises a string', () => {
      const capitalized = capitalize('test')
      expect(capitalized).toBe('Test')
      expect(capitalized).not.toBe('test')
    })

    it('returns an empty string if param is not a string', () => {
      const capitalized = capitalize({ test: true })
      expect(capitalized).toBe('')
    })
  })

  describe('isValidEmail', () => {
    it('checks if an email is valid', () => {
      // Valid emails.
      const email1IsValid = isValidEmail('test@test.com')
      const email2IsValid = isValidEmail('test+test@test.com')
      const email3IsValid = isValidEmail('t@t.t')
      const email4IsValid = isValidEmail('tEsT@TeSt.FR')

      // Invalid emails.
      const email5IsValid = isValidEmail('test@test@com')
      const email6IsValid = isValidEmail('')
      const email7IsValid = isValidEmail('test')
      const email8IsValid = isValidEmail('@test.com')

      expect(email1IsValid).toBeTrue()
      expect(email2IsValid).toBeTrue()
      expect(email3IsValid).toBeTrue()
      expect(email4IsValid).toBeTrue()
      expect(email5IsValid).toBeFalse()
      expect(email6IsValid).toBeFalse()
      expect(email7IsValid).toBeFalse()
      expect(email8IsValid).toBeFalse()
    })
  })
})
