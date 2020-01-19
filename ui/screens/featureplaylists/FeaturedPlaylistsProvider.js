import React from 'react'
import PlaylistsRepository from "../../../model/PlaylistsRepository";
import FeaturedPlaylistsController from "./FeaturedPlaylistsController";
import FeaturedPlaylistsViewModel from "./FeaturedPlaylistsViewModel";
import SpotifyApi from "../../../services/SpotifyApi";

export default class FeaturedPlaylistsProvider extends React.Component {

    _spotifyApi = new SpotifyApi();
    _playlistsRepository = new PlaylistsRepository(this._spotifyApi);
    _playlistsViewModel = new FeaturedPlaylistsViewModel(this._playlistsRepository);

    render() {
        return (
            <FeaturedPlaylistsController
                viewModel={this._playlistsViewModel}
                navigation={this.props.navigation}
            />
        )
    }
}
