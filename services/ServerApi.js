/**
 * Server API implementation
 */
import NetworkService from "./NetworkService";
import {API} from "../index";

export default class ServerApi {

    constructor() {
        this._apiBase = API.BASE;
        this._apiVersion = API.VERSION;
    }

    _buildBaseApiUrl() {
        return `${this._apiBase}/v${this._apiVersion}`
    }

    async getPlaylists(offset, limit) {
        const url = `${this._buildBaseApiUrl()}/browse/featured-playlists`;
        const params = {
            'offset': offset,
            'limit': limit
        };

        return NetworkService.get(url, params);
    };

    async getPlaylistInfo(id) {
        throw Error("Not implemented!")
        // todo
        // `GET https://afternoon-waters-49321.herokuapp.com/v1/playlists/[PLAYLIST_ID]`
    }

}