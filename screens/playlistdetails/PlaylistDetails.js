import React from 'react';
import {FlatList, Image, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import Constants from 'expo-constants';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import TrackListItem from "../../components/TrackListItem";

/**
 * View component for displaying Playlist's tracks and details
 */
export default class FeaturedPlaylists extends React.Component {

    _showErrorToast(errorMessage) {
        ToastAndroid.show(errorMessage, ToastAndroid.LONG);
    }

    _decorateFollowers(followers) {
        // todo: add decoration for Millions

        const followersStr = followers >= 1000
            ? `${(followers / 1000).toFixed(1)}K`
            : `${followers}`;

        return `${followersStr} followers`
    }

    render() {
        const {
            name,
            description,
            imageUrl,
            ownerName,
            followers,
            tracks,

            error
        } = this.props;

        if (error) {
            this._showErrorToast(error);
        }

        const picture = {
            uri: imageUrl
        };

        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <Image
                        style={styles.headerImage}
                        source={picture}
                    />

                    <View style={styles.details}>
                        <View>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.author}>{`Playlist by ${ownerName}`}</Text>
                        </View>

                        <View>
                            <Text style={styles.description}>{description}</Text>
                            <Text style={styles.followers}>{this._decorateFollowers(followers)}</Text>
                        </View>
                    </View>

                </View>

                <FlatList
                    data={tracks}
                    renderItem={({item, index}) => (
                        <TrackListItem
                            name={item.name}
                            artists={item.artists.join(', ')}
                        />
                    )}
                    keyExtractor={(item, index) => item.id}
                />

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

    header: {
        flexDirection: 'row',
        marginTop: Layout.paddingLarge,
        marginBottom: Layout.paddingLarge,
        marginLeft: Layout.paddingNormal,
        marginRight: Layout.paddingNormal,
        justifyContent: "center"
    },

    headerImage: {
        flex: 1,
        aspectRatio: 1,
    },

    details: {
        justifyContent: 'space-between',
        flexDirection: 'column',
        flex: 2,
        marginLeft: Layout.paddingNormal,
    },

    name: {
        color: Colors.primaryText,
        fontSize: Layout.textSizeLarge,
    },

    author: {
        color: Colors.secondaryText,
        fontSize: Layout.textSizeNormal,
    },

    description: {
        color: Colors.primaryText,
        fontSize: Layout.textSizeNormal,
    },

    followers: {
        color: Colors.secondaryText,
        fontSize: Layout.textSizeNormal,
    },
});
