
/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from '../styling/Styles';
const PasswordScreen = ({navigation}) => {
    const [pass1, setPass1] = useState('');
    const [pass2, setPass2] = useState('');

    const next = () => {

    };

    // checks whether password meets conditions:
    // length > 7, atleast one uppercase, atleast one lowercase and atleast one digit
    const checkPassword = (ch) => {
        if (pass1.length < 8) {
            return 'Password is too short';
        };
        if (pass1 !== pass2) {
            return 'Passwords do not match';
        }
        let upperCase = false;
        let lowerCase = false;
        let digit = false;

        pass1.split('').forEach(((ch) => {
            if (/^\d$/.test(ch)) {
                digit=true;
            } else if (ch === ch.toUpperCase()) {
                upperCase = true;
            } else {
                lowerCase = true;
            }
        }));

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
        return msg;
    };

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <Text h3 style={styles.title}>Create password</Text>
                <Text style={textStyle}>
                    At least 8 characters whereof 1 lowercase,
                    1 capital and 1 number
                </Text>
                <View>
                    <TextInput placeholder="Password"
                        autoFocus
                        secureTextEntry
                        value={pass1}
                        style={styles.input}
                        onChangeText={(text) => setPass1(text)}
                        textAlign = 'side'
                    />
                </View>
                <View>
                    <TextInput placeholder="Re-enter password"
                        value={pass2}
                        secureTextEntry
                        style={styles.input}
                        onChangeText={(text) => setPass2(text)}
                        textAlign = 'side'
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={{marginTop: 20}}>
                <Button
                    raised
                    titleStyle={styles.button}
                    containerStyle={styles.button}
                    type="clear"
                    onPress={checkPassword}
                    title="Next"/>

            </View>
        </View>
    );
};

export default PasswordScreen;

const textStyle = {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#696969',
    marginTop: 30,
    width: 300,
    alignSelf: 'center',
    textAlign: 'center',
};
