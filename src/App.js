/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './screens/home/StartScreen';
import LoginScreen from './screens/login/LoginScreen';
import BottomNavigation from './screens/bottomNav/BottomNavigation';
import {RegistrationContainer} from './screens/registration/RegistrationContainer';
import VictoryScreen from './screens/victory/VictoryScreen';
import {StatusBar} from 'expo-status-bar';
import {AuthProvider} from './contexts/auth';
import Routes from './Routes';

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#ffffff'}}}>
                    {/** <Stack.Screen name="Home" component={StartScreen} />
                    <Stack.Screen name="Registration" component={RegistrationContainer} />
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="PaddlePal" component={BottomNavigation}/>**/}
                    <Stack.Screen name="Victory" component={VictoryScreen}/>

                </Stack.Navigator>
                <StatusBar barStyle="dark-content"/>
                <Routes/>
            </NavigationContainer>
        </AuthProvider>
    );
};
