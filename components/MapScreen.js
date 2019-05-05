import React, { Component } from 'react';
import MapView from 'react-native-maps';
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
            <MapView
                style={{ flex: 1 }}
                region={{
                    latitude: 44.970611,
                    longitude: -93.4019067,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                }}
                showsUserLocation={true}
            />
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
