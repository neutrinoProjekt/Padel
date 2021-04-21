import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Notifications from './components/notifications.tsx';

export default function App() {
    return (
        <View>
            <Text style={styles.container}>paddel app</Text>
            <Notifications/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#ffa',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        textAlign: 'center',
        fontFamily: 'cursive',
        fontSize: 50,
        borderBottomWidth: 2,
        borderColor: '#00CEB4',
    },
});
