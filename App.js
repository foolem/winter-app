import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from './src/components/screens/HomeScreen';
import LoginScreen from './src/components/screens/LoginScreen';
import MatchesScreen from './src/components/screens/MatchesScreen';
import UserMatchedScreen from './src/components/screens/UserMatchedScreen';

const RootStack = createStackNavigator(
  {
    Auth: LoginScreen,
    Home: HomeScreen,
    Matches: MatchesScreen,
    UserMatched: UserMatchedScreen
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
