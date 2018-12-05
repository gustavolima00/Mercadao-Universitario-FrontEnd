import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
    RefreshControl,
} from 'react-native';
import { 
    Container, 
    Header, 
    Item, 
    Input, 
    Icon, 
    Button, 
    Text 
} from 'native-base';
import axios from 'axios';
import { API_URL } from 'react-native-dotenv';
import ProductCard from '../../components/ProductCard';

export default class VendorAllProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [''],
            refreshing: true,
        }
    }
    componentWillMount(){
        this.loadProducts();
    }
    loadProducts(){
        var all_products_path = `${API_URL}/products/all_products/`;
        var self = this;
        axios.get(all_products_path)
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
    searchProducts(input){
        var search_products_path = `${API_URL}/products/search_products/`;
        var self = this;
        axios.post(search_products_path, {'name':input})
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
    render() {
        if(this.state.products.length>0)
            return (
                <View style={styles.container}>
                    <Header searchBar rounded>
                        <Item>
                            <Icon name="ios-search" />
                            <Input 
                                placeholder="Pesquisar" 
                                onChangeText={(name) => {
                                    this.searchProducts(name)
                                }}
                            />
                        </Item>
                        <Button>
                            <Text>Pesquisar</Text>
                        </Button>
                    </Header>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.refreshProducts}
                            />
                        }
                    >
                        {this.state.products.map((product, index) => {
                            vendor_name = product.vendor ? product.vendor.name:undefined;
                            vendor_photo = product.vendor ? product.vendor.photo:undefined;
                            return (
                                <ProductCard
                                    key={index}
                                    onPressVendorPhoto={() => {this.props.navigation.navigate('ProfileDetails', {user:product.vendor, title: vendor_name})}}
                                    onPressCard={() => {this.props.navigation.navigate('ProductDetails', {product:product, title: product.name})}}
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
        else 
            return (
                <View style={styles.container}>
                    <Header searchBar rounded>
                        <Item>
                            <Icon name="ios-search" />
                            <Input 
                                placeholder="Pesquisar" 
                                onChangeText={(name) => {
                                    this.searchProducts(name)
                                }}
                            />
                        </Item>
                        <Button>
                            <Text>Pesquisar</Text>
                        </Button>
                    </Header>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this.refreshProducts}
                            />
                        }
                    >
                    <Text style={styles.text}> Não foram encontrados produtos :(</Text>
                    </ScrollView>
                </View>
            );
	}

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    text:{
        textAlign: 'center',
        fontSize: 20,
    }
});