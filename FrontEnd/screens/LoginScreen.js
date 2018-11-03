import React, { Component } from "react";
import { 
    View, 
    StyleSheet,
    Alert,
    FlatList,
} from "react-native";
import { 
    Container, 
    Button, 
    Text, 
} from 'native-base';
import Field from './components/Field';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '', password: '',
          username_field_is_bad: false, password_field_is_bad: false,
          username_field_alerts: [''], password_field_alerts: [''], 
          non_field_alert: [''], loading:false,
        };
    }
    login = async () => {
        this.setState({ loading: true })
        const domain = 'IP';
        const login_path = `http://${domain}/rest-auth/token-obtain/`;
        console.log('fetching url:', login_path);

        fetch(login_path, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': this.state.username,
                'password': this.state.password,
            }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(JSON.stringify(responseJson));
            //Campo de username
            if (responseJson.username != undefined){
                this.setState({ username_field_alerts: responseJson.username})
                this.setState({ username_field_is_bad: true })
            }
            else{
                this.setState({ username_field_alerts: ['']})
                this.setState({ username_field_is_bad: false })
            }

            //Campo de password
            if (responseJson.password != undefined){
                this.setState({ password_field_alerts: responseJson.password})
                this.setState({ password_field_is_bad: true })
            }
            else{
                this.setState({ password_field_alerts: ['']})
                this.setState({ password_field_is_bad: false })
            }

            //Sem campo
            if (responseJson.non_field_errors != undefined){
                this.setState({ non_field_alert: responseJson.non_field_errors})
            }
            else{
                this.setState({ non_field_alert: ['']})
            }
            //Sucesso
            if (responseJson.token != undefined||
                responseJson.key != undefined){
                    this.props.navigation.navigate('TabHandler', {token:responseJson.token})
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
        //this.setState({ loading: false });
    }
    render() {
        return (
            <Container style={styles.container}>
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
                        onPress={() => this.props.navigation.navigate('SignUpScreen')}
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
                
            </Container>
        );
    }
}
export default LoginScreen;

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