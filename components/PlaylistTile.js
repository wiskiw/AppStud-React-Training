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
        id: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    static defaultProps = {
        onPress: () => {
        },
    };

    render() {
        const picture = {
            uri: this.props.imageUrl
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
        padding: 10,
        alignItems: 'center'
    },
    image: {
        resizeMode: 'contain',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: 200,
        height: 200
    },
});