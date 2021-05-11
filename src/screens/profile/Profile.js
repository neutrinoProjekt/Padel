/* eslint-disable max-len */
/* eslint-disable react/display-name */
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
import {Directions} from 'react-native-gesture-handler';
import BackButton from '../../components/BackButton';
import {Divider} from 'react-native-elements';

// function that displays screen under the header
export default function PersonPageScreen({navigation}) {
    const [phonenr, setPhonenr] = useState('');
    const [image, setImage] = useState({uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'});
    const [description, setDescription] = useState('');
    const [deleteWarning, setDeleteWarning] = useState(false);
    const {currentUser, logout, deleteUser} = useAuth();
    const [displayName, setDisplayName] = useState('');

    const updateProfile = () => {
        getUser(currentUser.uid)
            .then((data) => {
                setDescription(data.description);
                setImage({uri: data.photoURL});
                setDisplayName(data.displayName);
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
            headerLeft: () => (
                <View style={{paddingLeft: 15, flexDirection: 'row', justifyContent: 'space-between', width: 80}}>
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
            headerRight: () => (
                <View style={{paddingRight: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <MaterialCommunityIcons
                        name='account-edit-outline'
                        size={24}
                        color='#707070'
                    />
                </View>
            ),
        });
    }, [navigation]);

    function handleDelete() {
        if (deleteWarning) {
            deleteUser();
        } else {
            alert('ARE YOU SURE?????, press delete again if you are');
            setDeleteWarning(true);
        }
    }


    function sendData(phonenr, description) {
        if (phonenr != '') {
            updateUser(currentUser.uid, {phoneNumber: phonenr});
        }
        if (description != '') {
            updateUser(currentUser.uid, {description: description});
        }
    }

    return currentUser != null ? (
        <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
            <View style={styles.container}>
                {/** Profile picture */}
                <Avatar
                    rounded
                    size="large"
                    source={image}
                    activeOpacity={0.7}
                />
                {/* Firebase issue. Get the user' peofile pic from the database*/}
                <View style={{marginBottom: 20}}>
                    <Text style={{fontSize: 24, paddingTop: 10}}>{displayName}</Text>
                </View>
                <View>
                    <Text style={{fontWeight: 'bold', position: 'absolute', left: -190}}>Description</Text>
                    <Text style={{position: 'absolute', marginTop: 20, left: -185}}>Mökarn</Text>
                </View>
                <View>
                    <Text style={{fontWeight: 'bold', position: 'absolute', left: -190, bottom: -140}}>Contact information</Text>
                </View>
                <View>
                    <Text style={{color: '#707070', fontWeight: 'bold', position: 'absolute', left: -185, bottom: -165}}>Phone number: {currentUser.phonenr}</Text>
                    <Text style={{color: '#707070', fontWeight: 'bold', position: 'absolute', left: -185, bottom: -185}}>Email: </Text>
                    <Text style={{color: '#707070', fontWeight: 'bold', position: 'absolute', left: -185, bottom: -205}}>Name: </Text>
                </View>
                <View style={{position: 'absolute', bottom: -520}}>
                    <BackButton title='Sign Out' onPress={() => logout()}/>
                </View>
                {/* <View style={{marginTop: 10}}>
                    <MainButton title='DELETE USER' onPress={() => handleDelete()}/>
                </View>*/}
            </View>
        </SafeAreaView>
    ) : (<Text></Text>);
}


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20,
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
