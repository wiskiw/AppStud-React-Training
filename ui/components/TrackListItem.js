import React from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, Text, View,} from 'react-native';
import Colors from "../../constants/Colors";
import Layout from "../../constants/Layout";

/**
 * Component for displaying track in list
 */
export default class TrackListItem extends React.Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        artists: PropTypes.string.isRequired,
    };

    render() {
        const {
            name,
            artists,
        } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.trackName}>{name}</Text>
                <Text style={styles.trackArtists}>{artists}</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: Colors.background,
        flex: 1,
        margin: Layout.paddingNormal,
    },

    trackName: {
        fontSize: Layout.textSizeNormal,
        color: Colors.primaryText,
        flex: 1
    },

    trackArtists: {
        fontSize: Layout.textSizeNormal,
        color: Colors.secondaryText,
        marginTop: Layout.paddingSmall,
        flex: 1
    }
});
