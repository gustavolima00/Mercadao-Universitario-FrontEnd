import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';

VENDOR_NOT_APPROVED = 2;
VENDOR_APPROVED = 3;
BUYER = 1;

export default class TypeSelection extends Component{
  constructor(props) {
    super(props);
    this.state = {
        buyer:true, vendor:false,
    };
  }
  onPressVendor = () => {
    this.setState({vendor:true, buyer:false})
    let type = VENDOR_NOT_APPROVED;
    this.props.type(type)
  }

  onPressBuyer = () => {
    this.setState({vendor:false, buyer:true})
    let type = BUYER;
    this.props.type(type)
  }

  render(){
    if (this.state.buyer){
      buyer_style = {
        margin: 2,
        //height: 50,
        width: 100,
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 2,
      }
    }
    else{ // default button style
      buyer_style = {
        margin: 2,
        //height: 50,
        width: 100,
        alignItems: 'center',
        backgroundColor: '#49515f',
        borderRadius: 2,
      }
    }
    if (this.state.vendor){
      vendor_style = {
        margin: 2,
        //height: 50,
        width: 100,
        alignItems: 'center',
        backgroundColor: 'red',
        borderRadius: 2,
      }
    }
    else{ // default button style
      vendor_style = {
        margin: 2,
        //height: 50,
        width: 100,
        alignItems: 'center',
        backgroundColor: '#49515f',
        borderRadius: 2,
      }
    }
  return(
    <View style={styles.container}>
        <TouchableHighlight onPress={this.onPressBuyer.bind(this)} underlayColor="white">
            <View style={buyer_style}>
                <Text style={styles.buttonText}>COMPRADOR</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onPressVendor.bind(this)} underlayColor="white">
            <View style={vendor_style}>
                <Text style={styles.buttonText} >VENDEDOR</Text>
            </View>
        </TouchableHighlight>
    </View>
  )
  }
}
const styles = StyleSheet.create({
  container: {
    //backgroundColor: 'powderblue',
    //flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height:60,
  },
  button: {
      margin: 2,
      //height: 50,
      width: 100,
      alignItems: 'center',
      backgroundColor: '#49515f',
      borderRadius: 2,
      //borderWidth: 1,
      //borderColor: 'black'
  },
  buttonText: {
      fontSize: 14,
      paddingTop: 12,
      paddingBottom: 12,
      color: 'white',
      //fontWeight: 'bold',
  },
})