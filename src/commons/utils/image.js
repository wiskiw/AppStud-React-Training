/**
 * Safty takes image by first URL from Spotify images array or return placeholder.
 */
// eslint-disable-next-line import/prefer-default-export
export const getSpotifyImage = (spotifyImages, placeholderImage) => {
  const isImagesExist = typeof spotifyImages !== 'undefined' && spotifyImages.length > 0

  return isImagesExist ? { uri: spotifyImages[0].url } : placeholderImage
}
