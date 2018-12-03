import React, { Component } from "react";
import { 
    View, 
    StyleSheet,
    TouchableHighlight,
    Image,
} from "react-native";
import { 
    Text, 
} from 'native-base';
import Field from '../../components/Field';
import AwesomeAlert from 'react-native-awesome-alerts';
import { getUserToken } from "../../AuthMethods";
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import { BackHandler } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import TypeSelection from '../../components/TypeSelection'

class EditProfile extends Component {
    constructor(props) {
        super(props);
        const {state} = this.props.navigation;
        var DEFAULT_PHOTO = state.params ? state.params.photo : 'https://i.imgur.com/UWQ0GOq.png';
        this.state = {
          name: '', showAlert:false, showLoading:false,
          photo: DEFAULT_PHOTO,
          token: undefined,
          name_field_alerts:[''],
          name_field_is_bad:false,
        };
    }
    componentWillMount() {
        getUserToken()
        .then(res => {
            this.setState({ token: res });
            BackHandler.addEventListener('hardwareBackPress', this.backPressed);
        })
        .catch(err => alert("Erro"));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
    }

    backPressed = () => {
        this.props.navigation.navigate('Profile');
        return true;
    }

    update_photo = () => {
        //Alert.alert('Você apertou a imagem')
        const options = {
            title: 'Selecionar foto',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } 
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                //const source = { uri: response.uri };
                // You can also display the image using data:
                const source = 'data:image/jpeg;base64,' + response.data;
                this.setState({ photo: source });
            }
          });
    }
    edit_profile = () => {
        //Alert.alert('Você apertou o botão')
        this.setState({ showLoading: true });
        var update_profile_path = `${API_URL}/profiles/update_profile/`;

        var self = this;
        if(this.state.photo==DEFAULT_PHOTO){
            var data = {
                'name': this.state.name,
                'token': this.state.token, 
            }
        }
        else{
            var data = {
                'name': this.state.name,
                'photo': this.state.photo,
                'token': this.state.token, 
            }
        }
        axios.post(update_profile_path , data)
        .then (function (response) {
            self.setState({ showLoading: false });
            console.log('response.data', response.data);
            console.log('response.status', response.status);
            if(response.status>= 200 && response.status<300){
                self.props.navigation.navigate('Profile');
            }
        })
        .catch(function (error) {
            console.log('error', error);
            if(!error.response){
                self.setState({ showAlert: true });
            }
            else{
                console.log('error.response', error.response);
                console.log('error.status', error.status);
                //Campo de nome
                if (error.response.data.name != undefined){
                    self.setState({ name_field_alerts: error.response.data.name})
                    self.setState({ name_field_is_bad: true })
                }
                else{
                    self.setState({ name_field_alerts: ['']})
                    self.setState({ name_field_is_bad: false })
                }
            }
            self.setState({ showLoading: false });
            setTimeout(() => {}, 50);
        })

    }

    render() {
        const {state} = this.props.navigation;
        var name = state.params ? state.params.name : undefined;
        
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.update_photo} style={styles.view_circle}>
                    <View>
                      <Image
                        source={{ uri: this.state.photo }}
                        style={styles.photo}
                      />
                    </View>
                </TouchableHighlight>
                <Field
                    placeholder={name}
                    onChangeText={(name) => {
                        this.setState({ showLoading: false });
                        this.setState({name})
                    }}
                    fieldAlert={this.state.name_field_alerts}
                    badInput={this.state.name_field_is_bad}
                    keyExtractor='name'
                />
                <View style={styles.buttons}>
                    <TouchableHighlight onPress={this.edit_profile} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>Editar Perfil</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <AwesomeAlert
                    show={this.state.showLoading}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    title={"Editando Perfil"}
                    showProgress
                />
                <AwesomeAlert
                    show={this.state.showAlert}
                    title="Erro"
                    message="Não foi possível se comunicar com o servidor"
                />
            </View>
        );
    }
}
export default EditProfile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: 'powderblue',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    photo: {
        width: 150, 
        height: 150, 
        borderRadius: 150/2, 
        //position: 'absolute'
    },
    view_circle: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        borderRadius: 150 / 2,
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
    field: {
        color: '#49515f',
        //borderWidth: 2,
    },
    fieldView: {
        height:100,
        width: '90%',
        //alignItems: 'center',
        justifyContent: 'center',
    }
});