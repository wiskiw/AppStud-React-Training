import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'
import DefaultTheme from '../../../themes/default'

/**
 * Component for displaying single track in a list.
 */
const TrackListItem = ({ name, artists }) => (
  <View style={styles.container}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.artists}>{artists}</Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: DefaultTheme.color.background,
    margin: DefaultTheme.padding.small,
  },
  name: {
    fontSize: DefaultTheme.text.size.normal,
    color: DefaultTheme.text.color.primary,
  },
  artists: {
    fontSize: DefaultTheme.text.size.small,
    color: DefaultTheme.text.color.secondary,
    marginTop: DefaultTheme.padding.small,
  },
})

TrackListItem.propTypes = {
  name: PropTypes.string.isRequired,
  artists: PropTypes.string.isRequired,
}

export default TrackListItem
