import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TopNavigator from '../topNav/TopNavigator';
import AddMatchScreen from './AddMatchScreen';

const ModalNavigator = createStackNavigator();

const HomeScreen = () => {
    return (
        <ModalNavigator.Navigator
            screenOptions={{headerShown: false}}
            mode='modal'
            transparent={true}
        >
            <ModalNavigator.Screen
                name='TopNavigator'
                component={TopNavigator}
            >
            </ModalNavigator.Screen>
            <ModalNavigator.Screen
                name='Add Match'
                component={AddMatchScreen}
            >
            </ModalNavigator.Screen>
        </ModalNavigator.Navigator>
    );
};

export default HomeScreen;
