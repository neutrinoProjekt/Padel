/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import BackButton from '../../components/BackButton';
import {styles} from '../styling/Styles';
import MainButton from '../../components/MainButton';

const EmailScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const next = () => {
        if(email.length > 0){
            navigation.navigate('FullName');
        }else if (email.length == 0){
            setErrorMessage('Please enter an email address to continue');
        }
    };

    const back = () => {
        navigation.navigate('Home');
    }

    const clearErr = () => {
        setErrorMessage('');
    }

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <Text style={styles.title}>Email</Text>
                <Text style={styles.text}>
                    Please register your email address below
                </Text>
                <View>
                    <Text style={styles.error}>{errorMessage}</Text>
                    <TextInput placeholder="Email"
                        autoFocus
                        value={email}
                        style={styles.input}
                        onChangeText={(text) => {setEmail(text); clearErr();}}
                        textAlign = 'left'
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={{marginTop: 20}}>
                <MainButton title='Next' onPress={next} />
            </View>
            <View style={{marginTop: 20}}>
                <BackButton title='Back'  onPress={back} />
            </View>
        </View>
    );
};

export default EmailScreen;
