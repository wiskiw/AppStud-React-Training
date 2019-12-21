/**
 * Class for providing Playlists. Defines the data source (depending on network conditions ex.).
 *
 * todo: implement data caching here
 */
export default class PlaylistsRepository {

    constructor(serverApi) {
        this._serverApi = serverApi;
    }

    /**
     * Return promise to fetch all playlists since #offset and limited by #limit.
     */
    async getAll(offset, limit) {
        let playlists;
        try {
            playlists = await this._serverApi.getPlaylists(offset, limit);
            return playlists.playlists.items

        } catch (errorCode) {
            return `Playlists request failed (code ${errorCode}). Try again later.`;
        }
    }

}