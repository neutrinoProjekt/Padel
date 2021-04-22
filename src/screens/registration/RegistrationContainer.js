/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import EmailScreen from './EmailScreen';
import PasswordScreen from './PasswordScreen';
import FullNameScreen from './FullNameScreen';
import UsernameScreen from './UsernameScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from '../../contexts/auth';

const Stack = createStackNavigator();
export const RegistrationContainer = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {signup} = useAuth();

   /* useEffect(() => {
        console.log(password);
        signup(email, password);
    }, [password]);*/

    return (
        <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#ffffff'}}}>
            <Stack.Screen name="Email" component={EmailScreen} initialParams={{setEmail: setEmail}}/>
            <Stack.Screen name="FullName" component={FullNameScreen} initialParams={{setFullname: setFullname}}/>
            <Stack.Screen name="Username" component={UsernameScreen} initialParams={{setUsername: setUsername}}/>
            <Stack.Screen name="Password" component={PasswordScreen} initialParams={{setPassword: setPassword}}/>
        </Stack.Navigator>
    );
};

const styles = StyleSheet.create({});
