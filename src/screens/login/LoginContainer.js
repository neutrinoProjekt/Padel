/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import ForgotYourPasswordScreen from './ForgotYourPasswordScreen';
import LoginScreen from './LoginScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {RegistrationContainer} from '../registration/RegistrationContainer';
import {useAuth} from '../../contexts/auth';
import SuccessPopup from '../../components/SuccessPopup';

const Stack = createStackNavigator();
export const LoginContainer = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {signup} = useAuth();


    return (
        <Stack.Navigator mode='modal' screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#ffffff'}}}>
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name="ForgotYourPasswordScreen" component={ForgotYourPasswordScreen} options={{headerShown: false}}/>
            <Stack.Screen name="SuccessPopup" component={SuccessPopup} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({});
