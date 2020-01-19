import Utils from "../Utils";

const PLAYLIST_IMAGE_PLACEHOLDER = 'https://logomaster.ai/static/media/gallery002.936afb9d.png';

/**
 * ViewModel for preparing Playlists
 */
export default class PlaylistsViewModel {

    constructor(playlistsRepository) {
        this._playlistsRepository = playlistsRepository;
    }

    async loadPlaylistsMeta(offset, limit) {
        const playlists = [];
        const playlistsData = await this._playlistsRepository.getRange(offset, limit);

        playlistsData.playlists.forEach(rawPlaylist => {
            playlists.push(this._getPlaylist(rawPlaylist))
        });

        return {
            title: playlistsData.message,
            playlists: playlists
        };
    }

    _getPlaylist(rawPlaylist) {
        return {
            id: rawPlaylist.id,
            imageUrl: Utils.getSpotifyImageUrl(rawPlaylist.images, PLAYLIST_IMAGE_PLACEHOLDER),
            name: rawPlaylist.name,
            description: rawPlaylist.description,
        }
    }

}
