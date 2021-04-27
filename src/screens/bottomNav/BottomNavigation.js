/* eslint-disable react/display-name */
/* eslint-disable max-len */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from '../home/HomeScreen';
import PersonPageScreen from '../personPage/PersonPageScreen';

const Tab = createBottomTabNavigator();

const screenOptions = ({route}) => ({
    tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'HomeScreen') {
            iconName = 'home-outline';
            color = focused ? '#00CEB4' : '#707070';
        } else if (route.name === 'Tournament') {
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
                style: {height: 100},
            }}

            initialRouteName="HomeScreen"
        >

            <Tab.Screen name="Profile" component={PersonPageScreen} />
            {/* Replace Tournament and Notifications with your screens */}

            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            {/* <Tab.Screen name="Tournament" component={Tournament} />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Profile" component={Profile} /> */}

        </Tab.Navigator>

    );
};

export default BottomNavigation;
