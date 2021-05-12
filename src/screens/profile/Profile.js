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
    const [rating, setRating] = useState('');

    const updateProfile = () => {
        getUser(currentUser.uid)
            .then((data) => {
                setDescription(data.description);
                setImage({uri: data.photoURL});
                setDisplayName(data.displayName);
                setRating(data.rating);
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

    const SubHeader = (props) => {
        return (
            <View>
                <Text style={{fontWeight: 'bold', fontSize: 16}}>{props.title}</Text>
                <Divider style={{width: props.dividerWidth}}/>
            </View>
        );
    };

    const SubHeaderField = (props) => {
        return (
            <View style={styles.subHeaderContainer}>
                <Text style={styles.subHeader}>{props.header}</Text>
                <Text style={styles.subHeaderField}>{props.value}</Text>
            </View>
        );
    };

    return currentUser != null ? (
        <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
            <View style={styles.container}>
                {/** Profile picture */}
                <View style={{paddingTop: 50, alignSelf: 'center'}}>
                    <Avatar
                        rounded
                        size="large"
                        source={image}
                        activeOpacity={0.7}
                    />
                </View>
                {/* Firebase issue. Get the user' peofile pic from the database*/}
                <View style={{alignItems: 'center', marginTop: 10}}>
                    <Text style={{fontSize: 24, color: '#00CEB4'}}>{displayName}</Text>
                    <Text style={{marginTop: 10, color: '#707070', fontSize: 16}}>RATING</Text>
                    <Text style={{color: '#00CEB4'}}>{rating}</Text>
                </View>
                <View style={{paddingLeft: 10, marginTop: 30}}>
                    <SubHeader title='DESCRIPTION' dividerWidth={110}/>
                    <Text style={{paddingTop: 3}}>Tjena</Text>
                </View>
                <View style={{paddingLeft: 10, marginTop: 20}}>
                    <SubHeader title='CONTACT INFORMATION' dividerWidth={195}/>
                    <View style={{paddingTop: 3}}>
                        <SubHeaderField header='Phone Number:' value='Lmao'/>
                    </View>
                    <SubHeaderField header='Full name:' value='Lmao'/>
                    <SubHeaderField header='Email:' value='Lmao'/>
                    <SubHeaderField header='Country:' value='Lmao'/>
                    <SubHeaderField header='City:' value='Lmao'/>
                </View>
                <View style={{paddingLeft: 10, marginTop: 20}}>
                    <SubHeader title='STATISTICS' dividerWidth={90}/>
                    <View style={{paddingTop: 3}}>
                        <SubHeaderField header='Ranking (GLOBAL):' value={200}/>
                    </View>
                    <SubHeaderField header='Matches played:' value={0}/>
                    <SubHeaderField header='Rating:' value={0}/>
                    <SubHeaderField header='Wins:' value={0}/>
                    <SubHeaderField header='Losses:' value={0}/>
                    <SubHeaderField header='Winrate:' value={0}/>
                </View>
                <View style={{position: 'absolute', alignSelf: 'center', bottom: -450}}>
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
        backgroundColor: 'black',
        height: 230,
        marginTop: -48,
    },
    subHeader: {
        color: '#707070',
        fontWeight: 'bold',
    },
    subHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    subHeaderField: {
        color: '#707070',
        position: 'absolute',
        right: 5,
    },
});
