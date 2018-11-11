import React, { Component } from "react";
import { 
    View, 
    StyleSheet,
    TouchableHighlight,
    Image,
    Alert
} from "react-native";
import { 
    Text, 
} from 'native-base';
import LoginFields from '../../components/LoginFields';
import AwesomeAlert from 'react-native-awesome-alerts';
import { onSignIn } from "../../AuthMethods";
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'
import { BackHandler } from 'react-native';
import { Item, Input, Label, Form } from 'native-base';
import ImagePicker from 'react-native-image-picker';


class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
          name: '', showAlert:false, showLoading:false,
          photo: 'https://i.imgur.com/UWQ0GOq.png',
        };
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        BackHandler.exitApp();
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
    create_profile = () => {
        Alert.alert('Você apertou o botão')
    }

    render() {
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
                <View style={styles.fieldView}>
                    <Form>
                        <Item floatingLabel>
                            <Label style={styles.field}>Nome</Label>
                            <Input 
                                style={{color: 'black'}}
                                onChangeText={(name) => this.setState({name})}
                            />
                        </Item>
                    </Form>
                </View>
                <View style={styles.buttons}>
                    <TouchableHighlight onPress={this.create_profile} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>CRIAR PERFIL</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <AwesomeAlert
                    show={this.state.showLoading}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    title={"Carregando"}
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
export default CreateProfile;

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