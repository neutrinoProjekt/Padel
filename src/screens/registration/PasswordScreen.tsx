
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
                    onPress={next}
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
