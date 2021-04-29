import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from './screens/home/StartScreen';
import LoginScreen from './screens/login/LoginScreen';
import Error from './screens/error/ErrorScreen';
import BottomNavigation from './screens/bottomNav/BottomNavigation';
import {RegistrationContainer} from './screens/registration/RegistrationContainer';
import {useAuth} from './contexts/auth';
import CreateTournamentScreen from './screens/tournament/CreateTournamentScreen';

const Stack = createStackNavigator();

export default function Routes() {
    const {currentUser, currentUserDoc} = useAuth();

    return currentUser === null ? (
        <Stack.Navigator screenOptions={{cardStyle: {backgroundColor: '#ffffff'}}}>
            <Stack.Screen
                name="CreateTournamentScreen"
                component={CreateTournamentScreen}
                options={{headerShown: false}}
             />
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
                name="Login"
                component={LoginScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    ) : currentUserDoc === null ? (
        <Stack.Navigator screenOptions={{cardStyle: {backgroundColor: '#ffffff'}}}>
            <Stack.Screen
                name="Error"
                component={Error}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    ) : (
        <Stack.Navigator screenOptions={{cardStyle: {backgroundColor: '#ffffff'}}}>
            <Stack.Screen
                name="PaddlePal"
                component={BottomNavigation}
                options={{headerTintColor: '#707070'}}
            />
        </Stack.Navigator>
    );
};
