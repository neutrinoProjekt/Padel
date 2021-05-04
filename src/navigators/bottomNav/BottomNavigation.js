/* eslint-disable react/display-name */
/* eslint-disable max-len */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeModNav from '../home/HomeModNav';
import PersonalPageNav from '../../screens/personPage/PersonalPageNav';
import Notifications from '../../screens/notifiactions/Notifications';
import TournamentHandler from '../../screens/tournaments/TournamentHandler';
import VictoryScreen from '../../screens/victory/VictoryScreen';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'HomeModNav') {
            iconName = 'home-outline';
            color = focused ? '#00CEB4' : '#707070';
        } else if (route.name === 'TournamentHandler') {
            iconName = 'trophy-outline';
            color = focused ? '#00CEB4' : '#707070';
        } else if (route.name === 'Notifications') {
            iconName = 'notifications-outline';
            color = focused ? '#00CEB4' : '#707070';
        } else if (route.name === 'Profile') {
            iconName = 'person-outline';
            color = focused ? '#00CEB4' : '#707070';
        }


        return <Ionicons name={iconName} size={size} color={color} />;
    },
});

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={screenOptions}
            tabBarOptions={{
                showLabel: false,
                style: {height: 80},
            }}
            initialRouteName="HomeModNav"
        >
            {/* <Tab.Screen name="Victory" component={VictoryScreen} /> */}
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="TournamentHandler" component={TournamentHandler} />
            <Tab.Screen name="Profile" component={PersonalPageNav} />
            <Tab.Screen name="HomeModNav" component={HomeModNav} />
        </Tab.Navigator>
    );
};

export default BottomNavigation;
