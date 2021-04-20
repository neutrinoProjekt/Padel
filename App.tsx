import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import {NavigatorContainer} from '@react-navigation/stack';
// import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';

// const Stack = createStackNavigator();

export default function App() {
    return (
        <LoginScreen />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
