import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import Config from 'react-native-config'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
} from 'react-native';
import Axios from 'axios';
import database from '../database/Database';

type Props = {};
class MapScreen extends Component<Props> {
    // Default state centers on Minneapolis
    state = {
        region: {
            latitude: 45.970611,
            longitude: -94.4019067,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
        foundResults: false,
    };

    saveAddress = () => {
        const { address } = this.props.navigation.state.params;
        const { region, foundResults } = this.state;
        if(foundResults) {
            database.addAddress(address, region.latitude, region.longitude).then(response => {
                alert(`Added ${address} to the database.`);
            }).catch(error => {
                alert(`Error ${error}`);
            });
        } else {
            alert(`No results found`);
        }
    }

    // Configure the title bar with a title and save button
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('address', 'Map'),
            headerRight: (
                <Button
                    onPress={navigation.state.params.saveAddress}
                    title="Save"
                    color="#111"
                />
            ),
        };
    };

    // When the screen loads, get the lat and lng for the provided address
    componentDidMount() {
        const { address } = this.props.navigation.state.params;
        this.props.navigation.setParams({ saveAddress: this.saveAddress });
        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.google.com/maps/api/geocode/json?address=${encodedAddress}&key=${Config.GOOGLE_MAPS_API_KEY}`;
        Axios.get(url).then(res => {
            if (res.data.error_message) {
                // Google will send back an error_message if an API key isn't provided
                alert(res.data.error_message);
            } else if (!res.data.results || res.data.results.length < 1) {
                alert('No results found');
            } else {
                this.setState(
                    {
                        region: {
                            ...this.state.region,
                            latitude: res.data.results[0].geometry.location.lat,
                            longitude: res.data.results[0].geometry.location.lng,
                        },
                        foundResults: true,
                    },
                );
            }            
        }).catch(error => {
            alert('Error: Unable to find address.');
        });
    }

    render() {
        const { address } = this.props.navigation.state.params;
        const { region, foundResults } = this.state;
        return (
            <MapView
                style={{ flex: 1 }}
                region={region}
                showsUserLocation={true}
            >
                {
                    // Conditionally render the marker
                    foundResults
                    && <Marker
                    coordinate={{ 
                        latitude: region.latitude,
                        longitude: region.longitude
                    }}
                    title={address}/>
                }
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
