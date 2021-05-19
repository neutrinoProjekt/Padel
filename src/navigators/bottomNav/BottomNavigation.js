/* eslint-disable react/display-name */
/* eslint-disable max-len */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeModNav from '../home/HomeModNav';
import PersonalModNav from '../profile/PersonalModNav';
import NotificationsModNav from '../notifications/NotificationsModNav';
import TournamentModNav from '../tournaments/TournamentModNav';
import VictoryScreen from '../../screens/victory/VictoryScreen';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'HomeModNav') {
            iconName = 'home-outline';
            color = focused ? '#00CEB4' : '#707070';
        } else if (route.name === 'TournamentModNav') {
            iconName = 'trophy-outline';
            color = focused ? '#00CEB4' : '#707070';
        } else if (route.name === 'NotificationsModNav') {
            iconName = 'notifications-outline';
            color = focused ? '#00CEB4' : '#707070';
        } else if (route.name === 'PersonalModNav') {
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
                keyboardHidesTabBar: true
            }}
            initialRouteName="HomeModNav"
        >
            {/* <Tab.Screen name="Victory" component={VictoryScreen} /> */}
            <Tab.Screen name="HomeModNav" component={HomeModNav} />
            <Tab.Screen name="TournamentModNav" component={TournamentModNav} />
            <Tab.Screen name="NotificationsModNav" component={NotificationsModNav} />
            <Tab.Screen name="PersonalModNav" component={PersonalModNav} />
        </Tab.Navigator>
    );
};

export default BottomNavigation;
