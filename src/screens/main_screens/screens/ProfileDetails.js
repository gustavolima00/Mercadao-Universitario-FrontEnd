import React, { Component } from "react";
import { 
    View, 
    Text,
    BackHandler,
    StyleSheet,
    Image,
} from "react-native";

class ProfileDetails extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
            headerTitleStyle : {textAlign: 'center',alignSelf:'center'},
            headerStyle:{
                backgroundColor:'white',
            },
        }
    );
    
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }

    render() {
        const {state} = this.props.navigation;
        var user = state.params ? state.params.user : undefined;
        var photo = user.photo ? user.photo : undefined;
        var name = user.name ? user.name : undefined;
        var email = user.user ? user.user.email : undefined;
        return (
            <View style = {styles.container}>
                <Image
                    source={{ uri: photo }}
                    style={styles.photo}
                />
                <Text style={styles.text}> Nome: {name} </Text>
                <Text style={styles.text}> Email: {email} </Text>
            </View>
        )
    }

}
export default ProfileDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    },
    text: {
        textAlign: 'center',
        color: '#49515f',
    },
    button: {
        margin: 10,
        //height: 50,
        width: 100,
        alignItems: 'center',
        backgroundColor: '#49515f',
        borderRadius: 2,
        //borderWidth: 1,
        //borderColor: 'black'
    },
    buttonText: {
        fontSize: 14,
        paddingTop: 12,
        paddingBottom: 12,
        color: 'white',
        //fontWeight: 'bold',
    },
    photo: {
        width: 150, 
        height: 150, 
        borderRadius: 150/2, 
        //position: 'absolute'
    },
});