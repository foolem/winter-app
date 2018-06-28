import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { KeyboardAvoidingView } from 'react-native';
import HomeScreen from './src/components/screens/HomeScreen';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Winter',
    headerStyle: {
      backgroundColor: 'rgb(103, 184, 242)',
    },
    headerTitleStyle: {
      color: '#fff',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    }
  }

  changeEmailHandler = (text) => {
    this.setState({ email: text })
  }

  changePasswordHandler = (text) => {
    this.setState({ password: text })
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} enabled>
        <TextInput
          style={{ width: 200 }}
          placeholder="email"
          autoCapitalize = "none"
          onChangeText={ this.changeEmailHandler }
        />
        <TextInput
          style={{width: 200}}
          placeholder="senha"
          autoCapitalize = "none"
          secureTextEntry={ true }
          onChangeText={ this.changePasswordHandler }
        />
        <Button
          title="Login"
          onPress={ () =>
            this.props.navigation.navigate('Home', {
              email: this.state.email,
              password: this.state.password
            }) }
        />
      </KeyboardAvoidingView>
    );
  }
}


const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
