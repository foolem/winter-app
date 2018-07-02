import React from 'react';
import { Button, Text, View, TextInput, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import UserCard from '../UserCard';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      access_token: null,
      client: null,
      timeline_user_name: 'Nome',
      timeline_user_id: null,
      loaded: false,
      hasUsersToLike: null
    }

    const { navigation } = this.props;
    const email = navigation.getParam('email', 'null');
    const password = navigation.getParam('password', 'null');
    const password_confirmation = password;

    const request = fetch('http://192.168.11.8:3000/auth/sign_in', {
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
      });
    });
  }

  componentDidMount = () => {

    setInterval(() => {
      if (this.state.loaded == false) {
        this.handleTimeline();
        this.setState({ loaded: true });
      }
    }, 1000);

  }

  handleLike = () => {
    const api_call = fetch(`http://192.168.11.8:3000/user/like/${this.state.timeline_user_id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': this.state.access_token,
        'uid': this.state.uid,
        'client': this.state.client
      }
    });

    api_call.then((response) => response.headers.map).
    then((headers) => {
      const access = headers['access-token'] == "" ? this.state.access_token : headers['access-token'];
      this.setState({
        access_token: access,
      });
    });

    api_call.then((response) => response.json()).
      then((res) => {
        if (!(res.hasOwnProperty('error'))) {
          this.setState({
            hasUsersToLike: true
          });
        } else {
          this.setState({ hasUsersToLike: false });
        }
      });

    setInterval(() => {
      this.handleTimeline();
    }, 500);

    alert("LIKE COM SUCESSO");

  }

  handleDislike = () => {
    const api_call = fetch(`http://192.168.11.8:3000/user/reject/${this.state.timeline_user_id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': this.state.access_token,
        'uid': this.state.uid,
        'client': this.state.client
      }
    });

    api_call.then((response) => response.headers.map).
    then((headers) => {
      const access = headers['access-token'] == "" ? this.state.access_token : headers['access-token'];
      this.setState({
        access_token: access,
      });
    });

    api_call.then((response) => response.json()).
      then((res) => {
        if (!(res.hasOwnProperty('error'))) {
          this.setState({
            hasUsersToLike: true
          });
        } else {
          this.setState({ hasUsersToLike: false });
        }
      });

    setInterval(() => {
      this.handleTimeline();
    }, 500);

    alert("DISLIKE COM SUCESSO");

  }

  handleTimeline = () => {

    const api_call = fetch('http://192.168.11.8:3000/user/single_user_timeline', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'access-token': this.state.access_token,
        'uid': this.state.uid,
        'client': this.state.client
      }
    });

    api_call.then((response) => response.headers.map).
    then((headers) => {
      const access = headers['access-token'] == "" ? this.state.access_token : headers['access-token'];
      this.setState({
        access_token: access,
      });
    });

    api_call.then((response) => response.json()).
    then((res) => {
      if (!(res.hasOwnProperty('error'))) {
        this.setState({
          timeline_user_name: res.data.attributes.name,
          timeline_user_id: res.data.id,
          timeline_user_age: res.data.attributes.age,
          hasUsersToLike: true
        });
      } else {
        this.setState({ hasUsersToLike: false });
      }
    });
  }

  render() {

    const { navigation } = this.props;
    const email = navigation.getParam('email', 'null');
    const password = navigation.getParam('password', 'null');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        { this.state.hasUsersToLike == true && <UserCard name={this.state.timeline_user_name} age={this.state.timeline_user_age} /> }
        { this.state.hasUsersToLike == false && <Text>NGM PRA DAR LIKE</Text> }
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 30}}>
          <Icon
            raised
            name='close'
            type='evilicon'
            color='rgb(238, 85, 85)'
            size={30}
            onPress={ () => this.handleDislike() }
          />

          <Icon
            raised
            name='heart'
            type='evilicon'
            color='rgb(128, 240, 114)'
            size={30}
            onPress={ () => this.handleLike() }
          />
        </View>
      </View>
    );
  }
}
