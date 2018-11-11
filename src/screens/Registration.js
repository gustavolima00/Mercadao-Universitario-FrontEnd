import { createStackNavigator } from 'react-navigation';
import CreateAccount from './registration_screens/CreateAccount';
import CreateProfile from './registration_screens/CreateProfile';

const Registration = createStackNavigator({
    CreateAccount:{
        screen:CreateAccount,
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
export default Registration;