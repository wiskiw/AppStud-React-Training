import React from 'react'
import FeaturedPlaylists from "./FeaturedPlaylists";

const PLAYLIST_LOAD_LIMIT = 6;

/**
 * Controller for {@link FeaturedPlaylists}
 */
export default class PlaylistsController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            offset: 0,
            playlists: [],
            isLoading: false,
            error: null,
            isEndReached: false,
        };

        this._viewModel = this.props.viewModel;
        this._navigator = this.props.navigator;

    }

    componentDidMount() {
        this._loadPlaylists();
    };


    onPlaylistClick(playlist) {
        // todo start details
        // this._navigator.navigate('PlaylistDetails', {playlist: playlist});
    }

    loadMorePlaylists = () => {
        if (!this.state.isEndReached) {
            this.setState({
                offset: this.state.offset + PLAYLIST_LOAD_LIMIT
            }, () => {
                this._loadPlaylists();
            });
        }
    };

    _loadPlaylists = () => {
        this._changeLoadingState(true);
        this._changeError(null);

        this._viewModel.loadPlaylists(this.state.offset, PLAYLIST_LOAD_LIMIT)
            .then(newPlaylists => {
                this._changeLoadingState(false);
                this._setIsEndReached(newPlaylists.length === 0);
                this._appendPlaylists(newPlaylists);
            })
            .catch((error) => {
                this._changeLoadingState(false);
                this._changeError(error);
            });
    };

    _appendPlaylists(newPlaylists) {
        this.setState({
            playlists: this.state.offset === 0 ? newPlaylists : [...this.state.playlists, ...newPlaylists],
        });
    }

    _changeLoadingState(isLoading) {
        this.setState({
            isLoading: isLoading,
        });
    }

    _changeError(error) {
        this.setState({
            error: error,
        });
    }

    _setIsEndReached(isEndReached) {
        this.setState({
            isEndReached: isEndReached,
        });
    }

    render() {
        return (
            <FeaturedPlaylists
                isLoading={this.state.isLoading}
                playlists={this.state.playlists}

                loadMorePlaylists={this.loadMorePlaylists}
                onPlaylistClick={this.onPlaylistClick}
            />
        )
    }

}
