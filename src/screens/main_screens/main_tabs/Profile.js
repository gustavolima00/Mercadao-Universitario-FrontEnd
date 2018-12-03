import React, { Component } from "react";
import { 
    StyleSheet,
} from "react-native";
import {NavigationActions} from 'react-navigation'
import { getUserToken, onSignOut } from "../../../AuthMethods";
import axios from 'axios';
import Error from './screens/Error'
import HasProfile from './screens/profile/HasProfile'
import Loading from './screens/Loading'
import NotProfile from './screens/profile/NotProfile'
import { API_URL } from 'react-native-dotenv'
import { BackHandler } from 'react-native';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            token:undefined,
            has_profile: false,
            loaded: false,
            photo: undefined,
            name: '',
            email: '',
            has_error:false,
            error: 'Sem conexão',
        }
    }
    
    static navigationOption = {
        header: 'none',
    }
    componentWillMount(){
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
                self.setState({ 
                    name: response.data.name,
                    photo: response.data.photo,
                    email: response.data.user.email,
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
                        />     
            }
            else{
                if(this.state.has_profile){
                    return <HasProfile
                                onPressSignOut={this.signOut}
                                photo={this.state.photo}
                                name={this.state.name}
                                email={this.state.email}
                                onPressEditProfile={this.editProfile}
                            />
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