import React from 'react'
import FeaturedPlaylists from "./FeaturedPlaylists";
import ProgressPanel from "../../components/ProgressPanel";

const PLAYLIST_LOAD_LIMIT = 6;

/**
 * Controller for {@link FeaturedPlaylists}
 */
export default class FeaturedPlaylistsController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            offset: 0,
            playlists: [],
            isLoading: false,
            error: null,
            isEndReached: false,
        };

        this._viewModel = this.props.viewModel;
        this._navigator = this.props.navigation;

        this.onPlaylistClick = this.onPlaylistClick.bind(this);
    }

    componentDidMount() {
        this._loadPlaylists();
    };


    onPlaylistClick(playlist) {
        this._navigator.navigate("PlaylistDetails", {playlistId: playlist.id});
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

    _loadPlaylists() {
        this._changeLoadingState(true);
        this._changeError(null);

        this._viewModel.loadFeaturedPlaylists(this.state.offset, PLAYLIST_LOAD_LIMIT)
            .then(playlistsMeta => {
                this._setTitle(playlistsMeta.title);
                this._setIsEndReached(playlistsMeta.playlists.length === 0);
                this._appendPlaylists(playlistsMeta.playlists);
                this._changeLoadingState(false);

            })
            .catch((error) => {
                console.log(error);
                this._changeError(error);
                this._changeLoadingState(false);
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

    _setTitle(title) {
        this.setState({
            title: title,
        });
    }

    render() {
        if (this.state.playlists.length === 0 && this.state.isLoading) {
            return (<ProgressPanel/>)
        } else {
            return (
                <FeaturedPlaylists
                    title={this.state.title}
                    playlists={this.state.playlists}
                    isLoading={this.state.isLoading}

                    loadMorePlaylists={this.loadMorePlaylists}
                    onPlaylistClick={this.onPlaylistClick}
                />
            )
        }
    }

}
