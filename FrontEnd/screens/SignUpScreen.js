import React, { Component } from "react";
import { View, StyleSheet} from "react-native";
import { 
    Container, 
    Button, 
    Text, 
    Label,
    Input,
    Item,
    Header,
} from 'native-base';

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          username: '', email: '', password1: '', password2: '',
          username_field_is_bad: false, email_field_is_bad: false, password1_field_is_bad: false, password2_field_is_bad: false,
          username_field_alerts: [''], email_field_alerts: [''], password1_field_alerts: [''], password2_field_alerts: [''], 
          non_field_alert: ['']
        };
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header/>
                <View style={styles.fields}> 
                    <Item stackedLabel>
                        <Label>Username</Label>
                        <Input 
                            onChangeText={(username) => this.setState({username})}
                        />
                    </Item>
                    <Item stackedLabel >
                        <Label>Email</Label>
                        <Input 
                            onChangeText={(email) => this.setState({email})}
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Senha</Label>
                        <Input 
                            onChangeText={(passsword1) => this.setState({passsword1})}
                            secureTextEntry
                        />
                    </Item>
                    <Item stackedLabel>
                        <Label>Repita sua senha</Label>
                        <Input 
                            onChangeText={(password2) => this.setState({password2})}
                            secureTextEntry 
                        />
                    </Item>
                    
                </View>
                <View style={styles.buttons}>
                    <Button 
                        block  
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate('SignUpScreen')}
                    >
                        <Text> Registro </Text>
                    </Button>
                </View>
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
        justifyContent: 'space-between',
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