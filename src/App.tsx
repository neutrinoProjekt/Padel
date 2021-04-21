import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Notifications from './components/notifications.tsx';

export default function App() {
    return (
        <View style={styles.container}>
            <Notifications/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffa',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
});
