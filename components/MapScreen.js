import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Config from 'react-native-config'
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';
import Axios from 'axios';

type Props = {};
class MapScreen extends Component<Props> {
    state = {
        region: {
            latitude: 45.970611,
            longitude: -94.4019067,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        res: {}
    };

    static navigationOptions = {
        title: 'Map',
    };

    componentDidMount() {
        const { address } = this.props.navigation.state.params;
        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}&key=${Config.GOOGLE_MAPS_API_KEY}`;
        Axios.get(url).then(res => {
            this.setState(
                {
                    region: {
                        ...this.state.region,
                        latitude: res.data.results[0].geometry.location.lat,
                        longitude: res.data.results[0].geometry.location.lng,
                    },
                },
            );
        }).catch(error => {
            this.setState(
                {
                    res: `ERROR ${encodedAddress}`,
                },
            );
        });
    }

    render() {
        const { address } = this.props.navigation.state.params;
        const { region } = this.state;
        return (
            // <Text>{JSON.stringify(this.state)}</Text>
            <MapView
                style={{ flex: 1 }}
                region={region}
                showsUserLocation={true}
            >
                <Marker
                    coordinate={{ 
                        latitude: region.latitude,
                        longitude: region.longitude
                    }}
                    title={address}
                />
            </MapView>
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
