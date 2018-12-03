import React, { Component } from "react";
import { 
    Text,
} from "react-native";
import { getUserToken } from "../../../helpers/AuthMethods";
import axios from 'axios';
import Error from './screens/Error'
import Loading from './screens/Loading'
import AllProducts from './screens/products/AllProducts'
import { API_URL } from 'react-native-dotenv'
import { BackHandler } from 'react-native';

class Products extends Component {

    constructor(props) {
        super(props)
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            token:undefined,
            has_profile: false,
            loaded: false,
            has_error:false,
            error: 'Sem conexão',
        }
    }

    componentWillMount() {
        getUserToken()
        .then(res => {
            this.setState({ token: res });
            BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
            this.loadScreen();
        })
        .catch(err => alert(err));
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }
    loadScreen = async () => {
        var get_profile_path = `${API_URL}/profiles/update_profile/`;
        var self = this;
        axios.post(get_profile_path , {'token':this.state.token})
        .then (function (response) {
            self.setState({ showLoading: false });
            console.log('response.data', response.data);
            console.log('response.status', response.status);
            if(response.status>= 200 && response.status<300){
                self.setState({ has_profile: true, loaded: true })
            }
        })
        .catch(function (error) {
            console.log('error', error);
            if(!error.response){
                self.setState({ has_error: true,  loaded: true});
            }
            else{
                console.log('error.response', error.response);
                console.log('error.status', error.status);
                //Campo de nome
                if (error.response.status == 404){
                    self.setState({ loaded: true, has_profile: false,})
                }
                else{
                    self.setState({ loaded: true, error:error.response.data.error,  has_error: true})
                }
            }
        })
    }
    render() {
        if (!this.state.loaded) {
            return <Loading/>
        }
        else{
            if(this.state.has_error){
                return <Error
                            error = {this.state.error}
                            onPressSignOut={this.signOut}
                        />     
            }
            else{
                return <AllProducts
                            navigation = {this.props.navigation}
                        />
            }
        }
    }
}
export default Products;