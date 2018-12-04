import React, { Component } from "react";
import { 
    View, 
    BackHandler,
    Image,
    StyleSheet
} from "react-native";
import { 
    CardItem, 
    Text, 
} from 'native-base';

class ProductDetails extends Component {
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
        var product = state.params ? state.params.product : undefined;
        return (
            <View style={styles.container}>
                <CardItem>
                    <Image source={{uri: product.photo}} style={styles.photo}/>
                </CardItem>
                <Text> Price {parseFloat(product.price).toFixed(2)} </Text>
            </View>
        )
    }

}
export default ProductDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    photo:{
        height: 200, 
        //width: null, 
        flex: 1,
    }
});