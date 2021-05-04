import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FindTournaments from '../../screens/tournaments/FindTournaments';
import TournamentsList from '../../screens/tournaments/YourTournaments';

const TopNavigator = createMaterialTopTabNavigator();

const topNavigatorOptions = {
    activeTintColor: '#707070',
    inactiveTintColor: '#707070',
    indicatorStyle: {backgroundColor: '#00CEB4'},
    labelStyle: {
        textTransform: 'none',
        fontSize: 14,
        fontWeight: 'bold',
    },
    tabStyle: {borderTopWidth: 0},
};

const TournamentTopNav = () => {
    return (
        <TopNavigator.Navigator
            tabBarOptions={topNavigatorOptions}
        >
            <TopNavigator.Screen
                name="Your Tournaments"
                component={TournamentsList} />
            <TopNavigator.Screen
                name="Find Tournament"
                component={FindTournaments}
            />
        </TopNavigator.Navigator>
    );
};

export default TournamentTopNav;

const styles = StyleSheet.create({});

