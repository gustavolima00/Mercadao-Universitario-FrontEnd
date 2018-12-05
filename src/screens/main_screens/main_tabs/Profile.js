import React, { Component } from "react";
import { 
    StyleSheet,
    Text,
} from "react-native";
import {NavigationActions} from 'react-navigation'
import { getUserToken, onSignOut } from "../../../helpers/AuthMethods";
import axios from 'axios';
import Error from './screens/Error'
import BuyerProfile from './screens/profile/BuyerProfile'
import VendorProfile from './screens/profile/VendorProfile'
import Loading from './screens/Loading'
import NotProfile from './screens/profile/NotProfile'
import { API_URL } from 'react-native-dotenv'
import { BackHandler } from 'react-native';
import { 
    BUYER,
    VENDOR_NOT_APPROVED,
    VENDOR_APPROVED
} from './helpers/Requests'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            token:undefined,
            has_profile: false,
            profile_type: undefined,
            loaded: false,
            has_error:false,
            error: 'Sem conexão',
            photo: undefined,
            name: '',
            email: '',
        }
    }
    
    static navigationOption = {
        header: 'none',
    }
    componentDidMount(){
        this.loadScreen()
    }
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);  
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }
    loadScreen = async () => {
        await getUserToken()
        .then(res => {
            this.setState({ token: res });
        })
        .catch(err => alert(err)); 
        var get_profile_path = `${API_URL}/profiles/update_profile/`;
        var self = this;
        axios.post(get_profile_path , {'token':this.state.token})
        .then (function (response) {
            self.setState({ showLoading: false });
            console.log('response.data', response.data);
            console.log('response.status', response.status);
            if(response.status>= 200 && response.status<300){
                self.setState({ 
                    name: response.data.name,
                    photo: response.data.photo,
                    email: response.data.user.email,
                    profile_type: response.data.profile_type,
                    has_profile: true, 
                    loaded: true,
                })
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
    signOut = async () => {
        onSignOut()
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'TabNavigator' })], 0)
        this.props.navigation.navigate('Login')
    }
    createProfile = async () =>{
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'TabNavigator' })], 0)
        this.props.navigation.navigate('CreateProfile')
    }
    editProfile = async () =>{
        this.props.navigation.reset([NavigationActions.navigate({ routeName: 'TabNavigator' })], 0)
        this.props.navigation.navigate('EditProfile', { name:this.state.name, photo:this.state.photo })
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
                            onPressScreen={() => {
                                this.setState({ loaded:false, has_error:false }) 
                                this.loadScreen()
                            }}
                        />     
            }
            else{
                if(this.state.has_profile){
                    if(this.state.profile_type == BUYER)
                        return <BuyerProfile
                                    onPressSignOut={this.signOut}
                                    photo={this.state.photo}
                                    name={this.state.name}
                                    email={this.state.email}
                                    profile_type = {this.state.profile_type}
                                    onPressEditProfile={this.editProfile}
                                />
                    else if(this.state.profile_type == VENDOR_NOT_APPROVED || this.state.profile_type == VENDOR_APPROVED){
                        return <VendorProfile
                                    onPressSignOut={this.signOut}
                                    navigation = {this.props.navigation}
                                />
                    }
                    else{
                        return <Text>profile_type :{this.state.profile_type}</Text>
                    }
                }
                else{
                    return <NotProfile
                                onPressCreate={this.createProfile}
                                onPressSignOut={this.signOut}
                            />
                }
            }
        }
    }
}
export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
    }
});