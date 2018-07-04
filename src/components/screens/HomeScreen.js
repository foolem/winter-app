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
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      access_token: null,
      client: null,
      timeline_user_name: 'Nome',
      timeline_user_id: null,
      logged_in: false,
      hasUsersToLike: false,
      common_preferences: [],
    }
  }

  componentDidMount() {

      if (this.state.logged_in == false) {
        const { navigation } = this.props;
        const email = navigation.getParam('email', 'null');
        const password = navigation.getParam('password', 'null');
        const password_confirmation = password;

        const request = axios({
          method: 'post',
          url: 'http://192.168.11.8:3000/auth/sign_in',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          params: {
            email: email,
            password: password,
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
      }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.access_token != this.state.access_token) {
      this.handleSetupTimeline();
    }

    if (prevState.timeline_user_id != this.state.timeline_user_id) {
      this.getCommonPreferences();
    }
  }

  handleLike = () => {
    if (this.state.hasUsersToLike) {

      const api_call = axios({
        method: 'POST',
        url: `http://192.168.11.8:3000/user/like/${this.state.timeline_user_id}`,
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
        if (!(response.hasOwnProperty('error'))) {
          this.setState({
            hasUsersToLike: true
          });
        } else {
          this.setState({ hasUsersToLike: false });
        }
      });
      // alert("LIKE COM SUCESSO");


      this.handleRefreshTimeline();
      this.getCommonPreferences();

    } else {
      alert('mas man n tem ngm');
    }
  }

  handleDislike = () => {
    if (this.state.hasUsersToLike) {
      const api_call = axios({
        method: 'POST',
        url: `http://192.168.11.8:3000/user/reject/${this.state.timeline_user_id}`,
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
        if (!(response.hasOwnProperty('error'))) {
          this.setState({
            hasUsersToLike: true
          });
        } else {
          this.setState({ hasUsersToLike: false });
        }
      });

      this.handleRefreshTimeline();
      this.getCommonPreferences();
      
      // alert("DISLIKE COM SUCESSO");

    } else {
      alert('mas man n tem ngm');
    }

  }

  handleSetupTimeline = () => {
    const api_call = axios({
      method: 'GET',
      url: 'http://192.168.11.8:3000/user/single_user_timeline',
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
      if (!(response.hasOwnProperty('error'))) {
        this.setState({
          timeline_user_name: response.data.data.attributes.name,
          timeline_user_id: response.data.data.id,
          timeline_user_age: response.data.data.attributes.age,
          hasUsersToLike: true,
        });
      } else {
        this.setState({ hasUsersToLike: false });
      }
    });


  }

  handleRefreshTimeline = () => {

    const api_call = axios({
      method: 'GET',
      url: 'http://192.168.11.8:3000/user/single_user_timeline',
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
      if (!(response.hasOwnProperty('error'))) {
        this.setState({
          timeline_user_name: response.data.data.attributes.name,
          timeline_user_id: response.data.data.id,
          timeline_user_age: response.data.data.attributes.age,
          hasUsersToLike: true
        });
      } else {
        this.setState({ hasUsersToLike: false });
      }
    });
  }

  getCommonPreferences = () => {
    const api_call = axios({
      method: 'get',
      url: `http://192.168.11.8:3000/user/common_preferences/${this.state.timeline_user_id}`,
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
          common_preferences: common_preferences,
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

    const { navigation } = this.props;
    const email = navigation.getParam('email', 'null');
    const password = navigation.getParam('password', 'null');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(225, 239, 250)' }}>

        { this.state.hasUsersToLike == true &&
          <UserCard
            name={this.state.timeline_user_name}
            age={this.state.timeline_user_age}
          />
        }

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 35 }}>
            { this.state.common_preferences.map((p) => {
                return(this.getAreaIcon(p))
              })
            }
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5}}>

          { this.state.hasUsersToLike &&
            <Icon
              raised
              reverse
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
              reverse
              name='heart'
              type='evilicon'
              color='rgb(89, 180, 251)'
              size={30}
              onPress={ () => this.handleLike() }
            />
          }

          { !(this.state.hasUsersToLike) &&
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Icon
                name='emoticon-sad'
                type='material-community'
                color='rgb(128, 240, 114)'
                size={80}
              />
              <Text style={{marginTop: 50, fontSize: 36}}>
                NGM PRA DAR LIKE
              </Text>
              <Button
                title='Tentar novamente'
                onPress={ () => this.handleSetupTimeline() }
              />
            </View>
          }

        </View>
      </View>
    );
  }
}
