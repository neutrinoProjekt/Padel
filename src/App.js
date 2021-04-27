/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar} from 'expo-status-bar';
import StartScreen from './screens/home/StartScreen';
import EmailScreen from './screens/registration/EmailScreen';
import PasswordScreen from './screens/registration/PasswordScreen';
import FullNameScreen from './screens/registration/FullNameScreen';
import UsernameScreen from './screens/registration/UsernameScreen';
import LoginScreen from './screens/login/LoginScreen';

import Notifications from './screens/notifiactions/Notifications';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

const Stack = createStackNavigator();

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <StatusBar barStyle="dark-content"/>
                <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#ffffff'}}}>
                    <Stack.Screen name="Home" component={StartScreen} />
                    <Stack.Screen name="Registration" component={RegistrationContainer} />
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="PaddlePal" component={BottomNavigation}/>
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
};