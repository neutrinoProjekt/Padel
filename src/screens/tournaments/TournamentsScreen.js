import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const TournamentScreen = () => {
    return (
        <View style={styles.actionButtonContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={() =>{
                AddTournament;
            }} >
                <Ionicons name='add-outline' size={32} color={'#00CEB4'}/>
            </TouchableOpacity>
        </View>
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
