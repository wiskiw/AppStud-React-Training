import React from 'react';
import {createStackNavigator} from 'react-navigation';

import FeaturedPlaylistsProvider from "../screens/playlists/FeaturedPlaylistsProvider";
import PlaylistDetailsProvider from "../screens/playlistdetails/PlaylistDetailsProvider";


export default createStackNavigator({

        Playlists: {
            screen: FeaturedPlaylistsProvider,
            navigationOptions: ({navigation}) => ({
                header: null,
                // title: `${navigation.state.params.name}'s Profile'`,
            }),
        },

        PlaylistDetails: {
            screen: PlaylistDetailsProvider,
            navigationOptions: ({navigation}) => ({
                header: null
            }),
        }

    }, {
        initialRouteName: 'Playlists'
    }
);
