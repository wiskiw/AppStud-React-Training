import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import navigationService from './navigationService'
import FeaturedPlaylists from '../modules/example/scenes/FeaturedPlaylists'
import PlaylistDetails from '../modules/example/scenes/PlaylistDetails'

const RootStack = createStackNavigator(
  {
    Main: {
      screen: FeaturedPlaylists,
    },
    Details: {
      screen: PlaylistDetails,
    },
  },
  {
    initialRouteName: 'Main',
  }
)

const AppContainer = createAppContainer(RootStack)

// Replace myapp by a unique identifier for your app.
// The https part is for Universal linking / App link.
// The custom scheme is for "traditional" deep linking.
const URI_PREFIX = /https:\/\/app.myapp.com\/|myapp:\/\//

export default () => (
  <AppContainer
    uriPrefix={URI_PREFIX}
    ref={(navigatorRef) => {
      navigationService.setTopLevelNavigator(navigatorRef)
    }}
  />
)
