import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ToastAndroid,
} from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

import PlaylistTile from '../../components/PlaylistTile';

const COLUMNS_NUM = 2;

/**
 * View component for displaying list of Playlists
 */
export default class FeaturedPlaylists extends React.Component {

    static propTypes = {
        playlists: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired,

        loadMorePlaylists: PropTypes.func,
        onPlaylistClick: PropTypes.func.isRequired,
    };

    _showEndReachedToast() {
        ToastAndroid.show(`No more playlists`, ToastAndroid.SHORT);
    }

    _showErrorToast(errorMessage) {
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }

    render() {
        const {
            playlists,
            isLoading,
            error,
            isEndReached,
            loadMorePlaylists,
            onPlaylistClick
        } = this.props;

        if (error) {
            this._showErrorToast(error);
        }

        if (isEndReached) {
            this._showEndReachedToast(error);
        }

        return (
            <View style={styles.container}>
                {
                    playlists &&
                    <FlatList
                        numColumns={COLUMNS_NUM}
                        data={playlists}
                        renderItem={({item, index}) => (
                            <PlaylistTile
                                playlist={item}
                                onPress={() => onPlaylistClick(item)}
                            />
                        )}
                        keyExtractor={(item, index) => item.id}
                        refreshing={isLoading}
                        onEndReached={loadMorePlaylists}
                        onEndThreshold={0}
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
