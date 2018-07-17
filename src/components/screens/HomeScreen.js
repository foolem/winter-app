import React from 'react';
import { Button, Text, View, TextInput, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import UserCard from '../UserCard';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'rgb(103, 184, 242)',
    },
    headerTitleStyle: {
      color: '#fff',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      timeline_user_name: 'Nome',
      timeline_user_id: null,
      hasUsersToLike: false,
      common_preferences: [],
      uid: null,
      client: null,
      access_token: null,
      got_navigation_props: false
    }
  }

  componentDidMount = () => {
    if (this.state.got_navigation_props == false) {
      this.setState({
        access_token: this.props.navigation.getParam('access_token', 'null'),
        uid: this.props.navigation.getParam('uid', 'null'),
        client: this.props.navigation.getParam('client', 'null'),
      }, () => {
        this.setState({ got_navigation_props: true }, () => { this.handleRefreshTimeline() });
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.timeline_user_id != this.state.timeline_user_id) {
      this.getCommonPreferences();
    }
  }

  handleLike = () => {
    if (this.state.hasUsersToLike) {
      const api_call = axios({
        method: 'POST',
        url: `http://192.168.11.9:3000/user/like/${this.state.timeline_user_id}`,
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
        }, () => {
          this.handleRefreshTimeline();
        });
      });

      api_call.then((response) => {
        if (!(response.hasOwnProperty('error'))) {
          this.setState({
            hasUsersToLike: true
          }, () => {
            this.handleRefreshTimeline();
          });

          if (response.data.data.attributes['first-like'] === true && response.data.data.attributes['second-like'] === true) {
            alert('match');
          }

        } else {
          this.setState({ hasUsersToLike: false }, () => {
            this.handleRefreshTimeline();
          });
        }
      });
    } else {
      alert('mas man n tem ngm');
    }
  }

  handleDislike = () => {
    if (this.state.hasUsersToLike) {
      const api_call = axios({
        method: 'POST',
        url: `http://192.168.11.9:3000/user/reject/${this.state.timeline_user_id}`,
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
        }, () => {
          this.handleRefreshTimeline();
        });
      });

      api_call.then((response) => {
        if (!(response.hasOwnProperty('error'))) {
          this.setState({
            hasUsersToLike: true
          }, () => {
            this.handleRefreshTimeline();
          });
        } else {
          this.setState({ hasUsersToLike: false }, () => {
            this.handleRefreshTimeline();
          });
        }
      });
    } else {
      alert('mas man n tem ngm');
    }
  }

  handleRefreshTimeline = () => {
    const api_call = axios({
      method: 'GET',
      url: 'http://192.168.11.9:3000/user/single_user_timeline',
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
          timeline_user_name: response.data.data.attributes.name,
          timeline_user_id: response.data.data.id,
          timeline_user_age: response.data.data.attributes.age,
          hasUsersToLike: true
        }, () => {
          this.getCommonPreferences();
        });
      } else {
        this.setState({
          hasUsersToLike: false,
          common_preferences: []
         });
      }
    });
  }

  getCommonPreferences = () => {
    const api_call = axios({
      method: 'get',
      url: `http://192.168.11.9:3000/user/common_preferences/${this.state.timeline_user_id}`,
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
      let common_preferences = [];
      response.data.map((p) => {
        common_preferences.push(p.area_id);
      });
      if (common_preferences.length > 0) {
        this.setState({
          common_preferences: [],
        }, () => {
          this.setState({
            common_preferences: common_preferences
          })
        });
      }
    });
  }

  getAreaIcon = (id) => {
    if (id == 1) {
      return(
        <View key={id}>
        <Icon
          raised
          name='theater'
          type='material-community'
          color='rgb(89, 180, 251)'
          size={15}
        />
        </View>
      );
    }
    else if (id == 2) {
      return(
        <View key={id}>
        <Icon
          raised
          name='pen'
          type='material-community'
          color='rgb(89, 180, 251)'
          size={15}
        />
        </View>
      );
    }
    else if (id == 3) {
      return(
        <View key={id}>
        <Icon
          raised
          name='soccer'
          type='material-community'
          color='rgb(89, 180, 251)'
          size={15}
        />
        </View>
      );
    }
    else {
      return <Text>{ id }</Text>;
    }
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(225, 239, 250)' }}>

        { this.state.hasUsersToLike == true &&
          <UserCard
            name={this.state.timeline_user_name}
            age={this.state.timeline_user_age}
          />
        }

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            { this.state.common_preferences.map((p) => {
                return(this.getAreaIcon(p))
              })
            }
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>

          { this.state.hasUsersToLike &&
            <Icon
              raised

              name='close'
              type='evilicon'
              color='rgb(238, 85, 85)'
              size={30}
              onPress={ () => this.handleDislike() }
            />
          }

          { this.state.hasUsersToLike &&
            <Icon
              raised
              name='heart'
              type='evilicon'
              color='rgb(89, 180, 251)'
              size={30}
              onPress={ () => this.handleLike() }
            />
          }

          { !(this.state.hasUsersToLike) &&
            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
              <Icon
                name='emoticon-sad'
                type='material-community'
                color='rgb(89, 180, 251)'
                size={70}
              />
              <Text style={{ marginTop: 20, marginBottom: 20, fontSize: 20 }}>
                ninguém para dar like
              </Text>
              <Button
                title='Tentar novamente'
                onPress={ () => this.handleRefreshTimeline() }
              />
            </View>
          }

        </View>
      </View>
    );
  }
}
