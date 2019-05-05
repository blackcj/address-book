import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    KeyboardAvoidingView
} from 'react-native';
import database from '../database/Database';

type Props = {};
class AddressScreen extends Component<Props> {
    state = { addresses: [] };

    static navigationOptions = {
        title: 'Saved Addresses',
    };

    componentDidMount() {
        database.getAddresses().then(response => {
            this.setState({
                addresses: response,
            })
        }).catch(error => {
            alert(`Error ${error}`);
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>{JSON.stringify(this.state.addresses)}</Text>
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

export default AddressScreen;
