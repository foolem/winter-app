import React from 'react';
import { Button, Text, View, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper';

export default class UserCard extends React.Component {

  render() {
    return(
        <View style={{width: '85%', height: '60%', marginBottom: 10, marginTop: 35}} >
          <Swiper showsButtons={ false } showsPagination={ false } loop={ false } style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <Image source={{uri: 'https://scontent.ffln3-1.fna.fbcdn.net/v/t1.0-9/32384087_1739705366068852_5101363589260771328_n.jpg?_nc_cat=0&oh=1b35a2453cc0c50e3462b3aec1f375ad&oe=5BE7C9F9'}}
              style={{width: '100%', height: '100%' }}/>
              <Image source={{uri: 'https://scontent.ffln3-1.fna.fbcdn.net/v/t1.0-9/36770680_1809621515743903_7023487670424698880_n.jpg?_nc_cat=0&oh=c1e46524c24acdead8fee4e9c03749a9&oe=5BA511F1'}}
              style={{ width: '100%', height: '100%' }}/>
          </Swiper>
          <TouchableWithoutFeedback onPress={ () => alert("vamos nos conhecer") } underlayColor={'red'} >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#fff', borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
              <Text style={{fontSize: 18}}>
                {this.props.name}
              </Text>
              <Text style={{fontSize: 18}}>
                {this.props.age}
              </Text>
            </View>
          </TouchableWithoutFeedback>

        </View>
    );
  }

}
