/* eslint-disable require-jsdoc */

/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, StatusBar, Text, TextInput, View} from 'react-native';
import {styles} from '../styling/Styles';
import MainButton from '../../components/MainButton';
import BackButton from '../../components/BackButton';
import {useAuth} from '../../contexts/auth';

const PasswordScreen = ({navigation, route}) => {
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {error} = useAuth();

    const back = () => {
        navigation.navigate('Username');
    };

    // route password if password is valid
    function handlePress() {
        if (checkPassword()) {
            route.params.setPassword(pass1);
        }
    }

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);

    // checks whether password meets conditions:
    // length > 7, atleast one uppercase, atleast one lowercase and atleast one digit
    const checkPassword = () => {
        if (pass1.length < 8) {
            setErrorMessage('Password is too short');
            return false;
        };
        if (pass1 !== pass2) {
            setErrorMessage('Passwords do not match');
            return false;
        }
        let upperCase = false;
        let lowerCase = false;
        let digit = false;

        // check for upperCase, lowerCase and digit in entered password
        pass1.split('').forEach(
            (ch) => {
                if (/^\d$/.test(ch)) {
                    digit = true;
                } else if (ch === ch.toUpperCase()) {
                    upperCase = true;
                } else {
                    lowerCase = true;
                }
            },
        );

        let msg = '';
        if (!upperCase) {
            msg = 'Password needs an uppercase';
        } else if (!lowerCase) {
            msg = 'Password needs a lowercase';
        } else if (!digit) {
            msg = 'Password needs a digit';
        } else {
            msg = 'Valid password';
        }
        if (msg === 'Valid password') {
            return true;
        } else {
            setErrorMessage(msg);
            return false;
        }
    };

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.titleAlignment}>
                    <Text style={styles.title}>Create password</Text>
                </View>
                <View style={{paddingTop: 5}}>
                    <Text style = {styles.paragraph}>
                        At least 8 characters whereof 1 lowercase,
                        1 capital and 1 number
                    </Text>
                </View>
                <View style={{alignSelf: 'left'}}>
                    <Text style={styles.error}>{errorMessage}</Text>
                </View>
                <View style={{marginTop: 30}}>
                    <TextInput placeholder="Password"
                        autoFocus
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        secureTextEntry
                        value={pass1}
                        style={styles.input}
                        onChangeText={(text) => setPass1(text)}
                        textAlign = 'left'
                    />
                </View>
                <View style={{marginTop: 10}}>
                    <TextInput placeholder="Re-enter password"
                        value={pass2}
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        secureTextEntry
                        style={styles.input}
                        onChangeText={(text) => setPass2(text)}
                        textAlign = 'left'
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={{marginTop: 20}}>
                <MainButton title='Finish registration' onPress={handlePress} />
            </View>
            <View style={{marginTop: 10}}>
                <BackButton title='Back' onPress={back} />
            </View>
        </View>
    );
};

export default PasswordScreen;
