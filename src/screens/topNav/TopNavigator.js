import React from 'react';
import YourMatches from './../home/YourMatches';
import Matches from './../home/Matches';
import {createMaterialTopTabNavigator}
    from '@react-navigation/material-top-tabs';

const TopNav = createMaterialTopTabNavigator();

const TopNavigator = () => {
    return (
        <TopNav.Navigator
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
            <TopNav.Screen
                name="Your Matches"
                component={YourMatches}
            />
            <TopNav.Screen
                name="Find Matches"
                component={Matches}
            />
        </TopNav.Navigator>
    );
};

export default TopNavigator;
