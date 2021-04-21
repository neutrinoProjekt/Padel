/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './src/screens/home/StartScreen';
import LoginScreen from './src/screens/registration/LoginScreen';
import EmailScreen from './src/screens/registration/EmailScreen';
import PasswordScreen from './src/screens/registration/PasswordScreen';
import FullNameScreen from './src/screens/registration/FullNameScreen';
const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#ffffff'}}}>
                <Stack.Screen name="Home" component={StartScreen} />
                <Stack.Screen name="Register" component={EmailScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Password" component={PasswordScreen} />
                <Stack.Screen name="FullName" component={FullNameScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {

    },
});
