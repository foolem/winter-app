import React from 'react';
import { Button, Text, View, TextInput, Image } from 'react-native';

export default class UserCard extends React.Component {

  render() {
    return(
      <View style={{width: '80%', height: '50%', marginBottom: 50}} >
        <Image source={{uri: 'https://static1.squarespace.com/static/54e8ba93e4b07c3f655b452e/t/56c2a04520c64707756f4267/1493764650017/'}}
          style={{width: '100%', height: '100%'}}/>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff' }}>
            <Text style={{fontSize: 18}}>
              {this.props.name}
            </Text>
            <Text style={{fontSize: 18}}>
              {this.props.age}
            </Text>
          </View>
      </View>
    );
  }

}
