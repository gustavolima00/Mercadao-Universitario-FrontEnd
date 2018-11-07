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
            onSignIn(response.data.token);
            self.props.navigation.navigate('MainScreen');
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
                <View style={styles.logo}>
                    <Text>Login</Text>
                </View>
                <View style={styles.fields}> 
                    <Field
                        placeholder={"Email/Username"}
                        badInput={this.state.username_field_is_bad}
                        fieldAlert={this.state.username_field_alerts}
                        keyExtractor={'username'}
                        onChangeText={(username) => this.setState({username})}
                    />
                    <Field
                        placeholder={"Password"}
                        badInput={this.state.password_field_is_bad}
                        fieldAlert={this.state.password_field_alerts}
                        keyExtractor={'password'}
                        onChangeText={(password) => this.setState({password})}
                        secureTextEntry
                    
                    />
                    <FlatList
                      data={this.state.non_field_alert}
                      renderItem={({item}) => <Text style ={{color: 'red'}}>{item}</Text>}
                      keyExtractor={item => 'non_field_errors'}
                    />
                </View>
                <View style={styles.buttons}>
                    <Button 
                        block 
                        style={styles.button} 
                        onPress={this.login}
                    >
                        <Text> Entrar </Text>
                    </Button>
                    <Button 
                        block  
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('Registration')}
                    >
                        <Text> Registro </Text>
                    </Button>
                    <Button 
                        block info 
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('MainScreen')}
                    >
                        <Text> Visitante </Text>
                    </Button>
                </View>
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
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        width: 200,
        justifyContent: 'space-evenly',
    },
    button: {
        marginBottom:5,
        marginTop:5,
    },
    fields: {
        flex: 1,
        paddingLeft:20,
        paddingRight:20,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    logo: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    }
});