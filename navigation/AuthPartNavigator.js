import React from 'react';
import {
    createStackNavigator
} from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import FeaturedPlaylists from '../screens/FeaturedPlaylists';


export default createStackNavigator({

    // todo remove home screen
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
    },

    Playlists: {
        screen: FeaturedPlaylists,
        navigationOptions: ({navigation}) => ({
            header: null,
            // title: `${navigation.state.params.name}'s Profile'`,
        }),
    }
});