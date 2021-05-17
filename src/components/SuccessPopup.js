import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainButton from './MainButton';

// This component is not reusable as I could not fogure out how to pass props while I am navigating to it

const SuccessPopup = ({navigation}) => {
    return (
        <Modal
            presentationStyle='pageSheet'
            animationType='slide'
        >
            <View style={{alignItems: 'center'}}>
                <Ionicons 
                    color='#00CEB4' size={50} name="checkmark-circle-outline">
                </Ionicons>
                <Text style={localstyles.title}>Success</Text>
                <Text style={localstyles.subtext}>Check your e-mail to reset password!</Text>
                <MainButton
                    title='Continue'
                    onPress={()=>  navigation.navigate('Login')}
                />
            </View>
        </Modal>
    );
}

export default SuccessPopup;

const localstyles = StyleSheet.create({
    title: { 
        fontWeight: 'bold',
        fontSize: 30,
        color: '#00CEB4',
        padding: 10,
    },
    subtext: {
        color: '#707070',
        fontSize: 12,
        fontWeight: '600',
    },
});
