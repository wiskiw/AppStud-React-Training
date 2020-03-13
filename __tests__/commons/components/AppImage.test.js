import React from 'react'
import { render, waitForElement } from 'react-native-testing-library'
import AppImage from '../../../src/commons/components/AppImage'

describe('AppImage', () => {
  it('accepts user-provided styles', () => {
    const { queryByTestId } = render(
      <AppImage
        source={require('../../data/appimage.png')}
        style={{ backgroundColor: 'blue', marginBottom: 35 }}
      />
    )
    expect(queryByTestId('image')).toHaveStyle({ backgroundColor: 'blue', marginBottom: 35 })
  })

  it('accepts user-provided styles array', () => {
    const { queryByTestId } = render(
      <AppImage
        source={require('../../data/appimage.png')}
        style={[{ backgroundColor: 'blue' }, { marginBottom: 35 }]}
      />
    )
    expect(queryByTestId('image')).toHaveStyle({ backgroundColor: 'blue', marginBottom: 35 })
  })

  it('resizes image without keeping ratio (width + height)', async () => {
    const { queryByTestId } = render(
      <AppImage
        source={require('../../data/appimage.png')}
        height={5}
        width={12}
      />
    )

    await waitForElement(() => expect(queryByTestId('image')).toHaveStyle({ width: 12, height: 5 }))
  })

  // Cannot test resizing properly because jest mocks all images.
})
