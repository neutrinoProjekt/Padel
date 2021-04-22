import React from 'react';
// eslint-disable-next-line no-unused-vars
import {StyleSheet, Text, View} from 'react-native';
// import {NavigatorContainer} from '@react-navigation/stack';
// import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import PersonPageScreen from "./src/screens/PersonPageScreen";

// const Stack = createStackNavigator();

export default function App() {
    return (
        <PersonPageScreen />
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
