import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MainFormInput from './../../components/MainFormInput';

const Matches = () => {
    return (
        <View>
            <MainFormInput value={'Söderköping'} placeholder={'Specify city'} inputTitle={'City'} inputWidth={305}></MainFormInput>
            <Text>This is the Matches Screen!</Text>
        </View>
    );
};

export default Matches;

const styles = StyleSheet.create({});
