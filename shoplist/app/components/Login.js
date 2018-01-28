import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground ,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Keyboard,
} from 'react-native';
import { StackNavigator,} from 'react-navigation';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  login = () => {
    
    // Post data to backend
    fetch('http://192.168.10.53:3000/users/login', {
      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
          body: JSON.stringify({
            username: this.state.username,
            password: this.state.password,
          })
    })
    .then((response) => response.json())
    .then((res) => {
      if (res.success === true ) {
        var userdata = res.userdata;
        //console.log(res.message);
        
        AsyncStorage.setItem('username', userdata.username);
        this.props.navigation.navigate('Memberarea')

      } else {
        alert(res.message);
      }

    })
    .done();
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground  source={require('../img/login_bg.jpg')} style={styles.backgroundImage}>
        <View style={styles.content}>
          <Text style={styles.logo}>- ShoppingList -</Text>

          <View style={styles.inputContainer}>
            <TextInput underlineColorAndroid='transparent' style={styles.input} 
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            placeholder='username'>
            </TextInput>
            <TextInput secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input} 
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            placeholder='password'>
            </TextInput>
            <Text style={styles.noAccount}>No account? Register here!</Text>
            <TouchableOpacity onPress={this.login} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ImageBackground >
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logo: {
    color: 'white',
    fontSize: 40,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textShadowColor: '#252525',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 15,
    marginBottom: 20,
  },
  inputContainer: {
    margin: 20,
    marginBottom: 0,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,1)',
  },
  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    padding: 20,
    backgroundColor: 'blue',
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noAccount: {
    alignSelf: 'center',
  }
});
