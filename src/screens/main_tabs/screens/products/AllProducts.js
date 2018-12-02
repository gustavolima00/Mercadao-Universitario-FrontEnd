import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	ScrollView,
	RefreshControl
} from 'react-native';
import axios from 'axios';

class AllProducts extends Component {
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
    loadProducts = async () => {
        var all_products_path = `${API_URL}/products/all_products/`;
        var self = this;
        axios.post(all_products_path)
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
		this.loadOffers();
	}
    render() {
		return (
			<View style={styles.container}>
				<ScrollView
					refreshControl={
						<RefreshControl
							refreshing={this.state.refreshing}
							onRefresh={this.refreshProducts}
						/>
					}
				>
					{this.state.products.map((product, index) => {
						return (
							<Text>
                                {product.photo}
								{product.name}
								{parseFloat(product.price).toFixed(2)}
                            </Text>
						);
					})}
				</ScrollView>
			</View>
		);
	}

}
export default AllProducts;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    }
});