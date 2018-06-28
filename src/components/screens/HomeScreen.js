import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      access_token: null,
      client: null
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const email = navigation.getParam('email', 'null');
    const password = navigation.getParam('password', 'null');
    const password_confirmation = password;

    let request = fetch('http://200.17.252.251:3000/auth/sign_in', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    request.then((response) => response.headers.map).
    then((headers) => {
      this.setState({
        uid: headers['uid'],
        access_token: headers['access-token'],
        client: headers['client'],
      })
    });
  }

  handleTimeline = () => {
    console.warn("ebntei");
    fetch('http://200.17.252.251:3000/user/single_user_timeline', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': this.state.access_token,
        'uid': this.state.uid,
        'client': this.state.client
      }
    }).then((response) => response.json()).
    then((response) => {
      alert(response.data);
    });
  }

  render() {

    const { navigation } = this.props;
    const email = navigation.getParam('email', 'null');
    const password = navigation.getParam('password', 'null');


    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Email: {email}</Text>
        <Text>Password: {password}</Text>
        <Text>uid: {this.state.uid}</Text>
        <Text>access: {this.state.access_token}</Text>
        <Text>client: {this.state.client}</Text>


        <Button
          title="Timeline"
          onPress={ this.handleTimeline }
        />

        <Button
          title="Voltar"
          onPress={ () => this.props.navigation.goBack() }
        />
      </View>
    );
  }
}
