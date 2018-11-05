import { createStackNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainScreen from './screens/MainScreen';

const SignedOutRoutes = createStackNavigator({
    LoginScreen:{
        screen:LoginScreen,
        navigationOptions: ({ navigation }) => ({
        header: null,

        }),
    },
    SignUpScreen:{
        screen:SignUpScreen,
        navigationOptions: ({ navigation }) => ({
        header: null,
        }),
    },
});
  
const SignedInRoutes = createStackNavigator({
    MainScreen:{
        screen:MainScreen,
    },
});

export const RootNavigator = (signedIn = false) => {
    return createStackNavigator({
        SignedIn: { screen: SignedInRoutes },
        SignedOut: { screen: SignedOutRoutes }
    },
    {
        headerMode: "none",
        mode: "modal",
        initialRouteName: signedIn ? "SignedIn" : "SignedOut",
        navigationOptions: {
            gesturesEnabled: false
        }
    });
};
