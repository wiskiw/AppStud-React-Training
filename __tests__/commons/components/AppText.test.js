import React from 'react'
import { render } from 'react-native-testing-library'
import AppText from '../../../src/commons/components/AppText'

describe('AppText', () => {
  it('renders the correct text', () => {
    const { queryByText } = render(<AppText>Test</AppText>)
    expect(queryByText('Test')).not.toBeNull()
  })

  it('accepts user-provided styles', () => {
    const { queryByText } = render(<AppText style={[{ color: 'blue' }, { fontSize: 35 }]}>Test</AppText>)
    expect(queryByText('Test')).toHaveStyle({ color: 'blue', fontSize: 35 })
  })

  it('manages bold font', () => {
    const { queryByText } = render(<AppText style={{ fontWeight: 'bold' }}>Test</AppText>)
    expect(queryByText('Test')).toHaveStyle({ fontFamily: 'IBMPlexSans-Bold' })
  })

  it('manages italic font', () => {
    const { queryByText } = render(<AppText style={{ fontStyle: 'italic' }}>Test</AppText>)
    expect(queryByText('Test')).toHaveStyle({ fontFamily: 'IBMPlexSans-Italic' })
  })

  it('manages bold and italic font', () => {
    const { queryByText } = render(<AppText style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Test</AppText>)
    expect(queryByText('Test')).toHaveStyle({ fontFamily: 'IBMPlexSans-BoldItalic' })
  })

  it('uses right default font on iOS', () => {
    const { queryByText } = render(<AppText>Test</AppText>)
    expect(queryByText('Test')).toHaveStyle({ fontFamily: 'IBMPlexSans' })
  })

  it('fixes font weight and italic bug on android', () => {
    jest.mock('Platform', () => {
      const Platform = require.requireActual('Platform')
      Platform.OS = 'android'
      return Platform
    })

    const { queryByText } = render(<AppText style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Test</AppText>)
    expect(queryByText('Test')).toHaveStyle({ fontWeight: 'normal', fontStyle: 'normal' })
  })
})
