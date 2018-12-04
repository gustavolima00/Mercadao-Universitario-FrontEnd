import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
} from "react-native";
import { 
    VENDOR_NOT_APPROVED,
    VENDOR_APPROVED
} from '../../helpers/Requests'

export default class VendorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }
    render(){

        if(this.props.profile_type == VENDOR_NOT_APPROVED){
            message = 'Seu perfil de vendedor ainda não foi aprovado Pela nossa equipe, aguarde a aprovação.'
        }
        else if(this.props.profile_type == VENDOR_APPROVED){
            message = ''
        }
        return(
            <View style = {styles.container}>
                <Text style={styles.title}> Vendedor </Text>
                <Image
                    source={{ uri: this.props.photo }}
                    style={styles.photo}
                />
                <Text style={styles.text}> Nome: {this.props.name} </Text>
                <Text style={styles.text}> Email: {this.props.email} </Text>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('EditProfile', { name:this.props.name, photo:this.props.photo})} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Edit Profile</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.navigation.navigate('CreateProduct')} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Criar produto</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.props.onPressSignOut} underlayColor="white">
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>LOG OUT</Text>
                    </View>
                </TouchableHighlight>
                <Text style={styles.text}>{message}</Text>
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
    title:{
        textAlign: 'center',
        fontSize: 20,
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
    photo: {
        width: 150, 
        height: 150, 
        borderRadius: 150/2, 
        //position: 'absolute'
    },
});