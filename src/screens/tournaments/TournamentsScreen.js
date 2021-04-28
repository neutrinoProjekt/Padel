import React from 'react';
import {StyleSheet,TouchableOpacity,View} from 'react-native';
import FindTournaments from './FindTournaments';
import YourTournaments from './YourTournaments';
import {Ionicons} from '@expo/vector-icons';
import {createMaterialTopTabNavigator}
    from '@react-navigation/material-top-tabs';


const TopNavigator = createMaterialTopTabNavigator();

const TournamentScreen = () => {
    return (
        <view>
            <TopNavigator.Navigator
                tabBarOptions={{
                    activeTintColor: '#0064B4',
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
                    component={YourTournaments} />
                <TopNavigator.Screen
                    name="Find Tournament"
                    component={FindTournaments}
                />
            </TopNavigator.Navigator>
            <View style={styles.actionButtonContainer}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name='add-outline' size={32} color={'#00CEB4'}/>
                </TouchableOpacity>
            </View>
        </view>
        
    );
};

export default TournamentScreen;

const styles = StyleSheet.create({
    actionButtonContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 100,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {height: 10},
    },
});
