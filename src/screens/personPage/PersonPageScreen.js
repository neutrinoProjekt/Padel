// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-elements';
import MainButton from '../../components/MainButton';
import GreyBoxToWrite from '../../components/GreyBoxToWrite';
import {useAuth} from '../../contexts/auth';

// function that displays screen under the header
export default function PersonPageScreen() {
    const [phonenr, setPhonenr] = useState('');
    // this should be a function that checks if the image exist,
    // if image exist, get it from firestore
    // firebase
    const image = {uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'};

    const {currentUser, logout} = useAuth();

    return (
        // source should be equal with a function that have an image
        <View style={styles.container}>
            <Text style={{color: '#707070', fontSize: 20, fontWeight: 'bold'}}>My Account</Text>
            <Avatar
                rounded
                size="xlarge"
                source={image}
                onPress={() => console.log('Works!')}
                activeOpacity={0.7}
            />

            {/* Firebase issue. Get the user' peofile pic from the database*/}
            <Text style={styles.text}>{currentUser.displayName}</Text>
            <Text style={{color: '#707070', fontSize: 15, fontWeight: 'bold'}}>{currentUser.email}</Text>

            {/* 3 grey boxes to put user's personal info*/}
            <View>
                <Text style={styles.subtitle}>Description:</Text>
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#00ceb4',
        minWidth: 200,
        textAlign: 'center',
    },
    subtitle: {
        color: '#707070',
        fontSize: 17,
        fontWeight: 'bold',
    },
});