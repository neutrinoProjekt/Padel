/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, Text, TextInput, View} from 'react-native';
import {styles} from '../styling/Styles';
import MainButton from '../../components/MainButton';

const FullNameScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const next = () => {
        if (firstName.length > 0 && lastName.length > 0) {
            setErrorMessage('');
            navigation.navigate('UsernameScreen');
            return;
        }
        if (firstName.length == 0) {
            setErrorMessage('Please enter your firstname');
        } else {
            setErrorMessage('Please enter your lastname');
        }
    };

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <Text style={styles.title}>Full Name</Text>
                <Text style={styles.text}>
                    Please enter your full name below
                </Text>
                <View>
                    <Text style={styles.error}>{errorMessage}</Text>
                    <TextInput placeholder="Firstname"
                        autoFocus
                        value={firstName}
                        style={styles.input}
                        onChangeText={(text) => setFirstName(text)}
                        textAlign = 'left'
                    />
                </View>
                <View>
                    <TextInput placeholder="Lastname"
                        value={lastName}
                        style={styles.input}
                        onChangeText={(text) => setLastName(text)}
                        textAlign = 'left'
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={{marginTop: 20}}>
                <MainButton title='Next' onPress={next} />
            </View>
        </View>
    );
};

export default FullNameScreen;