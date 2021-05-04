import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FindTournaments from './FindTournaments';
import TournamentsList from './YourTournaments';

const TopNavigator = createMaterialTopTabNavigator();

const TournamentNavigator = () => {
    return (
        <TopNavigator.Navigator
            tabBarOptions={{
                activeTintColor: '#00CEB4',
                inactiveTintColor: '#707070',
                indicatorStyle: {backgroundColor: '#00CEB4'},
                labelStyle: {
                    textTransform: 'none',
                    fontSize: 14,
                    fontWeight: 'bold',
                },
                tabStyle: {borderTopWidth: 0},
            }}
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

export default TournamentNavigator;

const styles = StyleSheet.create({});

