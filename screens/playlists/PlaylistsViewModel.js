/**
 * ViewModel for fetching and modifying Playlists
 *
 * todo: Combining multiple data sources must implement here
 */

const PLAYLIST_IMAGE_PLACEHOLDER = 'https://logomaster.ai/static/media/gallery002.936afb9d.png';

export default class PlaylistsViewModel {

    constructor(playlistsRepository) {
        this._playlistsRepository = playlistsRepository;
    }

    async loadPlaylists(offset, limit) {
        const playlists = [];
        const rawPlaylists = await this._playlistsRepository.getAll(offset, limit);

        rawPlaylists.forEach(rawPlaylist => {
            const isImagesExist = typeof rawPlaylist.images !== 'undefined' && rawPlaylist.images.length > 0;
            const imageUrl = isImagesExist
                ? rawPlaylist.images[0].url
                : PLAYLIST_IMAGE_PLACEHOLDER;

            playlists.push({
                id: rawPlaylist.id,
                imageUrl: imageUrl,
                name: rawPlaylist.name,
                description: rawPlaylist.description,
            })
        });

        if (playlists.length === 0) {
            throw Error("No playlists available");
        }

        return playlists;
    }

}
