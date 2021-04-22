/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {styles} from '../styling/Styles';
import MainButton from '../../components/MainButton';

const EmailScreen = ({navigation}) => {
    const [email, setEmail] = useState('');

    const next = () => {
        navigation.navigate('FullName');
    };

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <Text style={styles.title}>Email</Text>
                <Text style={styles.text}>
                    Please register your email address below
                </Text>
                <View>
                    <TextInput placeholder="Email"
                        autoFocus
                        value={email}
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        textAlign = 'left'
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={{marginTop: 20}}>
                <MainButton title='Next' onPress={next} />
            </View>
        </View>
    );
};

export default EmailScreen;
