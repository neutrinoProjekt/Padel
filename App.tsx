import React from 'react';
// eslint-disable-next-line no-unused-vars
import {StyleSheet, Text, View} from 'react-native';
// import {NavigatorContainer} from '@react-navigation/stack';
// import {createStackNavigator} from '@react-navigation/stack';
// import LoginScreen from './src/screens/LoginScreen';
import PersonalAccount from "./src/screens/PersonalAccount";
import LoginScreen from "./src/screens/LoginScreen";

// const Stack = createStackNavigator();

export default function App() {
    return (
        <PersonalAccount />
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
