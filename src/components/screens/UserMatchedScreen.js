import React from 'react';
import { Button, Text, View, TextInput, Image, FlatList, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';

export default class UserMatchedScreen extends React.Component {
  static navigationOptions = {
    title: 'Matched User',
    headerStyle: {
      backgroundColor: 'rgb(103, 184, 242)',
    },
    headerTitleStyle: {
      color: '#fff',
    },
    headerTintColor: '#fff',
    gesturesEnabled: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: 0,
        name: 'Usuário',
        age: 0,
        bio: 'Sobre',
        common_preferences: [],
      },
      uid: null,
      client: null,
      access_token: null,
      got_navigation_props: false,
    }
  }

  componentDidMount = () => {
    this.setState({
      access_token: this.props.navigation.getParam('access_token', 'null'),
      uid: this.props.navigation.getParam('uid', 'null'),
      client: this.props.navigation.getParam('client', 'null'),
      user: {
        id: this.props.navigation.getParam('id', 'null')
      }
    }, () => {
      this.setState({ got_navigation_props: true }, () => { this.loadUser() });
    });

  }


  loadUser = () => {
    const api_call = axios({
      method: 'GET',
      url: `http://192.168.11.13:3000/user/info/${this.state.user.id}`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': this.state.access_token,
        'uid': this.state.uid,
        'client': this.state.client
      }
    });

    api_call.then((response) => response.headers).
    then((headers) => {
      const access = headers['access-token'] == "" ? this.state.access_token : headers['access-token'];
      this.setState({
        access_token: access,
      });
    });

    api_call.then((response) => {
      if (!(response.data.hasOwnProperty('error'))) {
        this.setState({
          user: {
            id: response.data.data.id,
            name: response.data.data.attributes.name,
            age: response.data.data.attributes.age,
            common_preferences: response.data.data.attributes['common-preferences']
          }
        });
      } else {
        // algo
      }
    });
  }

  render() {
    return (
      <View style={{ backgroundColor: 'rgb(225, 239, 250)' }}>
        <Text>Pagina do { this.state.user.name }</Text>
        <Text>Pagina do { this.state.user.id }</Text>
        <Text>Pagina do { this.state.user.common_preferences }</Text>
        <Button title="Voltar" onPress={ () => { this.props.navigation.goBack()} } />

      </View>
    );
  }
}
