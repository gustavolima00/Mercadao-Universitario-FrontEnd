import React, { Component } from "react";
import { 
    View, 
    Text,
    BackHandler,
} from "react-native";

class ProductDetails extends Component {
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
                <Text> ProductDetails </Text>
            </View>
        )
    }

}
export default ProductDetails;