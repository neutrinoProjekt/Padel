import React from 'react';
import {StyleSheet} from 'react-native';
import YourMatches from './YourMatches';
import Matches from './Matches';
import {createMaterialTopTabNavigator}
    from '@react-navigation/material-top-tabs';


const TopNavigator = createMaterialTopTabNavigator();

const HomeScreen = () => {
    return (
        <TopNavigator.Navigator
            tabBarOptions={{
                activeTintColor: '#707070',
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
            <TopNavigator.Screen name="Your Matches" component={YourMatches} />
            <TopNavigator.Screen
                name="Matches"
                component={Matches}
            />
        </TopNavigator.Navigator>
    );
};

export default HomeScreen

const styles = StyleSheet.create({})
