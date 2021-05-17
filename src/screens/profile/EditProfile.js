import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {getUser, updateUser} from '../../models/User';
import {useAuth} from '../../contexts/auth';
import MainButton from '../../components/MainButton';

const EditProfile = () => {
    const {currentUser, logout, deleteUser} = useAuth();
    const [description, setDescription] = useState('Tjabba tjena');

    const updateProfile = () => {
        updateUser(currentUser.uid, {description: 'Nås bästa på: Kontakta mig gärna. Vill du kontakta mig? lalalalalalalalal Nås bästa på: Kontakta mig gärna. Vill du kontakta mig? lalalalalalalalal lalalalalalalalal lalalalala'});
    };

    return (
        <View>
            <Text>Edit profile!</Text>
            <MainButton title='Save' onPress={updateProfile}/>
        </View>
    );
};

export default EditProfile

const styles = StyleSheet.create({})
