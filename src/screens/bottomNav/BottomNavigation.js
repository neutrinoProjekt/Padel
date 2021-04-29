/* eslint-disable react/display-name */
/* eslint-disable max-len */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from '../home/HomeScreen';
import PersonPageScreen from '../personPage/PersonPageScreen';
import Notifications from '../notifiactions/Notifications';
import VictoryScreen from '../victory/VictoryScreen';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'HomeScreen') {
            iconName = 'home-outline';
            color = focused ? '#00CEB4' : '#707070';
        } else if (route.name === 'Tournaments') {
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
            initialRouteName="HomeScreen"
        >
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Victory" component={VictoryScreen} />
            <Tab.Screen name="Profile" component={PersonPageScreen} />
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
        </Tab.Navigator>
    );
};

export default BottomNavigation;
