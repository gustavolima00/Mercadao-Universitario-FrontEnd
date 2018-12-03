import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import Orders from './main_tabs/Orders';
import Products from './main_tabs/Products';
import Profile from './main_tabs/Profile';
import Notifications from './main_tabs/Notifications';
import { YellowBox , Image, StyleSheet, View, Text } from 'react-native'
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])

const TabNavigator = createBottomTabNavigator({
    Products: {
        screen: Products,
        navigationOptions: {
            tabBarLabel: 'Produtos',
            tabBarIcon: ({ focused }) => (
                focused ? 
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/m2xBrIi.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Produtos </Text>
                </View>
                  :
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/FMHOMka.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Produtos </Text>
                </View>
            )
        }
    },
    Orders: {
        screen: Orders,
        navigationOptions: {
            tabBarLabel: 'Pedidos',
            tabBarIcon: ({ focused }) => (
                focused ? 
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/QXcVKIx.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Pedidos </Text>
                </View>
                  :
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/2PEJWWP.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Pedidos </Text>
                </View>
            )
        }
    },
    Notifications: {
        screen: Notifications,
        navigationOptions: {
            tabBarLabel: 'Notificações',
            tabBarIcon: ({ focused }) => (
                focused ? 
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/tlZburP.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Notificações </Text>
                </View> 
                  :
                <View style={styles.container}>
                <Image
                    source={{uri:'https://i.imgur.com/w7u3XBB.png'}}
                    style={styles.icon}
                />
                <Text style={styles.icon_text}> Notificações </Text>
                </View>
            )
        }
    },
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarLabel: 'Perfil',
            tabBarIcon: ({ focused }) => (
                focused ? 
                <View style={styles.container}>
                    <Image
                        source={{uri:'https://i.imgur.com/XAj2YjS.png'}}
                        style={styles.icon}
                    />
                    <Text style={styles.icon_text}> Perfil </Text>
                </View>
                  :
                <View style={styles.container}>
                <Image
                    source={{uri:'https://i.imgur.com/o1B0NuR.png'}}
                    style={styles.icon}
                />
                <Text style={styles.icon_text}> Perfil </Text>
                </View>
            )
        }
    }
},{
    tabBarOptions: {
        showIcon: true,
        showLabel: false,
        style: {
            //backgroundColor: '#49515f',
        },
        tabStyle: {
            height: 50,
        },
    },
    animationEnabled: true,
});

export default TabNavigator;
const styles = StyleSheet.create({
    icon: {
        width: 20, 
        height: 20,
        
    },
    icon_text: {
        textAlign: 'center',
        fontSize: 10,
    },
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'blue'
    }
  })