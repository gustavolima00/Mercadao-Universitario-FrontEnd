import React, { Component } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { Item, Input, Label, Form, Content } from 'native-base';

export default class LoginFields extends Component{
  constructor(props) {
    super(props);
    this.state = {
      emailBadInput: false,
      emailAlerts: [''],
      passwordBadInput: false,
      passwordAlerts: [''],
    };
  }

  render(){

    if (this.props.emailBadInput){
      email_style = {
        //backgroundColor: '#F78181',
        color: 'red',
      }
    }
    else{ // default button style
      email_style = {
        color: '#191d1e',
        //borderWidth: 2,
      }
    }
    if (this.props.passwordBadInput){
        password_style = {
          //backgroundColor: '#F78181',
          color: 'red',
        }
      }
      else{ // default button style
        password_style = {
          color: '#191d1e',
          //borderWidth: 2,
        }
      }
  return(
    <View style={styles.container}>
        <Form>
            <Item stackedLabel>
                <Label style={email_style}>Email</Label>
                <Input 
                    style={{color: 'black'}}
                    onChangeText={this.props.onChangeEmail}
                />
            </Item>
        </Form>
        <FlatList
            data={this.props.emailAlerts}
            renderItem={({item}) => <Text style ={{color: 'red'}}>{item}</Text>}
            keyExtractor={item => 'username'}
        />
        <Form>
            <Item stackedLabel>
                <Label style={password_style}>Password</Label>
                <Input 
                    style={{color: 'black'}}
                    onChangeText={this.props.onChangePassword}
                    secureTextEntry
                />
            </Item>
        </Form>
        <FlatList
            data={this.props.passwordAlerts}
            renderItem={({item}) => <Text style ={{color: 'red'}}>{item}</Text>}
            keyExtractor={item => 'password'}
        />
     </View>
  )
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // flexDirection: 'column',
    // justifyContent: 'center',
    //backgroundColor: 'skyblue',
    height:200,
    //margin:20,
    marginLeft:20,
    marginRight:20,
  },
})