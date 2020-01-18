import React from "react";
import {StyleSheet, Text, ToastAndroid} from 'react-native';
import Layout from "../../constants/Layout";

/**
 * Controller for {@link TODO}
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

            isLoading: false,
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
        this._viewModel.loadPlaylistDetails(this._id)
            .then((playlistDetails) => {

                this._setPlaylistDetails(
                    playlistDetails.name,
                    playlistDetails.description,
                    playlistDetails.imageUrl,
                    playlistDetails.ownerName,
                    playlistDetails.followers,
                );

                console.log(JSON.stringify(playlistDetails));
            })
            .catch((error) => {
                console.log(error);
                ToastAndroid.show(error, 3000)

            })
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

    render() {
        return (
            <Text style={styles.title}>{this.state.name} {this.state.description}</Text>
        )
    }

}

const styles = StyleSheet.create({
    title: {
        fontSize: Layout.headerTextSize,
        fontWeight: "700",
        padding: Layout.paddingNormal
    }
});