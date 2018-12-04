import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

export const NOT_PROFILE = 0;
export const BUYER = 1;
export const VENDOR_NOT_APPROVED = 2;
export const VENDOR_APPROVED = 3;

export const profileType = async ( token ) => {
    var get_profile_path = `${API_URL}/profiles/update_profile/`;
    var self = this;
    axios.post(get_profile_path , {'token' : token})
    .then (function (response) {    
        return response.data.profile_type
    })
    .catch(function (error) {
        console.log('error', error);
        if(!error.response){
            throw error;
        }
        else{
            if (error.response.status == 404){
                return NOT_PROFILE;
            }
            else{
                throw error;
            }
        }
    })
}