/**
 * Spotify server API implementation
 */
import NetworkService from "./NetworkService";
import {API} from "../index";

export default class SpotifyApi {

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
        const url = `${this._buildBaseApiUrl()}/playlists/${id}`;

        const fieldsQuery = "id, name, description, owner, images, followers, tracks";
        const params = {
            'fields': fieldsQuery
        };

        return NetworkService.get(url, params);
    }

}