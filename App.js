import React from 'react';
import { Button, Text, View, TextInput } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  changeEmailHandler = (text) => {
    this.setState({ email: text })
  }

  changePasswordHandler = (text) => {
    this.setState({ password: text })
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <TextInput
          style={{width: 200}}
          placeholder="email"
          autoCapitalize = "none"
          onChangeText={ this.changeEmailHandler }
        />
        <TextInput
          style={{width: 200}}
          placeholder="senha"
          autoCapitalize = "none"
          onChangeText={ this.changePasswordHandler }
        />
        <Button
          title="Login"
          onPress={ () =>
            this.props.navigation.navigate('Details', {
              email: this.state.email,
              password: this.state.password
            }) }
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {

    const { navigation } = this.props;
    const email = navigation.getParam('email', 'null');
    const password = navigation.getParam('password', 'null');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Email: {email}</Text>
        <Text>Password: {password}</Text>

          <Button
            title="Voltar"
            onPress={ () => this.props.navigation.goBack() }
          />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}
