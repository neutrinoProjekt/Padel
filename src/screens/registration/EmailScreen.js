/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, TextInput, View} from 'react-native';
import BackButton from '../../components/BackButton';
import {styles} from '../styling/Styles';
import MainButton from '../../components/MainButton';

const EmailScreen = ({navigation, route}) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // route parameters and navigate to the next screen if an email
    // address has been entered
    const next = () => {
        if (email.length > 0) {
            if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
                route.params.setEmail(email);
                navigation.navigate('FullName');
            } else {
                setErrorMessage('Badly formatted email');
            }
        } else if (email.length == 0) {
            setErrorMessage('Please enter an email address to continue');
        }
    };

    const back = () => {
        navigation.navigate('Home');
    };

    const clearErr = () => {
        setErrorMessage('');
    };

    return (
        <View style={{alignItems: 'center'}}>
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.titleAlignment}>
                    <Text style={styles.title}>Email</Text>
                </View>
                <View style={{paddingTop: 5}}>
                    <Text style={styles.text}> Please register your email address below</Text>
                </View>
                <View>
                    <Text style={styles.error}>{errorMessage}</Text>
                </View>
                <View style={{marginTop: 30}}>
                    <TextInput placeholder="Email"
                        autoFocus
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        value={email}
                        style={styles.input}
                        onChangeText={(text) => {
                            setEmail(text); clearErr();
                        }}
                        textAlign = 'left'
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={{marginTop: 20}}>
                <MainButton title='Next' onPress={next} />
            </View>
            <View style={{marginTop: 10}}>
                <BackButton title='Back' onPress={back} />
            </View>
        </View>
    );
};

export default EmailScreen;
