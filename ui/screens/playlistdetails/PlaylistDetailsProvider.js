import React from 'react';

import SpotifyApi from "../../../services/SpotifyApi";
import PlaylistsRepository from "../../../model/PlaylistsRepository";
import PlaylistDetailsController from "./PlaylistDetailsController";
import PlaylistDetailsViewModel from "./PlaylistDetailsViewModel";

/**
 * Provider class for creating and providing dependencies for {@link PlaylistDetailsController}
 */
export default class PlaylistDetailsProvider extends React.Component {

    _spotifyApi = new SpotifyApi();
    _playlistsRepository = new PlaylistsRepository(this._spotifyApi);
    _playlistDetailsViewModel = new PlaylistDetailsViewModel(this._playlistsRepository);

    render() {
        return (
            <PlaylistDetailsController
                viewModel={this._playlistDetailsViewModel}
                navigation={this.props.navigation}
            />
        );
    }

}
