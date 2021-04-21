/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from '../styling/Styles';


const UsernameScreen = ({navigation}) => {
    const [username, setUsername] = useState('');

    const next = () => {
        navigation.navigate('Password');
    };

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <Text h3 style={styles.title}>Username</Text>
                <Text style={styles.text}>
                    Please enter your username below
                </Text>
                <View>
                    <TextInput placeholder="Username"
                        autoFocus
                        value={username}
                        style={styles.input}
                        onChangeText={(text) => setUsername(text)}
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

export default UsernameScreen;
