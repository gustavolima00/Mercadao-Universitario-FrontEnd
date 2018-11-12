import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
} from "react-native";

export default class Error extends Component {
    constructor(props) {
        super(props);
        this.state = {
          error: 'Erro indefinido'
        };
    }
    render(){
        return(
            <View style = {styles.container}>
                <Text> {this.props.error} </Text>
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