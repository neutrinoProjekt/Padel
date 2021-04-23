/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, Text, TextInput, View} from 'react-native';
import {styles} from '../styling/Styles';
import MainButton from '../../components/MainButton';
import BackButton from '../../components/BackButton';


const UsernameScreen = ({navigation, route}) => {
    const [username, setUsername] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // route parameters and navigate to the next
    // screen if a username has been entered
    const next = () => {
        if (username.length > 0) {
            route.params.setUsername(username);
            navigation.navigate('Password');
        } else if (username.length == 0) {
            setErrorMessage('Please enter an username');
        }
    };

    const back = () => {
        navigation.navigate('FullName');
    };
    const clearErr = () => {
        setErrorMessage('');
    };

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <Text style={styles.title}>Username</Text>
                <Text style={styles.text}>
                    Please enter your username below
                </Text>
                <View>
                    <Text style={styles.error}>{errorMessage}</Text>
                    <TextInput placeholder="Username"
                        autoFocus
                        value={username}
                        style={styles.input}
                        onChangeText={(text) =>{
                            setUsername(text); clearErr();
                        }}
                        textAlign = 'left'
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={{marginTop: 20}}>
                <MainButton title='Next' onPress={next} />
            </View>
            <View style={{marginTop: 20}}>
                <BackButton title='Back' onPress={back} />
            </View>
        </View>
    );
};

export default UsernameScreen;
