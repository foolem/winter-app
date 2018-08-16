import React from 'react';
import { Button, Text, View, TextInput, Image, FlatList, TouchableHighlight, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import BottomNav from '../BottomNav';


export default class MatchesScreen extends React.Component {
  static navigationOptions = {
    title: 'Matches',
    headerStyle: {
      backgroundColor: 'rgb(103, 184, 242)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: { color: '#fff' },
    gesturesEnabled: true,
  };

  constructor(props) {
    super(props);
    this.state = {
      people: [{
        key: 'id',
        name: 'Usuário',
        last_message: 'Última mensagem',
      }],
      uid: null,
      client: null,
      access_token: null,
      got_navigation_props: false,
    }
  }

  componentDidMount = () => {
    if (this.state.got_navigation_props == false) {
      this.setState({
        access_token: this.props.navigation.getParam('access_token', 'null'),
        uid: this.props.navigation.getParam('uid', 'null'),
        client: this.props.navigation.getParam('client', 'null'),
      }, () => {
        this.setState({ got_navigation_props: true }, () => { this.loadMatches() });
      });
    }
  }

  loadMatches = () => {
    const api_call = axios({
      method: 'GET',
      url: 'http://192.168.11.13:3000/user/matches',
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
        if (this.state.people.length == 1 && this.state.people[0].key == 'id') {
          this.setState({people: []});
        }
        // console.warn(response.data.data);
        for (var i = 0; i < response.data.data.length; i++) {
          this.setState({
            people: [...this.state.people, {
              key: response.data.data[i].attributes['matched-user-id'],
              name: response.data.data[i].attributes['matched-user-name'],
            }]
          });
        }
      } else {
        // algo
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: 'rgb(225, 239, 250)' }}>
      <ScrollView>
        <FlatList
          data={ this.state.people }
          renderItem={({item}) =>
          <TouchableHighlight onPress={() => { this.props.navigation.navigate('UserMatched', { access_token: this.state.access_token, uid: this.state.uid, client: this.state.client, id: item.key }); }}>
            <View style={{ justifyContent: 'center', height: 50, backgroundColor: '#fff' }}>
              <Text style={{ paddingHorizontal: 10, textAlign: 'left', fontSize: 16, fontWeight: 'bold' }}>
                { this.state.people[0].key != 'id' && item.name }
              </Text>
            </View>
          </TouchableHighlight>}
        />
      </ScrollView>
      <BottomNav current={'matches'} navigation={ this.props.navigation } uid={ this.state.uid } access_token={ this.state.access_token } client={ this.state.client } />

      </View>
    );
  }
}
