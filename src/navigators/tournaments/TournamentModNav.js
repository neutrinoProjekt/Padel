import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import CreateTournamentScreen from '../../screens/tournaments/CreateTournamentScreen';
import TournamentTopNav from './TournamentTopNav';
import SearchResults from '../../screens/tournaments/SearchResults';
import VictoryScreen from '../../screens/victory/VictoryScreen';
import TournamentDetailView from '../../screens/tournaments/TournamentDetailView';

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
            <ModalNavigator.Screen
                name="Search Results"
                component={SearchResults}
            />
            <ModalNavigator.Screen 
                name='TournamentDetails'
                component={TournamentDetailView}
            />
            <ModalNavigator.Screen
                name='VictoryScreen'
                component={VictoryScreen}
            />
        </ModalNavigator.Navigator>
    );
};

export default TournamentModNav;
