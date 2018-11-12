import React, { Component } from "react";
import { 
    View, 
    StyleSheet,
    TouchableHighlight,
} from "react-native";
import { 
    Text, 
} from 'native-base';
import LoginFields from '../components/LoginFields';
import AwesomeAlert from 'react-native-awesome-alerts';
import { onSignIn } from "../AuthMethods";
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import { BackHandler } from 'react-native';

class CreateAccount extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
          username: '', email: '', password1: '', password2: '',
          username_field_is_bad: false, email_field_is_bad: false, password1_field_is_bad: false, password2_field_is_bad: false,
          username_field_alerts: [''], email_field_alerts: [''], password1_field_alerts: [''], password2_field_alerts: [''], 
          non_field_alert: [''],
          showLoading: false, showAlert: false,
        };
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.props.navigation.goBack(null);
        return true;
    }

    register = async () => {
        //this.setState({ showAlert: false });
        this.setState({ showLoading: true });
        var registration_path = `${API_URL}/rest-auth/registration/`;
        
        var self = this;
        axios.post(registration_path ,{
            'email': this.state.email,
            'username': this.state.email,
            'password1': this.state.password1,
            'password2': this.state.password1,
        })
        .then (function (response) {
            self.setState({ showLoading: false });
            console.log('response.data', response.data);
            console.log('response.status', response.status);
            if(response.status>= 200 && response.status<300){
                onSignIn(response.data.token);
                self.props.navigation.navigate('CreateProfile');
            }
        })
        .catch(function (error) {
            console.log('error', error);
            if(!error.response){
                self.setState({ showAlert: true });
            }
            else{
                console.log('error.response', error.response);
                console.log('error.status', error.status);
                //Campo de email
                if (error.response.data.email != undefined){
                    self.setState({ email_field_alerts: error.response.data.email})
                    self.setState({ email_field_is_bad: true })
                }
                else{
                    self.setState({ email_field_alerts: ['']})
                    self.setState({ email_field_is_bad: false })
                }
                //Campo de password
                if (error.response.data.password1 != undefined){
                    self.setState({ password1_field_alerts: error.response.data.password1})
                    self.setState({ password1_field_is_bad: true })
                }
                else{
                    self.setState({ password_field_alerts: ['']})
                    self.setState({ password_field_is_bad: false })
                }
                //Sem campo
                if (error.response.data.non_field_errors != undefined){
                    self.setState({ non_field_alert: error.response.data.non_field_errors})
                }
                else{
                    self.setState({ non_field_alert: ['']})
                }
            }
            self.setState({ showLoading: false });
            setTimeout(() => {}, 50);
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginFields
                    emailBadInput = {this.state.email_field_is_bad}
                    emailAlerts = {this.state.email_field_alerts}
                    onChangeEmail = {(email) => this.setState({email, showAlert: false })
                    }
                    passwordBadInput = {this.state.password1_field_is_bad}
                    passwordAlerts = {this.state.password1_field_alerts}
                    onChangePassword = {(password1) => this.setState({password1, showAlert: false})
                    }
                /> 
                <View style={styles.text_box}>
                    <Text style={styles.text}>
                        Ao clicar em "REGISTRO" você está aceitando 
                        os termos de uso do aplicativo.
                    </Text>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight onPress={this.register} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>REGISTRO</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <AwesomeAlert
                    show={this.state.showLoading}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    title={"Carregando"}
                    showProgress
                />
                <AwesomeAlert
                    show={this.state.showAlert}
                    title="Erro"
                    message="Não foi possível se comunicar com o servidor"
                />
            </View>
        );
    }
}
export default CreateAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'powderblue',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    buttons: {
        //flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        width: 200,
        width:'90%',
        justifyContent: 'flex-end',
        //backgroundColor: 'powderblue',
    },
    text_box: {
        //flex: 1,
        //backgroundColor: 'steelblue',
        width:'80%',
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