import { createStackNavigator } from 'react-navigation';
import ProductDetails from './main_screens/ProductDetails'
import ProfileDetails from './main_screens/ProfileDetails'
import EditProfile from './main_screens/EditProfile'
import TabNavigator from './main_screens/TabNavigator'


const MainScreen = createStackNavigator({
    TabNavigator:{
        screen:TabNavigator,
        navigationOptions: ({ navigation }) => ({
            header: null,
        }),
    },
    ProfileDetails:{
        screen:ProfileDetails,
    },
    ProductDetails:{
        screen:ProductDetails,
    },
    EditProfile:{
        screen:EditProfile,
        navigationOptions: ({ navigation }) => ({
            title: 'Edição do perfil',
        }),
    },
});

export default MainScreen;