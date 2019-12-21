import React from 'react'
import PlaylistsRepository from "../../model/PlaylistsRepository";
import PlaylistsController from "./PlaylistsController";
import PlaylistsViewModel from "./PlaylistsViewModel";
import ServerApi from "../../services/ServerApi";

export default class FeaturedPlaylistsProvider extends React.Component {

    _serverApi = new ServerApi();
    _playlistsRepository = new PlaylistsRepository(this._serverApi);
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
