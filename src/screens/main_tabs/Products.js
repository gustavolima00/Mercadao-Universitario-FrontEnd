import React, { Component } from "react";
import { 
    View, 
    Text,
} from "react-native";
import { BackHandler } from 'react-native';

class Products extends Component {

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }
    render() {
        return (
            <View>
                <Text> Products </Text>
            </View>
        )
    }

}
export default Products;