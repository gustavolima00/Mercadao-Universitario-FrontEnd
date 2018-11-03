import * as React from 'react';
import {StatusBar, Platform } from 'react-native';
import {StackNavigator} from 'react-navigation'

import LoginScreen from './screens/LoginScreen'
import SignUpScreen from './screens/SignUpScreen'
import MainScreen from './screens/MainScreen'



export default class App extends React.Component {
  render() {
    return (
      < AppStackNavigator />
    );
  }
}

const AppStackNavigator = new StackNavigator({

  LoginScreen:{
    screen:LoginScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,

    }),
  },
  SignUpScreen:{
    screen:SignUpScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  MainScreen:{
    screen:MainScreen,
  },
})
