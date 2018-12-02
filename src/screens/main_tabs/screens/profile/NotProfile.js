import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
} from "react-native";

export default class NotProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
     
        };
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text style={styles.text}> 
                    Você ainda não possui perfil 
                    Clique aqui para criar um perfil agora
                </Text>
                <TouchableHighlight onPress={this.props.onPressCreate} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>CRIAR PERFIL</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.onPressSignOut} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>LOG OUT</Text>
                    </View>
                </TouchableHighlight>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    text: {
        textAlign: 'center',
        color: '#49515f',
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