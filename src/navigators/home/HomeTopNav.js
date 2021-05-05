import React, {useLayoutEffect} from 'react';
import YourMatches from '../../screens/home/YourMatches';
import FindMatches from '../../screens/home/FindMatches';
import {View} from 'react-native';
import {createMaterialTopTabNavigator}
    from '@react-navigation/material-top-tabs';

const TopNav = createMaterialTopTabNavigator();

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

const HomeTopNav = () => {
    return (
        <View style={{height: '100%'}}>
            <TopNav.Navigator
                tabBarOptions={topNavigatorOptions}
            >
                <TopNav.Screen
                    name="Your Matches"
                    component={YourMatches}
                />
                <TopNav.Screen
                    name="Find Matches"
                    component={FindMatches}
                />
            </TopNav.Navigator>
        </View>
    );
};

export default HomeTopNav;
