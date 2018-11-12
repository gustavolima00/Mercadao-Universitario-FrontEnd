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
            profile: undefined,
            has_conection:true,
        }
    }
    
    static navigationOption = {
        header: 'none',
    }
    componentWillMount(){
        getUserToken()
        .then(res => {
            this.setState({ token: res });
            var get_profile_path = `${API_URL}/profiles/get_profile/`;
            var self = this;
            axios.post(get_profile_path , {'token':this.state.token})
            .then (function (response) {
                self.setState({ showLoading: false });
                console.log('response.data', response.data);
                console.log('response.status', response.status);
                if(response.status>= 200 && response.status<300){
                    self.setState({ profile: response.data, has_profile: true, loaded: true})
                }
            })
            .catch(function (error) {
                console.log('error', error);
                if(!error.response){
                    self.setState({ has_conection: false,  loaded: true});
                }
                else{
                    console.log('error.response', error.response);
                    console.log('error.status', error.status);
                    //Campo de nome
                    if (error.response.status == 404){
                        self.setState({ loaded: true, has_profile: false,})
                    }
                    else{
                        //self.setState({ loaded: true})
                    }
                }
            })
            
        })
        .catch(err => alert("Erro"));
        
    }
    signOut = async () => {
        onSignOut()
        this.props.navigation.navigate('Login')
    }
    render() {
        if (!this.state.loaded) {
            return <Loading/>
        }
        else{
            if(!this.state.has_conection){
                return <Error
                            error = 'Sem Conexão'
                        />     
            }
            else{
                if(this.state.has_profile){
                    return <HasProfile/>
                }
                else{
                    return <NotProfile/>
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