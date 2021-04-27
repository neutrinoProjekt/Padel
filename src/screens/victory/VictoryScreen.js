import React, {useEffect, useState} from 'react';
import {
    Text,
    View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Header} from 'react-native-elements';
import {styles} from '../styling/Styles';

// --fire base--
// make it possible to fetch last match from fire base


function Title() {
    return (
        <View style={styles.container}>
            <Text>PaddlePal</Text>
            <Text style={{color: '#707070', fontSize: 20, fontWeight: 'bold'}}>Summary</Text>
        </View>
    );
}

const LASTMATCH = [
    {
        header: 'Last match',
        description: 'match',
        place: 'Södertälje padelhall, Stockholm',
        time: '2014-02-02-14.44',
        participants: 'Anna, August, Yosef, Vide',
    },
];

const VictoryScreen = () => {
    return (
        <SafeAreaProvider>
            {/* App logo and page name (Summary)*/}
            <Header
                backgroundColor={'#ffff'}
                centerComponent={<Title/>}
            />

            {/* Placeholder, firebaseissue: get the information about the last match
            (name, place, time, participants*/}
            <View>
                <Text style={styles.text}>
                    this is a placeholder, the type of notification has not been implemented
                    this is a placeholder, the type of notification has not been implemented
                    this is a placeholder, the type of notification has not been implemented
                    this is a placeholder, the type of notification has not been implemented
                    this is a placeholder, the type of notification has not been implemented
                    this is a placeholder, the type of notification has not been implemented
                    this is a placeholder, the type of notification has not been implemented
                    this is a placeholder, the type of notification has not been implemented
                    this is a placeholder, the type of notification has not been implemented
                    this is a placeholder, the type of notification has not been implemented
                    this is a placeholder, the type of notification has not been implemented
                    this is a placeholder, the type of notification has not been implemented
                </Text>
            </View>
        </SafeAreaProvider>
    );
};

export default VictoryScreen;
