import UIUtils from "../../UIUtils";

const PLAYLIST_IMAGE_PLACEHOLDER = 'https://logomaster.ai/static/media/gallery002.936afb9d.png';

/**
 * ViewModel for preparing Playlists
 */
export default class FeaturedPlaylistsViewModel {

    constructor(playlistsRepository) {
        this._playlistsRepository = playlistsRepository;
    }

    async loadFeaturedPlaylists(offset, limit) {
        const playlists = [];
        const playlistsData = await this._playlistsRepository.getFeaturedPlaylists(offset, limit);

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
            imageUrl: UIUtils.getSpotifyImageUrl(rawPlaylist.images, PLAYLIST_IMAGE_PLACEHOLDER),
            name: rawPlaylist.name,
            description: rawPlaylist.description,
        }
    }

}
