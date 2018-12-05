import { AsyncStorage } from 'react-native';
export const TOKEN_KEY = "@tokenKey:key";
import axios from 'axios';
import { API_URL } from 'react-native-dotenv'

export const onSignIn = async (token) => {
    try{
        await AsyncStorage.setItem(TOKEN_KEY, token);
        updateLocation(token);
        console.log('Saved on Storage.')
    }
        catch(exception) {
        console.log('Fail to Save on Storage.')
    }
}

export const onSignOut = async () => {
    try {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        clearLocation(token)
        await AsyncStorage.removeItem(TOKEN_KEY);
        console.log('Storage Removed.')
        return true;
    }
    catch(exception) {
        console.log('Fail to Remove Storage.')
        return false;
    }
}

export const isSignedIn = async () => {
    try{
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return (token !== null) ? true : false;
    }
    catch(exception){
        console.log('Fail to check if is signed in.')
        return false;
    }
};

export const getUserToken = async () => {
    try{
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log('TOKEN', token)
        if(token){
            return token
        }
        else{
            return null;
        }
    }
    catch(exception){
        console.log('Fail to get user token.')
        return null;
    }
};

export const updateLocation = (token) => {
    this.watchID = navigator.geolocation.watchPosition(
        position => {
            const { latitude, longitude } = position.coords;
            console.log('latitude', latitude)
            console.log('longitude', longitude)

            const update_location_path = `${API_URL}/profiles/update_location/`;
            axios.post(update_location_path , {'token':token, 'latitude':latitude, 'longitude':longitude })
            .then (function (response) {
                console.log('response.data', response.data);
                console.log('response.status', response.status);
                navigator.geolocation.clearWatch(watchID);
                navigator.geolocation.stopObserving();
            })
            .catch(function (error) {
                console.log('error', error);
                navigator.geolocation.clearWatch(watchID);
                navigator.geolocation.stopObserving();
            })        
        },
        error => console.log('error', error),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
}
export const clearLocation = (token) => {
    const clear_location_path = `${API_URL}/profiles/clear_location/`;
    axios.post(clear_location_path , {'token':token})
    .then (function (response) {
        console.log('response.data', response.data);
        console.log('response.status', response.status);
        navigator.geolocation.clearWatch(watchID);
        navigator.geolocation.stopObserving();
    })
    .catch(function (error) {
        console.log('error', error);
        navigator.geolocation.clearWatch(watchID);
        navigator.geolocation.stopObserving();
    })
}