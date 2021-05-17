import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import MainButton from './MainButton';

// This component is not reusable as I could not fogure out how to pass props while I am navigating to it

const SuccessPopup = ({route, navigation}) => {
    const {text} = route.params;
    return (
        <Modal
            presentationStyle='pageSheet'
            animationType='slide'
        >
            <View style={localstyles.container}>
                <MaterialCommunityIcons
                    color='#00CEB4' size={150} name="check-circle-outline">
                </MaterialCommunityIcons>
                <Text style={localstyles.title}>Success</Text>
                <Text style={localstyles.subtext}>{text}</Text>
                <View style={{paddingTop: 300}}>
                    <MainButton
                        title='Continue'
                        onPress={()=>  navigation.navigate('Login')}
                    />
                </View>
            </View>
        </Modal>
    );
}

export default SuccessPopup;

const localstyles = StyleSheet.create({
    title: { 
        fontWeight: 'bold',
        fontSize: 40,
        color: '#00CEB4',
        padding: 10,
   
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    subtext: {
        color: '#707070',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        width: 300,
    },
});
