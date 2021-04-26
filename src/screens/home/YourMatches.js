import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View}
    from 'react-native';
import MatchListItem from '../../components/MatchListItem';
import {Ionicons} from '@expo/vector-icons';
import {createMaterialTopTabNavigator}
    from '@react-navigation/material-top-tabs';


const getMatches = () => (
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

const YourMatches = ({navigation}) => {
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    getMatches().map((match) => (
                        <MatchListItem
                            key={match.id}
                            owner={match.owner}
                            participants={match.participants}
                        />
                    ))
                }
            </ScrollView>
            <View style={styles.actionButtonContainer}>
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name='add-outline' size={32} color={'#00CEB4'}/>
                </TouchableOpacity>
            </View>


        </SafeAreaView>

    );
};

export default YourMatches;

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
