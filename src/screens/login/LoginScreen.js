/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {KeyboardAvoidingView, Text, TextInput, View} from 'react-native';
import {FacebookSocialButton, GoogleSocialButton} from 'react-native-social-buttons';
import {useAuth} from '../../contexts/auth';
import MainButton from '../../components/MainButton';
import {styles} from '../styling/Styles';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const {login, error} = useAuth();

    // todo: login with google
    const googleLogin = () => {

    };

    // todo: login with facebook
    const fbLogin = () => {

    };

    function handleLogin() {
        login(email, password);
    };


    const handleForgot = () => {
        navigation.navigate('ForgotYourPasswordScreen');
    };

    useEffect(() => {
        setErrorMessage(error);
    }, [error]);


    return (
        <View style={{alignItems: 'center', flex: 1}}>
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.titleAlignment}>
                    <Text style={styles.title}>PaddlePal</Text>
                </View>
                <View>
                    <Text style={styles.error}>{errorMessage}</Text>
                </View>
                <View style={{marginTop: 20}}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Username or e-mail'}
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        textAlign ='left'
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={{marginTop: 10}}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        textAlign = 'left'
                        placeholder={'Password'}
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <View style={{paddingTop: 20}}>
                    <MainButton title='Log in' onPress={() => handleLogin()}/>
                </View>
                <View style={{paddingTop: 10}}>
                    <MainButton title='Forgot your password' onPress={() => handleForgot()}/>
                </View>
                <View style={{paddingTop: 5, alignSelf: 'center'}}>
                    <FacebookSocialButton onPress={fbLogin}/>
                </View>
                <View style={{paddingTop: 5, alignSelf: 'center'}}>
                    <GoogleSocialButton onPress={googleLogin}/>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default LoginScreen;

