import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
} from "react-native";
import { getUserToken, onSignOut } from "../../AuthMethods";
import axios from 'axios';
import Error from './components/Error'
import HasProfile from './components/HasProfile'
import Loading from './components/Loading'
import NotProfile from './components/NotProfile'
import { API_URL } from 'react-native-dotenv'

class Profile extends Component {
    constructor(props) {
        super(props);
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
            this.loadScreen()
            
        })
        .catch(err => alert("Erro"));   
    }
    loadScreen = async () => {
        var get_profile_path = `${API_URL}/profiles/get_profile/`;
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
        this.props.navigation.navigate('Login')
    }
    handleOnNavigate = () => {
        this.setState({
          loading:false
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
                        />     
            }
            else{
                if(this.state.has_profile){
                    return <HasProfile
                                onPressSignOut={this.signOut}
                                photo={this.state.photo}
                                name={this.state.name}
                                email={this.state.email}
                            />
                }
                else{
                    return <NotProfile
                                onPressCreate={()=> this.props.navigation.navigate('CreateProfile')}
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