/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useLayoutEffect} from 'react';
import {Text, View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Avatar} from 'react-native-elements';
import MainButton from '../../components/MainButton';
import GreyBoxToWrite from '../../components/GreyBoxToWrite';
import {useAuth} from '../../contexts/auth';
import {getUser} from '../../models/User';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import CardHeader from '../../components/CardHeader';
import {SafeAreaView} from 'react-native-safe-area-context';

// function that displays screen under the header
export default function PersonPageScreen({navigation}) {
    const [phonenr, setPhonenr] = useState('');
    const [image, setImage] = useState({uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'});
    const [description, setDescription] = useState('');
    // this should be a function that checks if the image exist,
    // if image exist, get it from firestore
    // firebase
    const {currentUser, logout} = useAuth();

    useEffect(() => {
        getUser(currentUser.uid)
            .then((data) => {
                setDescription(data.description);
                setImage(data.photoURL);
            });
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'My Account', // header title
            headerTitleAlign: 'center',
            headerTitleStyle: {alignSelf: 'center'},
            headerRight: () => (
                <View style={{  paddingRight: 15}}>
                    <MaterialCommunityIcons
                            name="podium-gold"
                            size={24}
                            color='#707070'
                            onPress={()=> navigation.navigate('RankView')
                        }
                    />
                </View>
            )
        })

    }, [navigation])

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
                    <Text style={[styles.subtitle]}>Description:</Text>
                    <GreyBoxToWrite placeholder={'Describe yourself...'} onChangeText={(text) => setDescription(text)}/>
                    <Text style={styles.subtitle}> Contact info: </Text>
                    <GreyBoxToWrite placeholder={'Mobile phone:'} onChangeText={(text) => setPhonenr(text)}/>
                </View>

                {/* Button to save the changes*/}
                <MainButton title='Save' onPress={() => alert(phonenr)}/>
                <View style={{marginTop: 10}}>
                    <MainButton title='Sign Out' onPress={() => logout()}/>
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
