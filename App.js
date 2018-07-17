import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import HomeScreen from './src/components/screens/HomeScreen';
import LoginScreen from './src/components/screens/LoginScreen';

const RootStack = createBottomTabNavigator(
  {
    Auth: LoginScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Auth',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
