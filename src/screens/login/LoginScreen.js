/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {FacebookSocialButton, GoogleSocialButton} from 'react-native-social-buttons';
import {useAuth} from '../../contexts/auth';
import MainButton from '../../components/MainButton';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuth();

    // todo: login with google
    const googleLogin = () => {

    };

    // todo: login with facebook
    const fbLogin = () => {

    };

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <View>
                <Text style={styles.title}>
                    PaddlePal
                </Text>
            </View>
            <Text>
                {''}
            </Text>
            <KeyboardAvoidingView behavior="padding" style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <TextInput
                    style={styles.input}
                    placeholder={'Username or e-mail'}
                    placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                    textAlign ='left'
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    secureTextEntry
                    textAlign = 'left'
                    placeholder={'Password'}
                    placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                    onChangeText={(text) => setPassword(text)}
                />
                <StatusBar style='dark' />
                <View style={{padding: 5}}>
                    <MainButton title='Log in' onPress={() => login(email, password)}/>
                </View>
                <View style={{padding: 5}}>
                    <MainButton title='Forgot your password' onPress={() => setPassword}/>
                </View>
                <View style={{padding: 5}}>
                    <FacebookSocialButton onPress={fbLogin}/>
                </View>
                <View style={{padding: 5}}>
                    <GoogleSocialButton onPress={googleLogin}/>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default LoginScreen;
const styles = StyleSheet.create({
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        color: '#ffffff',
        fontWeight: 'bold',
        backgroundColor: '#00CEB4',
        height: 40,
        width: 300,
        borderRadius: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#696969',
        marginTop: 100,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ffffff',
        width: 200,
        textAlign: 'center',
        height: 150,
    },
    error: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff0f0f',
        height: 50,
        marginTop: -50,
    },
    input: {
        marginBottom: 20,
        textAlign: 'center',
        height: 50,
        borderColor: '#BFBFBF',
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        fontSize: 20,
        paddingLeft: 15,
        width: 305,
    },
});
