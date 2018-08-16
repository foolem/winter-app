import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class BottomNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_token: null,
    }
  }

  componentDidMount = () => {
    if (this.props.access_token != null) {
      this.setState({
        access_token: this.props.access_token
      }, () => {
        this.props.getReturnedParams(this.state.access_token);
      });
    }
  }

  render() {
    return(
      <View style={{ height: 60, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor:'#fff', paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={ () => { this.props.navigation.navigate('Home', { access_token: this.props.access_token, uid: this.props.uid, client: this.props.client }) } }>
          <View style={{ justifyContent: 'center', width: '100%', height: '100%', paddingHorizontal: 30 }}>
            <Icon
              name='user'
              type='feather'
              color={ this.props.current == 'account' && 'rgb(89, 180, 251)' || this.props.current != 'account' && 'gray' }
              size={30}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => { this.props.navigation.navigate('Home', { access_token: this.props.access_token, uid: this.props.uid, client: this.props.client }) } }>
          <View style={{ justifyContent: 'center', width: '100%', height: '100%', paddingHorizontal: 30 }}>
            <Icon
              name='globe'
              type='feather'
              color={ this.props.current === undefined && 'rgb(89, 180, 251)' || this.props.current == 'discover' && 'rgb(89, 180, 251)' || this.props.current != 'discover' && 'gray' }
              size={30}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => { this.props.navigation.navigate('Matches', { access_token: this.props.access_token, uid: this.props.uid, client: this.props.client }) } }>
          <View style={{ justifyContent: 'center', width: '100%', height: '100%', paddingHorizontal: 30 }}>
            <Icon
              name='message-circle'
              type='feather'
              color={ this.props.current == 'matches' && 'rgb(89, 180, 251)' || this.props.current != 'matches' && 'gray' }
              size={30}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

}
