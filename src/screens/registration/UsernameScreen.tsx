/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, Text, TextInput, View} from 'react-native';
import {styles} from '../styling/Styles';
import MainButton from '../../components/MainButton';


const UsernameScreen = ({navigation, route}) => {
    const [username, setUsername] = useState('');

    const next = () => {
        route.params.setUsername(username);
        navigation.navigate('Password');
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
                    <TextInput placeholder="Username"
                        autoFocus
                        value={username}
                        style={styles.input}
                        onChangeText={(text) => setUsername(text)}
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

export default UsernameScreen;
