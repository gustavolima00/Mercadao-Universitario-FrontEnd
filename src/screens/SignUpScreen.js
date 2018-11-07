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
import Field from './../components/Field';
import AwesomeAlert from 'react-native-awesome-alerts';
import { onSignIn } from "../AuthMethods";

class SignUpScreen extends Component {
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
        const domain = 'IP';
        var registration_path = `http://${domain}/rest-auth/registration/`;
        fetch(registration_path,{
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          'email': this.state.email,
          'username': this.state.username,
          'password1': this.state.password1,
          'password2': this.state.password2,
  
        }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      //Campo de email
      if (responseJson.email != undefined){
        this.setState({ email_field_alerts: responseJson.email})
        this.setState({ email_field_is_bad: true })
      }
      else{
        this.setState({ email_field_alerts: ['']})
        this.setState({ email_field_is_bad: false })
      }
      //Campo se username
      if (responseJson.username != undefined){
        this.setState({ username_field_alerts: responseJson.username})
        this.setState({ username_field_is_bad: true })
      }
      else{
        this.setState({ email_field_alerts: ['']})
        this.setState({ email_field_is_bad: false })
      }
      //Campo de password
      if (responseJson.password1 != undefined){
        this.setState({ password1_field_alerts: responseJson.password1})
        this.setState({ password1_field_is_bad: true })
      }
      else{
        this.setState({ password_field_alerts: ['']})
        this.setState({ password_field_is_bad: false })
      }
      if (responseJson.password1 != undefined){
        this.setState({ password2_field_alerts: responseJson.password2})
        this.setState({ password2_field_is_bad: true })
      }
      else{
        this.setState({ password2_field_alerts: ['']})
        this.setState({ password2_field_is_bad: false })
      }
      //Sem campo
      if (responseJson.non_field_errors != undefined){
        this.setState({ non_field_alert: responseJson.non_field_errors})
      }
      else{
        this.setState({ non_field_alert: ['']})
      }
      //Sucesso
     if (responseJson.token != undefined ||
        responseJson.key != undefined){
            onSignIn(responseJson.token);
            this.props.navigation.navigate('MainScreen')
        }
     })
  
     .catch( err => {
       if (typeof err.text === 'function') {
         err.text().then(errorMessage => {
           this.props.dispatch(displayTheError(errorMessage))
         });
       } else {
         Alert.alert("Erro na conexão.");
         console.log(err)
       }
     });
     this.setState({ showLoading: false });
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.logo}>
                    <Text>Registro</Text>
                </View>
                <View style={styles.fields}>
                    <Field
                        placeholder={"username"}
                        badInput={this.state.username_field_is_bad}
                        fieldAlert={this.state.username_field_alerts}
                        keyExtractor={'username'}
                        onChangeText={(username) => this.setState({username})}
                    /> 
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
                    <Field
                        placeholder={"repita sua senha"}
                        badInput={this.state.password2_field_is_bad}
                        fieldAlert={this.state.password2_field_alerts}
                        keyExtractor={'password2'}
                        onChangeText={(password2) => this.setState({password2})}
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
                    title={"Loading"}
                    showProgress
                />
            </Container>
        );
    }
}
export default SignUpScreen;

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
    field: {
        paddingBottom:20,
        paddingTop:20,
    },
    logo: {
        flex: 1,
        alignItems: 'center',
    }
});