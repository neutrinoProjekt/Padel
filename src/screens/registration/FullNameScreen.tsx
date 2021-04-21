/* eslint-disable max-len */
import React, {useState} from 'react';
import {KeyboardAvoidingView, StatusBar, StyleSheet, Text, TextInput, View} from 'react-native';
import {Button} from 'react-native-elements';

const FullNameScreen = ({navigation}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const next = () => {
        navigation.navigate('UsernameScreen');
    };

    return (
        <View style={{alignItems: 'center'}}>
            <StatusBar barStyle = "dark-content"/>
            <KeyboardAvoidingView behavior="padding">
                <Text h3 style={styles.title}>Full Name</Text>
                <Text style={styles.text}>
                    Please register your full name below
                </Text>
                <View>
                    <TextInput placeholder="Firstname"
                        autoFocus
                        value={firstName}
                        style={styles.input}
                        onChangeText={(text) => setFirstName(text)}
                        textAlign = 'side'
                    />
                </View>
                <View>
                    <TextInput placeholder="Lastname"
                        value={lastName}
                        style={styles.input}
                        onChangeText={(text) => setLastName(text)}
                        textAlign = 'side'
                    />
                </View>
            </KeyboardAvoidingView>
            <View style={{marginTop: 20}}>
                <Button
                    raised
                    titleStyle={styles.button}
                    containerStyle={styles.button}
                    type="clear"
                    onPress={next}
                    title="Next"/>
            </View>
        </View>
    );
};

export default FullNameScreen;

const styles = StyleSheet.create({
    input: {
        marginTop: 30,
        textAlign: 'center',
        height: 50,
        borderColor: '#BFBFBF',
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        fontSize: 20,
        paddingLeft: 15,
        width: 305,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        color: '#696969',
        marginTop: 60,
        alignSelf: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#696969',
        marginTop: 30,
        alignSelf: 'center',
        textAlign: 'center',
    },
    button: {
        color: '#ffffff',
        fontWeight: 'bold',
        backgroundColor: '#00CEB4',
        height: 40,
        width: 305,
        borderRadius: 10,
    },
});
