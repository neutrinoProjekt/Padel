import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View, Dimensions} from 'react-native';
import {Button} from 'react-native-elements';

const {width: WIDTH} = Dimensions.get('window');
const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const logIn = () => {
        if (email == '') {
            setErrorMessage('Enter username or e-mail');
        } else if (password == '') {
            setErrorMessage('Enter password');
        }

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
    };


    return (
        <View style={styles.container}>
            <Text style={styles.titel}>
                PaddlePal
            </Text>
            <View>
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
                <Button
                    containerStyle={styles.button}
                    type="outline"
                    //onPress={logIn()}
                    title="Log in"
                />
                <Text>
                    {errorMessage}
                </Text>
            </View>
        </View>
    );
};


export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003f5c',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titel: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#696969',
        fontFamily: 'Cochin',
        marginBottom: 40,
    },
    input: {
        width: WIDTH - 105,
        height: 45,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 45,
        margin: '2%',
        backgroundColor: 'rgba(0,0,0,0.35)',
        color: 'rgba(255,255,255,0.7)',
        marginHorizontal: 25,
    },
    button: {
        height: 40,
        width: 300,
    },
});
