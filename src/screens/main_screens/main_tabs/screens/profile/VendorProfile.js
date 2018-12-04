import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Image,
    ScrollView,
    RefreshControl,
} from "react-native";
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import ProductCard from '../../components/ProductCard'
import { 
    VENDOR_NOT_APPROVED,
    VENDOR_APPROVED
} from '../../helpers/Requests'
import { getUserToken } from "../../../../../helpers/AuthMethods";

export default class VendorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            products: [''],
            refreshing: true,
            token:undefined,
        };
    }
    componentWillMount(){
        this.loadProducts();
    }
     loadProducts = async () => {
        await getUserToken()
        .then(res => {
            this.setState({ token: res });
        })
        var all_products_path = `${API_URL}/products/user_products/`;
        var self = this;
        axios.post(all_products_path, {'token':this.state.token})
        .then (function (response) {
            self.setState({ refreshing: false });
            console.log('response.data', response.data);
            console.log('response.status', response.status);
            if(response.status>= 200 && response.status<300){
                self.setState({ products: response.data });
            }
        })
        .catch(function (error) {
            console.log('error', error);
            self.setState({ refreshing: false });
            alert(error);
        })
    }
    refreshProducts = async () => {
		this.setState({ refreshing: true });
		this.loadProducts();
	}
    render(){

        if(this.props.profile_type == VENDOR_NOT_APPROVED){
            message = 'Seu perfil de vendedor ainda não foi aprovado Pela nossa equipe, aguarde a aprovação.'
        }
        else if(this.props.profile_type == VENDOR_APPROVED){
            message = ''
        }
        return(
            <View style = {styles.container}>
                <ScrollView
                    style={styles.scroll}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.refreshProducts}
                        />
                    }
                >
                <Text style={styles.title}> Vendedor </Text>
                <Image
                    source={{ uri: this.props.photo }}
                    style={styles.photo}
                />
                <Text style={styles.text}> Nome: {this.props.name} </Text>
                <Text style={styles.text}> Email: {this.props.email} </Text>
                <View style={styles.buttons}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('EditProfile', { name:this.props.name, photo:this.props.photo})} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Edit Profile</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('CreateProduct')} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Criar produto</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.props.onPressSignOut} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>LOG OUT</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <Text style={styles.text}>{message}</Text>
                    {this.state.products.map((product, index) => {
                        vendor_name = product.vendor ? product.vendor.name:undefined;
                        vendor_photo = product.vendor ? product.vendor.photo:undefined;
                        return (
                            <ProductCard
                                key={index}
                                onPressCard={() => {this.props.navigation.navigate('EditProduct', { product:product, token:this.state.token })}}
                                productName={product.name}
                                vendorName={vendor_name}
                                vendorPhoto={vendor_photo}
                                productPhoto={product.photo}
                                productPrice={product.price}
                            />
                        );
                    })}
                </ScrollView>
            </View>

        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        //justifyContent: 'space-evenly',
    },
    buttons: {
        //flex: 1,
        //alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    scroll: {
        flex: 1,
        width: '100%'
        //alignItems: 'center',
        //flexDirection: 'row',
        //justifyContent: 'space-evenly',
    },
    title:{
        textAlign: 'center',
        fontSize: 20,
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