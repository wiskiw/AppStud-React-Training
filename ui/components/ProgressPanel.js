import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import Layout from "../../constants/Layout";
import Colors from "../../constants/Colors";

/**
 * Component for displaying infinity progress
 */
export default class ProgressPanel extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.progressText}>
                    Loading...
                </Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.background,
        paddingTop: Layout.headerSize,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    progressText: {
        fontSize: Layout.headerTextSize,
        color: Colors.primaryText,
        padding: Layout.paddingNormal
    }
});
