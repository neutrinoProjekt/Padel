/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, Text, TextInput, View} from 'react-native';
import {styles} from '../styling/Styles';
import MainButton from '../../components/MainButton';
import BackButton from '../../components/BackButton';

const FullNameScreen = ({navigation, route}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // route parameters and navigate to the next screen if firstname
    // and lastname has been entered
    const next = () => {
        if (firstName.length > 0 && lastName.length > 0) {
            setErrorMessage('');
            route.params.setFullname(firstName + ' ' + lastName);
            navigation.navigate('Username');
            return;
        }
        if (firstName.length == 0) {
            setErrorMessage('Please enter your firstname');
        } else {
            setErrorMessage('Please enter your lastname');
        }
    };

    const back = () => {
        navigation.navigate('Email');
    };

    const clearErr = () => {
        setErrorMessage('');
    };

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.titleAlignment}>
                    <Text style={styles.title}>Full Name</Text>
                </View>
                <View style={{paddingTop: 5}}>
                    <Text style={styles.text}>
                        Please enter your full name below
                    </Text>
                </View>
                <View>
                    <Text style={styles.error}>{errorMessage}</Text>
                </View>
                <View style={{marginTop: 30}}>
                    <TextInput placeholder="Firstname"
                        autoFocus
                        value={firstName}
                        style={styles.input}
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        onChangeText={(text) => {
                            setFirstName(text); clearErr();
                        }}
                        textAlign = 'left'
                    />
                </View>
                <View style={{marginTop: 10}}>
                    <TextInput placeholder="Lastname"
                        value={lastName}
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        style={styles.input}
                        onChangeText={(text) => {
                            setLastName(text); clearErr();
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

export default FullNameScreen;
