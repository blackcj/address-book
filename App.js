/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class App extends Component<Props> {
  state = { address: '123 Street', search: '' };

  handleSubmit = () => {
    const searchString = `You entered: ${this.state.address}`;
    this.setState({ search: searchString });
  }

  render() {
    return (
      <View style={styles.container}>
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
        <Text style={styles.instructions}>{this.state.search}</Text>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
    margin: 10,
  },
});

export default App;