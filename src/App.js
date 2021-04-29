/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'expo-status-bar';
import {AuthProvider} from './contexts/auth';
import Routes from './Routes';

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <StatusBar barStyle="dark-content"/>
                <Routes/>
            </NavigationContainer>
        </AuthProvider>
    );
};
