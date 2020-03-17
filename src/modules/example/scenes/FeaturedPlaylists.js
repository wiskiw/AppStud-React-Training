import React, { useState, useEffect } from 'react'
import { NavigationActions } from 'react-navigation'
import {
  FlatList, StyleSheet, Text, View,
} from 'react-native'
import Toast from 'react-native-simple-toast'

import i18n from '../../../i18n/i18n'
import API from '../../../api/api'
import { getSpotifyImage } from '../../../commons/utils/image'
import { getNavigationPropTypes } from '../../../commons/utils/navigation'
import DefaultTheme from '../../../themes/default'
import PlaylistTile from '../components/PlaylistTile'
import ProgressPanel from '../components/ProgressPanel'

const COLUMNS_NUM = 2
const LIST_END_THRESHOLD = 0
const PLAYLIST_LOAD_LIMIT = 6
const PLAYLIST_IMAGE_PLACEHOLDER = require('../assets/images/placeholder.png')

/**
 * Screen component for displaying list of Playlists.
 */
const FeaturedPlaylists = ({ navigation }) => {
  const [title, setTitle] = useState(i18n.t('screens.featuredPlaylists.title'))
  const [isLoading, changeLoadingState] = useState(false)
  const [playlists, setPlaylists] = useState([])

  useEffect(() => {
    showDetails.bind(this)
    loadPlaylists()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadPlaylists = () => {
    changeLoadingState(true)
    API.getFeaturedPlaylists(playlists.length, PLAYLIST_LOAD_LIMIT)
      .then((featuredPlaylists) => {
        setTitle(featuredPlaylists.message)

        const newPlaylists = featuredPlaylists.playlists.items
        setPlaylists([...playlists, ...newPlaylists])
      })
      .catch(() => Toast.show(
        i18n.t('screens.featuredPlaylists.loadingFailed'),
        Toast.LONG
      ))
      .then(() => changeLoadingState(false))
  }

  const showDetails = (playlist) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'Details',
      params: {
        playlistId: playlist.id,
      },
    })
    navigation.dispatch(navigateAction)
  }

  if (isLoading && playlists.length === 0) {
    return <ProgressPanel />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={playlists}
        numColumns={COLUMNS_NUM}
        ListHeaderComponent={(
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <PlaylistTile
            playlist={{
              id: item.id,
              image: getSpotifyImage(item.images, PLAYLIST_IMAGE_PLACEHOLDER),
            }}
            onClick={() => showDetails(item)}
          />
        )}
        keyExtractor={(playlist) => playlist.id}
        refreshing={isLoading}
        onEndReached={loadPlaylists}
        onEndThreshold={LIST_END_THRESHOLD}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.color.background,
  },
  titleContainer: {
    height: DefaultTheme.dimens.headerSize,
    justifyContent: 'center',
  },

  title: {
    fontSize: DefaultTheme.text.size.large,
    fontWeight: '700',
    color: DefaultTheme.text.color.primary,
    paddingLeft: DefaultTheme.padding.normal,
  },
})

FeaturedPlaylists.navigationOptions = {
  headerShown: false,
}

FeaturedPlaylists.propTypes = {
  ...getNavigationPropTypes(),
}

export default FeaturedPlaylists
