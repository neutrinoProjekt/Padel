import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { StatusBar } from 'expo-status-bar';

const { width: WIDTH } = Dimensions.get('window');
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    //to be replaced with better firebase version
    //this is spaghetti
    const logIn = () => {
        if (email == '') {
            setErrorMessage('Enter username or e-mail');
        } else if (password == '') {
            setErrorMessage('Enter password');
        } else {
            setEmail('this should trigger some login event');
            const loginEventReturn = 2;
            switch (loginEventReturn) {
            case 1:
                setErrorMessage('No matching user name');
            case 2:
                setErrorMessage('Wrong password!');
            case 3:
                setEmail('this should trigger sucessfull login');
            }
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.logo}>
                PaddlePal
            </Text>
            <TextInput
                style={styles.input}
                placeholder={'Username or e-mail'}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid='transparet'
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder={'Password'}
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                underlineColorAndroid='transparet'
                onChangeText={(text) => setPassword(text)}
            />
            <StatusBar style="dark" />
            <Button titleStyle={styles.button}
                containerStyle={styles.button}
                type="clear"
                onPress={logIn}
                title="Log in" />

            <Button titleStyle={{ color: '#00CEB4', fontWeight: 'bold' }}
                type="clear"
                onPress={setPassword}
                title="New Password" />
            <Text>
                {errorMessage}
            </Text>
        </View>
    );
};


export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff   ffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 100,
        fontWeight: 'bold',
        fontSize: 50,
        color: '#707070',
        fontFamily: 'Cochin',
        marginBottom: 40,
    },
    input: {
        maxWidth: 500,
        minWidth: 500,
        height: 45,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 45,
        marginBottom: '2%',
        backgroundColor: '#f7f7f7',
        color: '#f7f7f7',
        marginHorizontal: 25,
    },
    button: {
        color: '#ffffff',
        fontWeight: 'bold',
        backgroundColor: '#00CEB4',
        height: 40,
        width: 300,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#00ceb4',
        minwidth: 200,
        textAlign: 'center',
        height: 150,
    },
});