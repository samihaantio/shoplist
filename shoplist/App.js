import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator, } from 'react-navigation';
import Login from './app/components/Login';
import Memberarea from './app/components/Memberarea';


export default StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: false,
    }
  },
  Memberarea: {
    screen: Memberarea,
    navigationOptions: {
      header: false,
    }
  }
})