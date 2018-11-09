import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
} from "react-native";
import { getUserToken, onSignOut } from "../../AuthMethods";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token:undefined,
        }
    }
    
    static navigationOption = {
        header: 'none',
    }
    componentWillMount(){
        getUserToken()
        .then(res => this.setState({ token: res }))
        .catch(err => alert("Erro"));
    }
    signOut = async () => {
        onSignOut()
        this.props.navigation.navigate('Login')
    }
    render() {
        console.log('token Main screen', this.state.token)
        return (
            <View style={styles.container}>
                <Text>
                    Welcome {`token:${this.state.token}`}
                </Text>
                <Button title='LogOut' onPress={this.signOut}/>
            </View>
        );
    }
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    }
});