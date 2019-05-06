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

type Props = {};
class SearchScreen extends Component<Props> {
    state = { address: '123 Street' };

    static navigationOptions = {
        title: 'Search',
    };

    handleSubmit = () => {
        const { navigate } = this.props.navigation;
        navigate('MapScreen', { address: this.state.address });
    }

    showSavedAddresses = () => {
        const { navigate } = this.props.navigation;
        navigate('AddressScreen', {});
    }

    render() {
        return (
            // KeyboardAvoidingView moves the view up when the keyboard is shown
            <KeyboardAvoidingView 
                style={styles.container}
                behavior="padding">
                <Text style={styles.welcome}>Enter an Address:</Text>
                <TextInput
                    style={styles.addressInput}
                    onChangeText={(address) => this.setState({ address })}
                    value={this.state.address} />
                <Button
                    onPress={this.handleSubmit}
                    title="Submit"
                    color="#841584"
                    accessibilityLabel="Submit" />
                <View style={styles.spacer} />
                <Button
                    onPress={this.showSavedAddresses}
                    title="Address Book"
                    color="#841584"
                    accessibilityLabel="Address Book" />
            </KeyboardAvoidingView>
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
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    addressInput: {
        height: 40,
        minWidth: 200,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
    },
    spacer: {
        height: 20,
    }
});

export default SearchScreen;
