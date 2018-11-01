import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class LoginScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>LoginScreen</Text>
                <Button title='Finish login' onPress={() => this.props.navigation.navigate('MainScreen')}/>
                <Button title='SignUp' onPress={() => this.props.navigation.navigate('SignUpScreen')}/>
            </View>
        );
    }
}
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    }
});