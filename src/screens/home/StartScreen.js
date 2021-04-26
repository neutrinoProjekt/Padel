import React from 'react';
import {ImageBackground, StatusBar, StyleSheet, Text, View} from 'react-native';
import MainButton from '../../components/MainButton';
import DynamicButton from '../../components/DynamicButton';
import {styles} from '../styling/Styles';
const StartScreen = ({navigation}) => {
    // move to register page when pressing button
    const register = () => {
        navigation.navigate('Registration');
    };

    // move to login page when pressing button
    const logIn = () => {
        navigation.navigate('Login');
    };

    return (
        <ImageBackground source = {{uri: 'https://i.pinimg.com/originals/50/2c/a3/502ca33a6bcd3eafa97d50957c63dcb9.png'}} style = {styles.image}>
            <StatusBar barStyle = "dark-content"/>
            <View style={{height: 400}}>
                <Text style={customStyles.title}>PaddelPal</Text>
            </View>
            <View style={{height: 150}}>
                <Text style={customStyles.text}>
                    Join our online paddle community
                </Text>
            </View>
            <MainButton title="Register" onPress={register}/>
            <DynamicButton
                title='Log In'
                textStyle={{color: '#00CEB4', fontWeight: 'bold'}}
                boxColor='transparent'
                onPress={logIn}
            />
        </ImageBackground>
    );
};

export default StartScreen;

// todo: skapa map för styles
const customStyles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 50,
        color: '#696969',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ffffff',
        width: 200,
        textAlign: 'center',
    },
});
