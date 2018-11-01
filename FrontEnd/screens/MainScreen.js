import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button
} from "react-native";

class MainScreen extends Component {

    static navigationOption = {
        header: 'none'
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Welcome
                </Text>
                <Button title='Back' onPress={() => this.props.navigation.navigate('LoginScreen')}/>
            </View>
        );
    }
}
export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    }
});