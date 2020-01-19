import React from "react";
import PlaylistDetails from "./PlaylistDetails";
import ProgressPanel from "../../components/ProgressPanel";

/**
 * Controller for {@link PlaylistDetails}. Store and control view's state.
 */
export default class PlaylistDetailsController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            imageUrl: "",
            ownerName: "",
            followers: 0,

            isLoading: true,
            error: null
        };

        this._viewModel = this.props.viewModel;
        this._navigator = this.props.navigation;
        this._id = this._navigator.getParam('playlistId', '');
    }

    componentDidMount() {
        this._loadPlaylistDetails();
    }


    _loadPlaylistDetails() {
        this._changeLoadingState(true);
        this._viewModel.loadPlaylistDetails(this._id)
            .then((playlistDetails) => {

                this._setPlaylistDetails(
                    playlistDetails.name,
                    playlistDetails.description,
                    playlistDetails.imageUrl,
                    playlistDetails.ownerName,
                    playlistDetails.followers,
                );
                this._setTracks(playlistDetails.tracks);

                this._changeLoadingState(false);
            })
            .catch((error) => {
                console.log(error);
                this._changeError(error);
                this._changeLoadingState(false);
            })
    }

    _changeLoadingState(isLoading) {
        this.setState({
            isLoading: isLoading,
        });
    }

    _setPlaylistDetails(name, description, imageUrl, ownerName, followers) {
        this.setState({
            name: name,
            description: description,
            imageUrl: imageUrl,
            ownerName: ownerName,
            followers: followers,
        });
    }

    _setTracks(tracks) {
        this.setState({
            tracks: tracks,
        });
    }

    render() {
        if (this.state.isLoading) {
            return (<ProgressPanel/>)
        } else {
            return (
                <PlaylistDetails
                    name={this.state.name}
                    description={this.state.description}
                    imageUrl={this.state.imageUrl}
                    owner={this.state.owner}
                    followers={this.state.followers}
                    tracks={this.state.tracks}
                />
            )
        }
    }

}
