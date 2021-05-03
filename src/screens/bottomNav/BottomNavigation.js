/* eslint-disable react/display-name */
/* eslint-disable max-len */
import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';
import HomeScreen from '../home/HomeScreen';
import PersonalPageNav from '../personPage/PersonalPageNav';
import Notifications from '../notifiactions/Notifications'

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
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Profile" component={PersonalPageNav} options={{headerShown: false}} />
            {/* Replace Tournament and Notifications with your screens */}

            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            {/* <Tab.Screen name="Tournament" component={Tournament} />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Profile" component={Profile} /> */}
        </Tab.Navigator>
    );
};

export default BottomNavigation;
