import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainButton from './MainButton';

const SuccessPopup = ({navigation}, props) => {
    return (
        <Modal
            presentationStyle='pageSheet'
            animationType='slide'
        >
            <View style={{alignItems:'center'}}>
                <Ionicons color='#00CEB4' size={32} name="checkmark-circle-outline"></Ionicons>
                <Text>props.title</Text> {/**pass: This is the success popup */}
            </View>
            <MainButton
                title='Continue'
                onPress={()=> alert('hej')}
            />
        </Modal>
    );
}

export default SuccessPopup;

const styles = StyleSheet.create({});
