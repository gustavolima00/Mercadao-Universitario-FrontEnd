import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View,
} from 'react-native';

export default class LoginButtons extends Component{
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  render(){
    return(
        <View style={styles.container}>
            <TouchableHighlight onPress={this.props.onPressLogin} underlayColor="white">
                <View style={styles.button}>
                    <Text style={styles.buttonText}>ENTRAR</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.props.onPressRegistration} underlayColor="white">
                <View style={styles.button}>
                    <Text style={styles.buttonText} >REGISTRO</Text>
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