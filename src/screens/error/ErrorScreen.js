import React from 'react';
import {KeyboardAvoidingView, Text, View} from 'react-native';
import MainButton from '../../components/MainButton';
import {useAuth} from '../../contexts/auth';
import {styles} from '../styling/Styles';

export default function Error() {
    const {logout} = useAuth();

    return (

        <View style={{alignItems: 'center'}}>
            <KeyboardAvoidingView behavior='padding'>
                <View style={{marginTop: 100}}>
                    <Text style={styles.text}>A problem has occured!</Text>
                    <MainButton title="Take me Back!" onPress={() => logout()}/>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};
