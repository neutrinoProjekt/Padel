import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View}
    from 'react-native';
import TournamentItem from '../../components/TournamentItem';
import {Ionicons} from '@expo/vector-icons';
import {createMaterialTopTabNavigator}
    from '@react-navigation/material-top-tabs';

//temporary data until fetching from firebase
const getTournaments = () => (
    [
        {
            id: 'ma1',
            owner: {
                id: 'us1',
                name: 'Karl-Bertil Johansson',
                imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            },
            participants: [],
        },
        {
            id: 'ma2',
            owner: {
                id: 'us1',
                name: 'Anna-Karin Johansson',
                imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            },
            participants: [],
        },
        {
            id: 'ma3',
            owner: {
                id: 'us1',
                name: 'Britt-Marie Johansson',
                imageUri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            },
            participants: [],
        },
    ]
);

const TopNavigator = createMaterialTopTabNavigator();

const YourTournaments = ({navigation}) => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    getTournaments().map((tour) => (
                        <TournamentItem
                            key={tour.id}
                            owner={tour.owner}
                            participants={tour.participants}
                        />
                    ))
                }
            </ScrollView>
        </SafeAreaView>

    );
};

export default YourTournaments;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
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
