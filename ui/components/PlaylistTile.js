import React from 'react';
import PropTypes from 'prop-types';

import {
    View,
    Image,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';


export default class PlaylistTile extends React.Component {

    static propTypes = {
        playlist: PropTypes.object.isRequired,
        onPress: PropTypes.func,
    };

    static defaultProps = {
        onPress: () => {
        },
    };

    render() {
        const playlist = this.props.playlist;
        const picture = {
            uri: playlist.imageUrl
        };

        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.props.onPress} underlayColor="white">
                    <Image
                        onPress={this._onClick}
                        style={styles.image}
                        source={picture}
                    />
                </TouchableHighlight>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:5
    },
    image: {
        resizeMode: 'cover',
        justifyContent: 'center',
        height: 200,
        width: 200,
    },
});
