import { createStackNavigator } from 'react-navigation';
import Login from './screens/Login';
import Registration from './screens/Registration';
import MainScreen from './screens/MainScreen';
import CreateProfile from './screens/CreateProfile';

const SignedOutRoutes = createStackNavigator({
    Login:{
        screen:Login,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
    Registration:{
        screen:Registration,
        navigationOptions: ({ navigation }) => ({
            header: null,        
        }),
    },
    CreateProfile:{
        screen:CreateProfile,
        navigationOptions: ({ navigation }) => ({
            header: null,        
        }),
    },
});
  
const SignedInRoutes = createStackNavigator({
    MainScreen:{
        screen:MainScreen,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
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
