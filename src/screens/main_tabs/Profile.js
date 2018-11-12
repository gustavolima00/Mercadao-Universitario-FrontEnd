import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet,
    Button,
} from "react-native";
import { getUserToken, onSignOut } from "../../AuthMethods";
import axios from 'axios';
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
                    console.log('Passou no erro ')
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
        const { has_profile, loaded, profile, has_conection} = this.state;
        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <Text>
                        Carregando
                    </Text>
                </View>
            );
        }
        else{
            if(!this.state.has_conection){
                return(
                    <View style={styles.container}>
                        <Text>
                            Sem conexão
                        </Text>
                    </View>
                );      
            }
            else{
                if(this.state.has_profile){
                    return (
                        <View style={styles.container}>
                            <Text>
                                Tem perfil
                            </Text>
                            <Button title='LogOut' onPress={this.signOut}/>
                        </View>
                    );
                }
                else{
                    return(
                        <View style={styles.container}>
                            <Text>
                                Sem perfil
                            </Text>
                            <Button title='LogOut' onPress={this.signOut}/>
                        </View>
                    );
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