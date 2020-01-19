/**
 * ViewModel for preparing playlist details data
 */
import UIUtils from "../../UIUtils";

const PLAYLIST_IMAGE_PLACEHOLDER = 'https://logomaster.ai/static/media/gallery002.936afb9d.png';
const TRACK_IMAGE_PLACEHOLDER = 'https://logomaster.ai/static/media/gallery002.936afb9d.png';

export default class PlaylistDetailsViewModel {

    constructor(playlistsRepository) {
        this._playlistsRepository = playlistsRepository;
    }

    async loadPlaylistDetails(playlistId) {
        const playlistData = await this._playlistsRepository.getPlaylistInfo(playlistId);

        const playlistDetails = {
            id: playlistData.id,
            name: playlistData.name,
            description: playlistData.description,
            imageUrl: UIUtils.getSpotifyImageUrl(playlistData.images, PLAYLIST_IMAGE_PLACEHOLDER),
            followers: playlistData.followers.total,
            ownerName: playlistData.owner.display_name,
            tracks: []
        };


        playlistData.tracks.items.forEach(rawTrack => {
            playlistDetails.tracks.push(this._getTrackDetails(rawTrack))
        });

        return playlistDetails;
    }

    _getTrackDetails(rawTrack) {
        const artists = [];
        rawTrack.track.artists.forEach(rawArtist => {
           artists.push(rawArtist.name)
        });

        return {
            id: rawTrack.track.id,
            name: rawTrack.track.name,
            url: rawTrack.track.external_urls.spotify,
            imageUrl: UIUtils.getSpotifyImageUrl(rawTrack.track.album.images, TRACK_IMAGE_PLACEHOLDER),
            artists: artists,
        }
    }

}
