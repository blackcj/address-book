import React, { Component } from 'react';
import SearchScreen from './components/SearchScreen';
import MapScreen from './components/MapScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator(
  {
    SearchScreen: { screen: SearchScreen },
    MapScreen: { screen: MapScreen },
  },
  {
    initialRouteName: 'SearchScreen'
  }
);

const App = createAppContainer(MainNavigator);

export default App;
