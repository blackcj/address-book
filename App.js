import React, { Component } from 'react';
import SearchScreen from './components/SearchScreen';
import MapScreen from './components/MapScreen';
import AddressScreen from './components/AddressScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    SearchScreen: { screen: SearchScreen },
    MapScreen: { screen: MapScreen },
    AddressScreen: { screen: AddressScreen },
  },
  {
    initialRouteName: 'SearchScreen'
  }
);

const App = createAppContainer(MainNavigator);

export default App;
