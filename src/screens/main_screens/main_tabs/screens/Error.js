import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
} from "react-native";

export default class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: 'Erro indefinido'
        };
    }
    render(){
        return(
            <TouchableOpacity style = {{flex:1}} onPress={this.props.onPressScreen}>
                <View style = {styles.container}>
                    <Text style = {styles.text}> {this.props.error} </Text>
                    <Text style = {styles.text}> Aperte na tela para atualizar </Text>
                </View>
            </TouchableOpacity>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        color: '#49515f',
        margin: 10,
    },
    button: {
        margin: 10,
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
});