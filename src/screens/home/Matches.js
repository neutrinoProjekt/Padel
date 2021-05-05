import React from 'react';
import {StyleSheet, Text, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton';

const Matches = ({navigation}) => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView style={styles.scrollContainer}>
                <BackButton
                    title='Back to search'
                    onPress={() => navigation.goBack()}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default Matches;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        alignItems: 'center',
    },
    scrollContainer: {
        backgroundColor: 'white',
        height: '100%',
    },
});
