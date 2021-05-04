import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Search from './Search';
import Matches from './Matches';

const Stack = createStackNavigator();

const FindMatches = () => {
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName='Search'
        >
            <Stack.Screen
                name='Search'
                component={Search}
            >
            </Stack.Screen>
            <Stack.Screen
                name='Matches'
                component={Matches}
            >
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default FindMatches;

const styles = StyleSheet.create({});
