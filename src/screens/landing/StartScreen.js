import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
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
        navigation.navigate('LoginContainer');
    };

    // used for testing, tournament screen
    const createTrnmnt = () => {
        navigation.navigate('CreateTournament');
    };

    return (

        <ImageBackground source = {{uri: 'https://24hkto1dz1v3ddyf93n0ye45-wpengine.netdna-ssl.com/wp-content/uploads/2015/11/Kinfolk_Vol18_OrderintheCourts_03-1-768x1024.jpg'}} style = {styles.image}>
            <View style={{height: 400}}>
                <Text style={customStyles.title}>PadelPal</Text>
            </View>
            <View style={{height: 150}}>
                <Text style={customStyles.text}>
                    Join our online padel community
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
