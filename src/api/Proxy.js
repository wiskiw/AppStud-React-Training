import i18n from 'i18n-js'
import axios from 'axios'
import AxiosLogger from 'axios-logger'

/**
 * Backend api should be proxied via one or more classes so the code elsewhere should
 * not have to directly make network calls to the backend.
 */
export default class Proxy {
  constructor(apiEndpoint, debugMode) {
    // Transform truthy / falsy values.
    this.debugMode = !!debugMode

    this.axios = axios.create({
      baseURL: apiEndpoint,
      timeout: 2000,
      headers: Proxy.getCommonHeaders(),
    })

    if (debugMode === 'true') {
      this.axios.interceptors.request.use(AxiosLogger.requestLogger)
      this.axios.interceptors.response.use(AxiosLogger.responseLogger)
    }
  }

  /**
   * Returns common headers to send for all api requests.
   *
   * @returns {{'content-type': string, 'Accept-Language': (string|string|*)}}
   *   The headers to use for all requests to the api.
   */
  static getCommonHeaders() {
    return {
      'content-type': 'application/json',
      'Accept-Language': i18n.locale,
    }
  }

  statusNotOk = (response) => {
    const error = Error(`Status: ${response.status}`)
    console.error(error)
    throw error
  }

  onError = (error) => {
    console.error(error)
    throw error
  }

  /**
   * Returns promise to load list of featured playlists.
   *
   * @param offset
   * @param limit
   * @returns {Promise<{
   *  message: String,
   *  playlists: [{
   *    id : String,
   *    image: HTMLCollectionOf<HTMLImageElement>,
   *  }]
   * }>}
   */
  getFeaturedPlaylists = async (offset, limit) => {
    try {
      const response = await this.axios.get('/browse/featured-playlists', {
        params: {
          offset,
          limit,
        },
      })

      if (response.status !== 200) {
        return this.statusNotOk(response)
      }

      return response.data
    } catch (error) {
      return this.onError(error)
    }
  }

  /**
   * Returns promise to load Playlist details.
   *
   * @param id Playlist's ID
   * @returns {Promise<{
   *  images: HTMLCollectionOf<HTMLImageElement>,
   *  followers: Number,
   *  ownerName: String,
   *  name: String,
   *  description: String,
   *  id: String,
   *  tracks: [{
   *    id: String,
   *    name: String,
   *    url: String,
   *    artists: [String],
   *  }]
   * }>}
   */
  getPlaylistDetails = async (id) => {
    try {
      const response = await this.axios.get(`playlists/${id}`, {
        params: {
          fields: 'id, name, description, images, owner, followers, tracks',
        },
      })

      if (response.status !== 200) {
        return this.statusNotOk(response)
      }

      const playlistData = response.data
      const playlistDetails = {
        id: playlistData.id,
        name: playlistData.name,
        description: playlistData.description,
        images: playlistData.images,
        followers: playlistData.followers.total,
        ownerName: playlistData.owner.display_name,
        tracks: [],
      }

      const getTrackDetails = (rawTrack) => {
        const artists = []
        rawTrack.track.artists.forEach((rawArtist) => artists.push(rawArtist.name))
        return {
          id: rawTrack.track.id,
          name: rawTrack.track.name,
          url: rawTrack.track.external_urls.spotify,
          artists,
        }
      }

      playlistData.tracks.items.forEach((rawTrack) => {
        playlistDetails.tracks.push(getTrackDetails(rawTrack))
      })

      return playlistDetails
    } catch (error) {
      return this.onError(error)
    }
  }
}
