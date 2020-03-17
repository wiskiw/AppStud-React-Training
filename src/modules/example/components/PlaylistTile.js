import React from 'react'
import PropTypes from 'prop-types'
import {
  View, Image, TouchableOpacity, StyleSheet,
} from 'react-native'

/**
 * Component for displaying playlist as a square tiles.
 */
const PlaylistTile = ({ playlist, onClick }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onClick}>
      <Image style={styles.image} source={playlist.image} />
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  image: {
    height: 200,
    width: 200,
  },
})

PlaylistTile.propTypes = {
  playlist: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  }).isRequired,
  onClick: PropTypes.func,
}

PlaylistTile.defaultProps = {
  onClick: () => {},
}

export default PlaylistTile
