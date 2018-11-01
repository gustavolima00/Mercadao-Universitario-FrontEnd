import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
} from "react-native";

class SignUpScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>SignUpScreen</Text>
                <Button title='Back' onPress={() => this.props.navigation.navigate('LoginScreen')}/>
            </View>
        );
    }
}
export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    }
});