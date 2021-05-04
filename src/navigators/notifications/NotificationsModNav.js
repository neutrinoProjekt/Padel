import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Notifications from '../../screens/notifications/Notifications';

const ModalNavigator = createStackNavigator();

const NotificationsModNav = () => {

    const globalHeaderStyle = {
        headerStyle: {backgroundColor: 'white'},
        headerTitleStyle: {color: '#707070'},
        headerTintColor: '#707070',
    }

    return (
        <ModalNavigator.Navigator
            screenOptions={globalHeaderStyle}
            mode='modal'
            transparent={true}
            initialRouteName="Notifications"
        >
            <ModalNavigator.Screen
                name='Notifications'
                component={Notifications}
            >
            </ModalNavigator.Screen>
        </ModalNavigator.Navigator>
    );
};

export default NotificationsModNav;
