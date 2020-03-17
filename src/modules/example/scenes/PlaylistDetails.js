import React, { useState, useEffect } from 'react'
import {
  FlatList, Image, StyleSheet, Text, View,
} from 'react-native'
import Toast from 'react-native-simple-toast'

import API from '../../../api/api'
import i18n from '../../../i18n/i18n'
import { getSpotifyImage } from '../../../commons/utils/image'
import { getNavigationPropTypes } from '../../../commons/utils/navigation'
import DefaultTheme from '../../../themes/default'
import ProgressPanel from '../components/ProgressPanel'
import TrackListItem from '../components/TrackListItem'

const PLAYLIST_PLACEHOLDER = require('../assets/images/placeholder.png')

const PlaylistDetails = ({ navigation }) => {
  const [details, setDetails] = useState()
  const [isLoading, changeLoadingState] = useState(false)

  const playlistId = navigation.getParam('playlistId')

  useEffect(() => {
    loadDetails(playlistId)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadDetails = (id) => {
    API.getPlaylistDetails(id)
      .then((playlistDetails) => setDetails(playlistDetails))
      .catch(() => Toast.show(i18n.t('screens.playlistsDetails.loadingFailed'), Toast.LONG))
      .then(() => changeLoadingState(false))
  }

  const decorateFollowers = (followers) => {
    const followersStr = followers >= 1000 ? `${(followers / 1000).toFixed(1)}K` : `${followers}`

    return `${followersStr} followers`
  }

  const renderContent = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.headerImage}
          source={getSpotifyImage(details.images, PLAYLIST_PLACEHOLDER)}
        />
        <View style={styles.details}>
          <View>
            <Text style={styles.name}>{details.name}</Text>
            <Text
              style={styles.author}
            >{`Playlist by ${details.ownerName}`}
            </Text>
          </View>

          <View>
            <Text style={styles.description}>{details.description}</Text>
            <Text style={styles.followers}>
              {decorateFollowers(details.followers)}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={details.tracks}
        renderItem={({ item }) => (
          <TrackListItem name={item.name} artists={item.artists.join(', ')} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  )

  return details && !isLoading ? renderContent() : <ProgressPanel />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DefaultTheme.color.background,
    // PaddingTop: Constants.statusBarHeight,
  },

  header: {
    flexDirection: 'row',
    marginTop: DefaultTheme.padding.large,
    marginBottom: DefaultTheme.padding.large,
    marginLeft: DefaultTheme.padding.normal,
    marginRight: DefaultTheme.padding.normal,
    justifyContent: 'center',
  },

  headerImage: {
    flex: 1,
    aspectRatio: 1,
  },

  details: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 2,
    marginLeft: DefaultTheme.padding.normal,
  },

  name: {
    color: DefaultTheme.text.color.primary,
    fontSize: DefaultTheme.text.size.normal,
  },

  author: {
    color: DefaultTheme.text.color.secondary,
    fontSize: DefaultTheme.text.size.small,
  },

  description: {
    color: DefaultTheme.text.color.primary,
    fontSize: DefaultTheme.text.size.small,
  },

  followers: {
    color: DefaultTheme.text.color.secondary,
    fontSize: DefaultTheme.text.size.small,
  },
})

PlaylistDetails.navigationOptions = {
  headerShown: false,
}

PlaylistDetails.propTypes = {
  ...getNavigationPropTypes(),
}

export default PlaylistDetails
