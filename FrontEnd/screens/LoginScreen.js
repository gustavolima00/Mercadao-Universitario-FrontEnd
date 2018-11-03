import React, { Component } from "react";
import { View, StyleSheet} from "react-native";
import { 
    Container, 
    Button, 
    Text, 
    Label,
    Input,
    Item,
} from 'native-base';

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '', password: '',
          username_field_is_bad: false, password_field_is_bad: false,
          username_field_alerts: [''], password_field_alerts: [''], non_field_alert: ['']
        };
    }
  
    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.logo}>
                    <Text>Login</Text>
                </View>
                <View style={styles.fields}> 
                    <Item stackedLabel last>
                        <Label>Email/Username</Label>
                        <Input 
                            onChangeText={(username) => this.setState({username})}
                        />
                    </Item>
                    <Item stackedLabel last>
                        <Label>Senha</Label>
                        <Input 
                            secureTextEntry
                            onChangeText={(password) => this.setState({password})}
                        />
                    </Item>
                    
                </View>
                <View style={styles.buttons}>
                    <Button 
                        block 
                        style={styles.button} 
                        onPress={() => this.props.navigation.navigate('MainScreen')}
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