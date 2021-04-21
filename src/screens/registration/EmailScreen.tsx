/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from '../styling/Styles';
const EmailScreen = ({navigation}) => {
    const [email, setEmail] = useState('');

    const next = () => {
        navigation.navigate('FullName');
    };

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <Text h3 style={styles.title}>Email</Text>
                <Text style={styles.text}>
                    Please register your email address below
                </Text>
                <View>
                    <TextInput placeholder="Email"
                        autoFocus
                        value={email}
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
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

export default EmailScreen;
