/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './screens/home/StartScreen';
import LoginScreen from './screens/login/LoginScreen';
import {RegistrationContainer} from './screens/registration/RegistrationContainer';
import {AuthProvider} from './contexts/auth';
import PersonPageScreen from './screens/PersonPageScreen';


const Stack = createStackNavigator();

export default function App() {
    return (
        <AuthProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#ffffff'}}}>
                    <Stack.Screen name="PersonalPage" component={PersonPageScreen}/>
                    {/**<Stack.Screen name="Home" component={StartScreen} />
                    <Stack.Screen name="Registration" component={RegistrationContainer} />
                    <Stack.Screen name="Login" component={LoginScreen}/>**/}
                    
                </Stack.Navigator>
            </NavigationContainer>
        </AuthProvider>
    );
};
