import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import axios from 'axios';

export default class LoginScreen extends React.Component {
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
      email: 'foolemdev@gmail.com',
      password: '123123123',
      logged_in: false,
      uid: null,
      access_token: null,
      client: null,
    }
  }

  changeEmailHandler = (text) => {
    this.setState({ email: text })
  }

  changePasswordHandler = (text) => {
    this.setState({ password: text })
  }

  handleLogin = () => {
    const request = axios({
      method: 'post',
      url: 'http://192.168.11.9:3000/auth/sign_in',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      params: {
        email: this.state.email,
        password: this.state.password,
      }
    });

    request.then((response) => response.headers).
    then((headers) => {
      this.setState({
        uid: headers['uid'],
        access_token: headers['access-token'],
        client: headers['client'],
      }, () => {
        this.props.navigation.navigate('Home', {
          access_token: this.state.access_token,
          uid: this.state.uid,
          client: this.state.client,
        });
      });
    });

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
          onPress={ () => this.handleLogin() }
        />
      </KeyboardAvoidingView>
    );
  }
}
