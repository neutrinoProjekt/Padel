
/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {styles} from '../styling/Styles';
import MainButton from '../../components/MainButton';
const PasswordScreen = ({navigation}) => {
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const next = () => {

    };

    // checks whether password meets conditions:
    // length > 7, atleast one uppercase, atleast one lowercase and atleast one digit
    const checkPassword = () => {
        if (pass1.length < 8) {
            setErrorMessage('Password is too short');
            return;
        };
        if (pass1 !== pass2) {
            setErrorMessage('Passwords do not match');
            return;
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
        setErrorMessage(msg);
        return;
    };

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <Text style={styles.title}>Create password</Text>
                <Text style = {styles.paragraph}>
                    At least 8 characters whereof 1 lowercase,
                    1 capital and 1 number
                </Text>
                <View>
                    <Text style={styles.error}>{errorMessage}</Text>
                    <TextInput placeholder="Password"
                        autoFocus
                        secureTextEntry
                        value={pass1}
                        style={styles.input}
                        onChangeText={(text) => setPass1(text)}
                        textAlign = 'left'
                    />
                </View>
                <View>
                    <TextInput placeholder="Re-enter password"
                        value={pass2}
                        secureTextEntry
                        style={styles.input}
                        onChangeText={(text) => setPass2(text)}
                        textAlign = 'left'
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={{marginTop: 20}}>
                <MainButton title='Next' onPress={checkPassword} />
            </View>
        </View>
    );
};

export default PasswordScreen;
