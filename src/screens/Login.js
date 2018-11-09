import React, { Component } from "react";
import { 
    View, 
    StyleSheet,
    Alert,
    FlatList,
} from "react-native";
import { 
    Button, 
    Text, 
} from 'native-base';
import Field from '../components/Field';
import LoginButtons from '../components/LoginButtons';
import LoginFields from '../components/LoginFields';
import AwesomeAlert from 'react-native-awesome-alerts';
import { onSignIn } from "../AuthMethods";
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '', password: '',
          username_field_is_bad: false, password_field_is_bad: false,
          username_field_alerts: [''], password_field_alerts: [''], 
          non_field_alert: [''],
          showLoading: false,
        };
    }
    login = async () => {
        this.setState({ showLoading: true });
        const login_path = `${API_URL}/rest-auth/token-obtain/`;
        console.log('fetching url:', login_path);

        var self = this;
        axios.post(login_path ,{
            'username': this.state.username,
            'password': this.state.password,
        })
        .then (function (response) {
            self.setState({ showLoading: false });
            console.log('response.data', response.data);
            console.log('response.status', response.status);
            if(response.status>= 200 && response.status<300){
                onSignIn(response.data.token);
                self.props.navigation.navigate('MainScreen');
            }
        })
        .catch(function (error) {
            console.log('error', error);
            if(!error.response){
                Alert.alert("Não foi possível se comunicar com o servidor");
            }
            else{
                console.log('error.response', error.response);
                console.log('error.status', error.status);
                //Campo de username
                if (error.response.data.username != undefined){
                    self.setState({ username_field_alerts: error.response.data.username})
                    self.setState({ username_field_is_bad: true })
                }
                else{
                    self.setState({ username_field_alerts: ['']})
                    self.setState({ username_field_is_bad: false })
                }

                //Campo de password
                if (error.response.data.password != undefined){
                    self.setState({ password_field_alerts: error.response.data.password})
                    self.setState({ password_field_is_bad: true })
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
                    emailBadInput = {this.state.username_field_is_bad}
                    emailAlerts = {this.state.username_field_alerts}
                    onChangeEmail = {(username) => this.setState({username})}
                    passwordBadInput = {this.state.password_field_is_bad}
                    passwordAlerts = {this.state.password_field_alerts}
                    onChangePassword = {(password) => this.setState({password})}
                /> 
                <LoginButtons
                    onPressLogin={this.login}
                    onPressRegistration={() => this.props.navigation.navigate('Registration')}
                    onPressVisitor={() => this.props.navigation.navigate('MainScreen')}
                />
                <AwesomeAlert
                    show={this.state.showLoading}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    title={"Carregando"}
                    showProgress
                />
            </View>
        );
    }
}
export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        //backgroundColor: 'white',
    },
});