import React, { Component } from "react";
import { 
    View, 
    StyleSheet,
    FlatList,
    Alert,
} from "react-native";
import { 
    Container, 
    Button, 
    Text, 
} from 'native-base';
import Field from '../components/Field';
import AwesomeAlert from 'react-native-awesome-alerts';
import { onSignIn } from "../AuthMethods";
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '', email: '', password1: '', password2: '',
          username_field_is_bad: false, email_field_is_bad: false, password1_field_is_bad: false, password2_field_is_bad: false,
          username_field_alerts: [''], email_field_alerts: [''], password1_field_alerts: [''], password2_field_alerts: [''], 
          non_field_alert: [''],
          showLoading: false,
        };
    }
    register = async () => {
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
            onSignIn(response.data.token);
            self.props.navigation.navigate('MainScreen')
        })
        .catch(function (error) {
            console.log('error', error);
            if(!error.response){
                Alert.alert("Não foi possível se comunicar com o servidor");
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
                <View style={styles.logo}>
                    <Text>Registro</Text>
                </View>
                <View style={styles.fields}>
                    <Field
                        placeholder={"email"}
                        badInput={this.state.email_field_is_bad}
                        fieldAlert={this.state.email_field_alerts}
                        keyExtractor={'email'}
                        onChangeText={(email) => this.setState({email})}
                    /> 
                    <Field
                        placeholder={"senha"}
                        badInput={this.state.password1_field_is_bad}
                        fieldAlert={this.state.password1_field_alerts}
                        keyExtractor={'password1'}
                        onChangeText={(password1) => this.setState({password1})}
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
                        onPress={this.register}
                    >
                        <Text> Registro </Text>
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
export default Registration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
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
    field: {
        paddingBottom:20,
        paddingTop:20,
    },
    logo: {
        flex: 1,
        alignItems: 'center',
    }
});