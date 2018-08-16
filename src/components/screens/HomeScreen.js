import React from 'react';
import { Button, Text, View, TextInput, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import UserCard from '../UserCard';
import BottomNav from '../BottomNav';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
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

  handleLike = () => {
    if (this.state.hasUsersToLike) {
      const api_call = axios({
        method: 'POST',
        url: `https://1535904b.ngrok.io/user/like/${this.state.timeline_user_id}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'access-token': this.state.access_token,
          'uid': this.state.uid,
          'client': this.state.client
        }
      });

      api_call.then((response) => {
        if (response.status == 200) {
        }
      }).catch(error => {
        if(error.request.status == 401) {
          alert('sim');
          const request = axios({
            method: 'post',
            url: 'https://1535904b.ngrok.io/auth/sign_in',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            params: {
              email: this.state.uid,
              password: '123123123',
            }
          });

          request.then((response) => response.headers).
          then((headers) => {
            this.setState({
              uid: headers['uid'],
              access_token: headers['access-token'],
              client: headers['client'],
            }, () => {
              this.handleLike();
              return;
            });
          });
        }
      });

      api_call.then((response) => response.headers).
      then((headers) => {
        const access = headers['access-token'] == "" ? this.state.access_token : headers['access-token'];
        this.setState({
          access_token: access,
        }, () => {

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

        });
      });


    } else {
      alert('mas man n tem ngm');
    }
  }

  handleDislike = () => {
    if (this.state.hasUsersToLike) {
      const api_call = axios({
        method: 'POST',
        url: `https://1535904b.ngrok.io/user/reject/${this.state.timeline_user_id}`,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'access-token': this.state.access_token,
          'uid': this.state.uid,
          'client': this.state.client
        }
      });

      api_call.then((response) => {
        if (response.status == 200) {
        }
      }).catch(error => {
        if(error.request.status == 401) {
          alert('sim');
          const request = axios({
            method: 'post',
            url: 'https://1535904b.ngrok.io/auth/sign_in',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            params: {
              email: this.state.uid,
              password: '123123123',
            }
          });

          request.then((response) => response.headers).
          then((headers) => {
            this.setState({
              uid: headers['uid'],
              access_token: headers['access-token'],
              client: headers['client'],
            }, () => {
              this.handleDislike();
              return;
            });
          });
        }
      });

      api_call.then((response) => response.headers).
      then((headers) => {
        const access = headers['access-token'] == "" ? this.state.access_token : headers['access-token'];
        this.setState({
          access_token: access,
        }, () => {

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

        });
      });
    } else {
      alert('mas man n tem ngm');
    }
  }

  handleRefreshTimeline = () => {
    const api_call = axios({
      method: 'GET',
      url: 'https://1535904b.ngrok.io/user/single_user_timeline',
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

      });
    });
  }

  getCommonPreferences = () => {
    const api_call = axios({
      method: 'get',
      url: `https://1535904b.ngrok.io/user/common_preferences/${this.state.timeline_user_id}`,
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

      });
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

  getReturnedParams = (access_token) => {
    console.warn(this.state.access_token);
    this.setState({
      access_token: access_token
    }, () => {
      console.warn(this.state.access_token);
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: 'rgb(225, 239, 250)' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>

          { this.state.hasUsersToLike == true &&
            <UserCard
              name={this.state.timeline_user_name}
              age={this.state.timeline_user_age}
            />
          }

          {/* 50 height para não subir a primeira view quando não existir preferências em comum*/}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, height: 50 }}>
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

          </View>
          { !(this.state.hasUsersToLike) &&
            <View style={{ height: '80%', alignItems: 'center', justifyContent: 'center' }}>
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
        <BottomNav navigation={ this.props.navigation } uid={ this.state.uid } access_token={ this.state.access_token } client={ this.state.client } getReturnedParams={ this.getReturnedParams.bind(this) } />
      </View>
    );
  }
}
