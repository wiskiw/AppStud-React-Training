import ServerApi from "../services/ServerApi";

/**
 * Class for providing Playlists and localising fetch-data exceptions.
 *
 * todo: implement data caching
 */
export default class PlaylistsProvider {

    _serverApi = new ServerApi();

    /**
     * Return promise to fetch all playlists since #offset and limited by #limit.
     */
    async getAll(offset, limit) {
        let playlists;
        try {
            playlists = await this._serverApi.getPlaylists(offset, limit);
            return playlists.playlists.items

        } catch (errorCode) {
            return `Error occupied while getting playlists (code ${errorCode}). Try again later.`;
        }
    }

}