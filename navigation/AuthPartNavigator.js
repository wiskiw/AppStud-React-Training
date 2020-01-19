import React from 'react';
import {createStackNavigator} from 'react-navigation';

import FeaturedPlaylistsProvider from "../ui/screens/featureplaylists/FeaturedPlaylistsProvider";
import PlaylistDetailsProvider from "../ui/screens/playlistdetails/PlaylistDetailsProvider";


export default createStackNavigator({

        Playlists: {
            screen: FeaturedPlaylistsProvider,
            navigationOptions: ({navigation}) => ({
                header: null
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
