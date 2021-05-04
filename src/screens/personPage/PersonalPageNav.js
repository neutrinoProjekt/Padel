import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import rankScreen from '../Rank/rankScreen';
import PersonPageScreen from './PersonPageScreen';

const ModalNavigator = createStackNavigator();

const PersonalPageNav = () => {
    return (
        <ModalNavigator.Navigator
            screenOptions={{headerShown: false}}
            transparent={true}
        >
            <ModalNavigator.Screen
                name='PersonalScreen'
                component={PersonPageScreen}
            >
            </ModalNavigator.Screen>
            <ModalNavigator.Screen
                name='RankView'
                component={rankScreen}
            >
            </ModalNavigator.Screen>
        </ModalNavigator.Navigator>
    );
};

export default PersonalPageNav;
