/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from '../styling/Styles';
const FullNameScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const next = () => {
        navigation.navigate('UsernameScreen');
    };

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <Text h3 style={styles.title}>Full Name</Text>
                <Text style={styles.text}>
                    Please enter your full name below
                </Text>
                <View>
                    <TextInput placeholder="Firstname"
                        autoFocus
                        value={firstName}
                        style={styles.input}
                        onChangeText={(text) => setFirstName(text)}
                        textAlign = 'side'
                    />
                </View>
                <View>
                    <TextInput placeholder="Lastname"
                        value={lastName}
                        style={styles.input}
                        onChangeText={(text) => setLastName(text)}
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

export default FullNameScreen;
