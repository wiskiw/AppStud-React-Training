import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ToastAndroid
} from 'react-native';
import Constants from 'expo-constants';

import PlaylistsProvider from "./PlaylistsProvider";
import PlaylistTile from '../components/PlaylistTile';

const COLUMNS_NUM = 2;
const PLAYLIST_LOAD_LIMIT = 6;

export default class FeaturedPlaylists extends React.Component {

    state = {
        offset: 0,
        playlists: [],
        isLoading: false,
    };

    _playlistsModel = new PlaylistsProvider();


    loadUsers = () => {
        const {playlists, offset} = this.state;

        this.setState({
            isLoading: true
        });


        this._playlistsModel.getAll(offset, PLAYLIST_LOAD_LIMIT)
            .then(data => {
                this.setState({
                    playlists: offset === 0 ? data : [...playlists, ...data],
                });
            })
            .catch((error) => {
                ToastAndroid.show(`error: ${error}`, ToastAndroid.SHORT);
                this.setState({
                    isLoading: false,
                });
            });
    };

    _handleLoadMore = () => {
        this.setState({
            offset: this.state.offset + PLAYLIST_LOAD_LIMIT
        }, () => {
            this.loadUsers();
        });
    };

    componentDidMount() {
        this.loadUsers();
    };

    render() {
        const {playlists, isLoading} = this.state;

        return (
            <View style={styles.container}>
                {
                    playlists &&
                    <FlatList
                        numColumns={COLUMNS_NUM}
                        data={playlists}
                        renderItem={({item, index}) => (
                            <PlaylistTile playlist={item}/>
                        )}
                        keyExtractor={(item, index) => item.id}
                        refreshing={isLoading}
                        onEndReached={this._handleLoadMore}
                        onEndThreshold={0.3}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
});
