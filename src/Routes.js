import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './screens/landing/StartScreen';
import {LoginContainer} from './screens/login/LoginContainer';
import Error from './screens/error/ErrorScreen';
import BottomNavigation from './navigators/bottomNav/BottomNavigation';
import {RegistrationContainer} from './screens/registration/RegistrationContainer';
import {useAuth} from './contexts/auth';

const Stack = createStackNavigator();

export default function Routes() {
    const {currentUser, currentUserDoc} = useAuth();

    return currentUser === null ? (
        <Stack.Navigator screenOptions={{cardStyle: {backgroundColor: '#ffffff'}}}>
            <Stack.Screen
                name="Home"
                component={StartScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Registration"
                component={RegistrationContainer}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="LoginContainer"
                component={LoginContainer}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    ) : (
        <Stack.Navigator screenOptions={{cardStyle: {backgroundColor: '#ffffff'}}}>
            <Stack.Screen
                name="PaddlePal"
                component={BottomNavigation}
                options={{headerTintColor: '#707070', headerShown: false}}
            />
        </Stack.Navigator>
    );
};
