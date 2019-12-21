import React from 'react';
import {
    createStackNavigator
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import FeaturedPlaylistsProvider from "../screens/playlists/FeaturedPlaylistsProvider";


export default createStackNavigator({

    // todo remove home screen
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    },

    Playlists: {
        screen: FeaturedPlaylistsProvider,
        navigationOptions: ({navigation}) => ({
            header: null,
            // title: `${navigation.state.params.name}'s Profile'`,
        }),
    }

    }, {
        initialRouteName: 'Playlists'
    }
);