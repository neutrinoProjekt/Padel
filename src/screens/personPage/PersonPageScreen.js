/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';
import {Avatar} from 'react-native-elements';
import MainButton from '../../components/MainButton';
import MainFormInput from '../../components/MainFormInput';
import {useAuth} from '../../contexts/auth';
import {getUser, updateUser} from '../../models/User';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import { Directions } from 'react-native-gesture-handler';

// function that displays screen under the header
export default function PersonPageScreen({navigation}) {
    const [phonenr, setPhonenr] = useState('');
    const [image, setImage] = useState({uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'});
    const [description, setDescription] = useState('');
    const [deleteWarning, setDeleteWarning] = useState(false);
    const {currentUser, logout, deleteUser} = useAuth();

    const updateProfile = () => {
        getUser(currentUser.uid)
            .then((data) => {
                setDescription(data.description);
                setImage({uri: data.photoURL});
                setPhonenr(data.phoneNumber);
            });
    };

    useEffect(()=> {
        updateProfile();
    }, []);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'My Account', // header title
            headerTitleAlign: 'center',
            headerTitleStyle: {alignSelf: 'center'},
            headerRight: () => (
                <View style={{paddingRight: 15, flexDirection:'row', justifyContent: 'space-between', width: 80}}>
                    <MaterialCommunityIcons
                        name="podium-gold"
                        size={24}
                        color='#707070'
                        onPress={() => navigation.navigate('RankView')}
                    />
                    <MaterialCommunityIcons
                        name="history"
                        size={24}
                        color='#707070'
                        onPress={() => navigation.navigate('History')}
                    />
                </View>
            ),
        });
    }, [navigation]);

    function handleDelete() {
        if (deleteWarning) {
            deleteUser();
        } else {
            // alert('ARE YOU SURE?????, press delete again if you are');
            setDeleteWarning(true);
        }
    }


    function sendData(phonenr, description) {
        if (phonenr != '') {
            updateUser(currentUser.uid, {phoneNumber: phonenr})
        }   
        if (description != '') {
            updateUser(currentUser.uid, {description: description})
        }
    }

    return currentUser != null ? (
        <SafeAreaView>
            <View style={styles.container}>
                {/** Profile picture */}
                <Avatar
                    rounded
                    size="xlarge"
                    source={image}
                    activeOpacity={0.7}
                />
                {/* Firebase issue. Get the user' peofile pic from the database*/}
                <Text style={styles.text}>{currentUser.displayName}</Text> 
                <View style={{marginBottom: 20}}>
                    <Text style={{color: '#707070', fontSize: 15, fontWeight: 'bold'}}>{currentUser.email}</Text>
                </View>
                {/* 3 grey boxes to put user's personal info*/}
                <View>
                    <MainFormInput
                        inputWidth = {'100%'}
                        inputTitle = {'Description:'}
                        placeholder = {'Describe yourself...'}
                        input = {description}
                        setInput = {(text) => setDescription(text)}
                    />
                    <MainFormInput
                        keyboardType = {'numeric'}
                        inputWidth = {'100%'}
                        inputTitle = {'Contact info:'}
                        placeholder = {'Mobile phone...'}
                        input = {phonenr}
                        setInput = {(text) => setPhonenr(text)}
                    />
                </View>

                {/**Buttons */}
                <View style={{marginTop: 10}}>
                    <MainButton title='Save' onPress={() => sendData(phonenr, description)}/>
                </View>
                <View style={{marginTop: 10}}>
                    <MainButton title='Sign Out' onPress={() => logout()}/>
                </View>
                <View style={{marginTop: 10}}>
                    <MainButton title='DELETE USER' onPress={() => handleDelete()}/>
                </View>
            </View>
        </SafeAreaView>
    ) : (<Text></Text>);
}



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    image: {
        flex: 1,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#00ceb4',
        textAlign: 'center',
    },
    subtitle: {
        color: '#707070',
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
