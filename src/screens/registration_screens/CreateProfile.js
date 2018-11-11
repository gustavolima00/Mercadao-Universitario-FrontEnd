import React, { Component } from "react";
import { 
    View, 
    StyleSheet,
    TouchableHighlight,
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

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
          name: '', showAlert:false, showLoading:false,
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

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.text_box}>
                    <Text style={styles.text}>
                        Tela destinada para criação do perfil
                    </Text>
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
});