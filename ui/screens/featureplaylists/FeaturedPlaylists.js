import React from 'react';
import {FlatList, StyleSheet, Text, ToastAndroid, View,} from 'react-native';
import Constants from 'expo-constants';

import Colors from '../../../constants/Colors';
import Layout from '../../../constants/Layout';
import PlaylistTile from '../../components/PlaylistTile';

const COLUMNS_NUM = 2;
const LIST_END_THRESHOLD = 0;

/**
 * View component for displaying list of Playlists
 */
export default class FeaturedPlaylists extends React.Component {

    _showEndReachedToast() {
        ToastAndroid.show(`No more playlists`, ToastAndroid.SHORT);
    }

    _showErrorToast(errorMessage) {
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }

    _renderHeader = (title) => {
        return (
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    };

    render() {
        const {
            title,
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
                    <FlatList
                        ListHeaderComponent={this._renderHeader(title)}
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
                        onEndThreshold={LIST_END_THRESHOLD}
                    />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: Constants.statusBarHeight,
    },

    titleContainer: {
        height: Layout.headerSize,
        justifyContent: "center"
    },

    title: {
        fontSize: Layout.headerTextSize,
        fontWeight: "700",
        color: Colors.primaryText,
        paddingLeft: Layout.paddingNormal
    }
});
