/**
 * Class for providing Playlists. Defines the data source (depending on network conditions ex.).
 */
export default class PlaylistsRepository {

    constructor(spotifyApi) {
        this._spotifyApi = spotifyApi;
    }

    /**
     * Return promise to fetch featured playlists since #offset and limited by #limit.
     */
    async getFeaturedPlaylists(offset, limit) {
        let playlists;
        try {
            playlists = await this._spotifyApi.getFeaturedPlaylists(offset, limit);
            return {
                message: playlists.message,
                playlists: playlists.playlists.items
            }

        } catch (errorCode) {
            return Error(`Playlists request failed (code ${errorCode}). Try again later.`);
        }
    }

    /**
     * Return promise to load playlist details by ID
     *
     * @param id playlist id
     * @returns {Promise<string|*>} promise or error message
     */
    async getPlaylistInfo(id) {
        try {
            return await this._spotifyApi.getPlaylistInfo(id);
        } catch (errorCode) {
            return Error(`Unable to load playlist details (code ${errorCode}). Try again later.`);
        }
    }

}