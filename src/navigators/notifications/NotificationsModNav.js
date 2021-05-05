import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import VictoryScreen from '../../screens/victory/VictoryScreen';

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
                component={VictoryScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {alignSelf: 'center'},
                }}
            >
            </ModalNavigator.Screen>
        </ModalNavigator.Navigator>
    );
};

export default NotificationsModNav;
