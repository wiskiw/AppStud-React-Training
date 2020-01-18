import React from 'react'
import PlaylistsRepository from "../../model/PlaylistsRepository";
import PlaylistsController from "./PlaylistsController";
import PlaylistsViewModel from "./PlaylistsViewModel";
import SpotifyApi from "../../services/SpotifyApi";

export default class FeaturedPlaylistsProvider extends React.Component {

    _spotifyApi = new SpotifyApi();
    _playlistsRepository = new PlaylistsRepository(this._spotifyApi);
    _playlistsViewModel = new PlaylistsViewModel(this._playlistsRepository);

    render() {
        return (
            <PlaylistsController
                viewModel={this._playlistsViewModel}
                navigation={this.props.navigation}
            />
        )
    }
}
