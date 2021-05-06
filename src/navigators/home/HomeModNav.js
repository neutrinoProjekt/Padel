import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTopNav from './HomeTopNav';
import AddMatchScreen from './../../screens/home/AddMatchScreen';
import SearchResults from '../../screens/home/SearchResults';
import MatchDetailsScreen from '../../screens/home/MatchDetailsScreen';

const ModalNavigator = createStackNavigator();

const HomeModNav = () => {
    const globalHeaderStyle = {
        headerStyle: {backgroundColor: 'white'},
        headerTitleStyle: {color: '#707070'},
        headerTintColor: '#707070',
    };

    return (
        <ModalNavigator.Navigator
            screenOptions={globalHeaderStyle}
            mode='modal'
            transparent={true}
        >
            <ModalNavigator.Screen
                name='PaddlePal'
                component={HomeTopNav}
                options={{
                    headerTitleAlign: 'center',
                    headerTitleStyle: {alignSelf: 'center'},
                }}
            >
            </ModalNavigator.Screen>
            <ModalNavigator.Screen
                name='AddMatchScreen'
                component={AddMatchScreen}
            >
            </ModalNavigator.Screen>
            <ModalNavigator.Screen
                name='MatchDetailsScreen'
                component={MatchDetailsScreen}
            >
            </ModalNavigator.Screen>
            <ModalNavigator.Screen
                name='SearchResults'
                component={SearchResults}
            />
        </ModalNavigator.Navigator>
    );
};

export default HomeModNav;
