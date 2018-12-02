import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from "react-native";

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
     
        };
    }
    render(){
        return(
            <View style = {styles.container}>
                <Text style={styles.text}>Carregando</Text>
                <ActivityIndicator size="large" />
            </View>

        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        margin: 10
    }
});