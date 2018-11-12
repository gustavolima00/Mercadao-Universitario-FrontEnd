import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
} from "react-native";

export default class HasProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <View style = {styles.container}>
                <Text> Tem perfil </Text>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    }
});