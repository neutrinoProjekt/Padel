/* eslint-disable react/display-name */
/* eslint-disable max-len */
import * as React from 'react';
import {Text, View, StatusBar} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MatchScreen from './../home/MatchScreen';
import {Ionicons} from '@expo/vector-icons';
import Notifications from '../home/Notifications';
import Profile from '../home/Profile';
import Tournament from '../home/Tournament';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({

                tabBarIcon: ({focused, color, size}) => {
                    let iconName;

                    if (route.name === 'Match') {
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
            })}

            tabBarOptions={{
                showLabel: false,
                style: {height: 100},
            }}

            initialRouteName="Match"
        >

            <Tab.Screen name="Match" component={MatchScreen} />
            <Tab.Screen name="Tournament" component={Tournament} />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Profile" component={Profile} />


        </Tab.Navigator>

    );
};

export default BottomNavigation;
