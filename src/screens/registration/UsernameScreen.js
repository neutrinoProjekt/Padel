/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, Text, TextInput, View} from 'react-native';
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
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.titleAlignment}>
                    <Text style={styles.title}>Username</Text>
                </View>
                <View style={{paddingTop: 5}}>
                    <Text style={styles.text}> Please enter your username below</Text>
                </View>
                <View>
                    <Text style={styles.error}>{errorMessage}</Text>
                </View>
                <View style={{marginTop: 30}}>
                    <TextInput placeholder="Username"
                        autoFocus
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
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
            <View style={{marginTop: 10}}>
                <BackButton title='Back' onPress={back} />
            </View>
        </View>
    );
};

export default UsernameScreen;
