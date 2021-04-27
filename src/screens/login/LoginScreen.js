/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {FacebookSocialButton, GoogleSocialButton} from 'react-native-social-buttons';
import {useAuth} from '../../contexts/auth';
import MainButton from '../../components/MainButton';
import {styles} from '../styling/Styles';


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login} = useAuth();

    // todo: login with google
    const googleLogin = () => {

    };

    // todo: login with facebook
    const fbLogin = () => {

    };

    function handleLogin(){
        login(email, password);
        navigation.navigate("PaddlePal");
    };

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <View style={styles.titleAlignment}>
                <Text style={customStyles.title}>PaddlePal</Text>
            </View>
            <KeyboardAvoidingView behavior="padding" style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <View style={{marginTop: 30}}>
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
                <StatusBar style='dark' />
                <View style={{paddingTop: 20}}>
                    <MainButton title='Log in' onPress={() => handleLogin()}/>
                </View>
                <View style={{paddingTop: 10}}>
                    <MainButton title='Forgot your password' onPress={() => setPassword}/>
                </View>
                <View style={{paddingTop: 5}}>
                    <FacebookSocialButton onPress={fbLogin}/>
                </View>
                <View style={{paddingTop: 5}}>
                    <GoogleSocialButton onPress={googleLogin}/>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default LoginScreen;
const customStyles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#696969',
    },
});
