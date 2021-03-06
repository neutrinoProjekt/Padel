import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import rankScreen from '../../screens/rank/Rank';
import Profile from '../../screens/profile/Profile';
import History from '../../screens/history/History';
import EditProfile from '../../screens/profile/EditProfile';

const ModalNavigator = createStackNavigator();

const PersonalModNav = () => {
    const globalHeaderStyle = {
        headerStyle: {backgroundColor: 'white'},
        headerTitleStyle: {color: '#707070'},
        headerTintColor: '#707070',
    };

    return (
        <ModalNavigator.Navigator
            screenOptions={globalHeaderStyle}
            transparent={true}
        >
            <ModalNavigator.Screen
                name='Profile'
                component={Profile}
            />
            <ModalNavigator.Screen
                name='RankView'
                component={rankScreen}
            >
            </ModalNavigator.Screen>
            <ModalNavigator.Screen
                name='History'
                component={History}
            />
            <ModalNavigator.Screen
                name='Edit Profile'
                component={EditProfile}
            />
        </ModalNavigator.Navigator>
    );
};

export default PersonalModNav;
