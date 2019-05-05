import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';

type Props = {};
class MapScreen extends Component<Props> {
    static navigationOptions = {
        title: 'Map',
    };

    render() {
        const { goBack } = this.props.navigation;
        const { address } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Text>{address}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

export default MapScreen;
