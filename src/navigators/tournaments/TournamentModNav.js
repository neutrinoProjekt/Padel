import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import CreateTournamentScreen from '../../screens/tournaments/CreateTournamentScreen';
import TournamentTopNav from './TournamentTopNav';

const ModalNavigator = createStackNavigator();

const TournamentModNav = () => {
    const globalHeaderStyle = {
        headerStyle: {backgroundColor: 'white'},
        headerTitleStyle: {color: '#707070'},
        headerTintColor: '#707070',
    };

    return (
        <ModalNavigator.Navigator
            screenOptions = {globalHeaderStyle}
            mode='modal'
            transparent={true}
        >
            <ModalNavigator.Screen
                name='Tournaments'
                component={TournamentTopNav}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {alignSelf: 'center'},
                }}
            />

            <ModalNavigator.Screen
                name='AddTournament'
                component={CreateTournamentScreen}
            />
        </ModalNavigator.Navigator>
    );
};

export default TournamentModNav;
