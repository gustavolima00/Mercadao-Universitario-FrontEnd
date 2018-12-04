import React, { Component } from "react";
import { 
    View, 
    BackHandler,
    Image,
    StyleSheet,
    TouchableHighlight,
    Animated,
    Keyboard,
    KeyboardAvoidingView,
} from "react-native";
import { 
    CardItem, 
    Form, 
    Item, 
    Input, 
    Label,
    Text
} from 'native-base';

import { getUserToken } from '../../../helpers/AuthMethods'
import Field from '../../../components/Field'
import ImagePicker from 'react-native-image-picker';
import AwesomeAlert from 'react-native-awesome-alerts';
import { API_URL } from 'react-native-dotenv'
import axios from 'axios';

const IMAGE_HEIGHT = 250
const IMAGE_HEIGHT_SMALL=30

export default class EditProduct extends Component {

    constructor(props) {
        super(props)
        const {state} = this.props.navigation;
        this.state = {
            token: state.params ? state.params.token : undefined,
            name: undefined,
            price: undefined,
            photo: undefined,
            showLoading: false, showAlert:false, showSucess:false, showError:false,
            title:undefined,
            error_message:undefined,
            sucess_message:undefined,
        }
        this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
    }
    componentDidMount(){
        this.loadScreen();
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }
    loadScreen = async () => {
        await getUserToken()
        .then(res => {
            this.setState({ token: res });
        })
    }
    backPressed = () => {
        this.props.navigation.goBack();
        return true;
    }
    showAlert = () => {
        this.setState({
            showError: true,
        });
    };
    
    hideAlert = () => {
        this.setState({
            showError: false,
            showSucess: false,
            showAlert: false,
        });
    };
    _keyboardDidShow = (event) => {
        Animated.timing(this.imageHeight, {
            duration: 400,
            toValue: IMAGE_HEIGHT_SMALL,
        }).start();
    }

    _keyboardDidHide = (event) => {
        Animated.timing(this.imageHeight, {
            duration: 400,
            toValue: IMAGE_HEIGHT,
        }).start();
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

    editProduct = async () => {
        //this.setState({ showAlert: false });
        const {state} = this.props.navigation;
        var product = state.params ? state.params.product : undefined
        this.setState({ showLoading: true });
        const create_product_path = `${API_URL}/products/edit_product/`;

        var self = this;
        axios.post(create_product_path ,{
            'token': this.state.token,
            'name': this.state.name,
            'price': this.state.price,
            'photo': this.state.photo,
            'product_id': product.id
        })
        .then (function (response) {
            self.setState({ showLoading: false });
            console.log('response.data', response.data);
            console.log('response.status', response.status);
            if(response.status>= 200 && response.status<300){
                self.setState({ showSucess: true , sucess_message: 'Produto editado com sucesso'});   
            }
        })
        .catch(function (error) {
            console.log('error', error);
            if(error.response)
                self.setState({ showError: true , title:'Erro', error_message:'Erro na requisição. Atenção, o campo de preço deve conter ponto e não vírgula'});
            else
                self.setState({ showError: true , title:'Erro', error_message:'Erro de conexão. Tente novamente'});
            self.setState({ showLoading: false });
            setTimeout(() => {}, 50);
		})
    }
    
    deleteProduct = async () => {
        //this.setState({ showAlert: false });
        const {state} = this.props.navigation;
        var product = state.params ? state.params.product : undefined
        this.setState({ showLoading: true });
        const delete_product_path = `${API_URL}/products/delete_product/`;

        var self = this;
        axios.post(delete_product_path ,{
            'token': this.state.token,
            'product_id': product.id
        })
        .then (function (response) {
            self.setState({ showLoading: false });
            console.log('response.data', response.data);
            console.log('response.status', response.status);
            if(response.status>= 200 && response.status<300){
                self.setState({ showSucess: true , sucess_message: 'Produto deletado com sucesso'});   
            }
        })
        .catch(function (error) {
            console.log('error', error);
            if(error.response)
                self.setState({ showError: true , title:'Erro', error_message:'Erro inesperado. Tente novamente'});
            else
                self.setState({ showError: true , title:'Erro', error_message:'Erro de conexão. Tente novamente'});
            self.setState({ showLoading: false });
            setTimeout(() => {}, 50);
		})
    }

    render() {
        const {state} = this.props.navigation;
        var product = state.params ? state.params.product : undefined
        var DEFAULT_PHOTO = product.photo ? product.photo : 'https://bigriverequipment.com/wp-content/uploads/2017/10/no-photo-available.png';
        var name = product.name ? product.name : undefined
        var price = product.price ? product.price : undefined
        if(this.state.photo)
            photo=this.state.photo
        else    
            photo=DEFAULT_PHOTO

        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <TouchableHighlight onPress={this.update_photo}>
                    <CardItem>
                        <Animated.Image source={{uri: photo}} style={[styles.photo, { height: this.imageHeight }]}/>
                    </CardItem>
                </TouchableHighlight>
                <Text style={styles.info}> Clique na imagem para editala </Text>
                <Form>
                    <Item stackedLabel>
                        <Label>Nome (Nome antigo {name})</Label>
                        <Input 
                            onChangeText={(name) => {
                                this.setState({name})
                            }}
                        />
                    </Item>
                    <Item stackedLabel last>
                        <Label>Preço (Valor antigo: {price})</Label>
                        <Input
                            onChangeText={(price) => {
                                this.setState({price})
                            }}
                            keyboardType='numeric'
                        />
                    </Item>
                    <Text style={styles.info} > O campo de preço deve conter ponto, e não vírgula </Text>
                </Form>
                <View style={styles.buttons}>
                    <TouchableHighlight onPress={this.editProduct} underlayColor="white">
                        <View style={styles.button}>
                            <Text style={styles.buttonText}> Editar Produto </Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => this.setState({showAlert:true})} underlayColor="white">
                        <View style={styles.delete_button}>
                            <Text style={styles.buttonText}> Deletar produto </Text>
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
                    show={this.state.showError}
                    title={this.state.title}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    message={this.state.error_message}
                    showCancelButton
                    cancelText="OK"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                />
                <AwesomeAlert
                    show={this.state.showSucess}
                    title={'Sucesso'}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    message={this.state.sucess_message}
                    showCancelButton
                    cancelText="OK"
                    onCancelPressed={() => {
                        this.hideAlert();
                        this.props.navigation.navigate('Profile');
                    }}
                />
                <AwesomeAlert
                    show={this.state.showAlert}
                    title="Alerta"
                    message="Você tem certeza que deseja deltar o produto?"
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={true}
                    showConfirmButton={true}
                    cancelText="Não, Voltar"
                    confirmText="Sim, Deletar"
                    confirmButtonColor="#DD6B55"
                    onCancelPressed={() => {
                        this.hideAlert();
                    }}
                    onConfirmPressed={() => {
                        this.hideAlert();
                        this.deleteProduct();
                    }}
                />
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    photo:{
        padding: 5,
        flex: 1,
    },
    buttons: {
        //flex: 1,
        //alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    photo_container:{
        height: 100,
        width: null,
        flex: 1
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
    delete_button: {
        margin: 10,
        //height: 50,
        width: 130,
        alignItems: 'center',
        backgroundColor: 'red',
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
    info: {
        fontSize: 12,
        paddingBottom: 12,
        //color: 'white',
        //fontWeight: 'bold',
    },
});