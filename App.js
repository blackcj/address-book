import React, { Component } from 'react';
import SearchScreen from './components/SearchScreen';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Search: { screen: SearchScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
