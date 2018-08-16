import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';

export default class LoginScreen extends React.Component {

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
    if (this.state.logged_in == false) {
      const request = axios({
        method: 'post',
        url: 'http://192.168.11.13:3000/auth/sign_in',
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
        });
      });
      this.setState({ logged_in: true });
      setTimeout(() => {
        this.props.navigation.navigate('App', {},
          {
            type: "Navigate",
            routeName: "Home",
            params: {
              access_token: this.state.access_token,
              uid: this.state.uid,
              client: this.state.client
            }
          });
      }, 2000);
    }
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
