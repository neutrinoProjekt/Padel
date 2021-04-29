import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CreateTournamentScreen from './CreateTournamentScreen';
import TournamentTopNavigator from './TournamentTopNavigator';

const ModalNavigator = createStackNavigator();

const TournamentHandler = () => {
    return (
        <ModalNavigator.Navigator
            screenOptions = {{headerShown: false}}
            mode='modal'
            transparent={true}
        >
            <ModalNavigator.Screen
                name='TournamentTopNavigator'
                component={TournamentTopNavigator}
            />

            <ModalNavigator.Screen
                name='AddTournament'
                component={CreateTournamentScreen}
            />
        </ModalNavigator.Navigator>
    );
};

export default TournamentHandler;
