import React, { Component } from "react";
import { 
    View, 
    Text,
    BackHandler,
    StyleSheet,
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
        return (
            <View>
                <Text> ProfileDetails </Text>
            </View>
        )
    }

}
export default ProfileDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
});