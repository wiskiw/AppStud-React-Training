import React from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text
} from 'react-native';
import Constants from 'expo-constants';

import PlaylistTile from '../components/PlaylistTile';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
];


function Item({title}) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

export default class FeaturedPlaylists extends React.Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {/*<FlatList*/}
                {/*    numColumns={2}*/}
                {/*    data={DATA}*/}
                {/*    renderItem={({item}) => <Item title={item.title}/>}*/}
                {/*    keyExtractor={item => item.id}*/}
                {/*/>*/}

                <FlatList
                    numColumns={2}
                    data={playlists}
                    renderItem={({playlist}) => (
                        <PlaylistTile
                            id={playlist.id}
                            imageUrl={playlist.imageUrl}
                        />
                    )}
                    keyExtractor={i => i.email}
                    refreshing={isRefreshing}
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    onEndThreshold={0}
                />

            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});
