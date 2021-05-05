import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CreateTournamentScreen from './CreateTournamentScreen';
import TournamentNavigator from './TournamentNavigator';

const ModalNavigator = createStackNavigator();

const TournamentHandler = () => {
    return (
        <ModalNavigator.Navigator
            screenOptions = {{headerShown: false}}
            mode='modal'
            transparent={true}
        >
            <ModalNavigator.Screen
                name='TournamentNavigator'
                component={TournamentNavigator}
            />

            <ModalNavigator.Screen
                name='AddTournament'
                component={CreateTournamentScreen}
            />
        </ModalNavigator.Navigator>
    );
};

export default TournamentHandler;
