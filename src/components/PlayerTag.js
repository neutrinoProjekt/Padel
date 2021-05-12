import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const PlayerTag = (props) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.tag} onPress={props.onPress}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.title1}>{props.fullname}</Text>
                    <Text style={styles.title2}>x</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default PlayerTag;

const styles = StyleSheet.create({
    tag: {
        borderRadius: 15,
        backgroundColor: '#00CEB4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title1: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 10,
        margin: 5,
    },
    title2: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 10,
        margin: 5,
    },
});

