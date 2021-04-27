// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Avatar, Icon} from 'react-native-elements';
import {createStackNavigator} from '@react-navigation/stack';
import MainButton from '../components/MainButton';
import GreyBoxToWrite from '../components/GreyBoxToWrite';
import {useAuth} from '../contexts/auth';


// function that displays the Title of the whole page
// eslint-disable-next-line require-jsdoc
function LogoTitle() {
    return (
        <View style={styles.container}>
            <Text>PaddlePal</Text>
            <Text style={{color: '#707070', fontSize: 20, fontWeight: 'bold'}}>My Account</Text>
        </View>
    );
}

// function that displays screen under the header
function Screen() {
    const [descript, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phonenr, setPhonenr] = useState('');
    // this should be a function that checks if the image exist,
    // if image exist, get it from firestore
    // firebase
    const image = {uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'};

     const {currentUser} = useAuth();

    return (
        // source should be equal with a function that have an image
        <View style={styles.container}>
            <Avatar
                rounded
                size="xlarge"
                source={image}
                onPress={() => console.log('Works!')}
                activeOpacity={0.7}
            />

            {/* Firebase issue. Get the user' peofile pic from the database*/}
            <Text style={styles.text}>{currentUser.displayName}</Text>
            <Text style={{color: '#707070', fontSize: 15, fontWeight: 'bold'}}>
                {currentUser.email} </Text>

            {/* 3 grey boxes to put user's personal info*/}
            <View>
                <Text style={styles.subtitle}>Description:</Text>
                <GreyBoxToWrite placeholder={'Describe yourself...'} onChangeText={(text) => setDescription(text)}/>
                <Text style={styles.subtitle}> Contact info: </Text>
                <GreyBoxToWrite placeholder={'Mobile phone:'} onChangeText={(text) => setPhonenr(text)}/>
                <GreyBoxToWrite placeholder={'e-mail:'} onChangeText={(text) => setEmail(text)}/>
            </View>

            {/* Button to save the changes*/}
            <MainButton title='Save' onPress={()=> alert(phonenr)}/>
        </View>
    );
}

const Stack = createStackNavigator();

const PersonPageScreen = () => {
    return (
        <SafeAreaProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="Home"
                    component={Screen}
                    options={({navigation, route}) => ({
                        headerTitle: (props) => <LogoTitle {...props} />,
                    })}
                />
            </Stack.Navigator>
        </SafeAreaProvider>
    );
};

export default PersonPageScreen;

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
        minwidth: 200,
        textAlign: 'center',
    },
    subtitle: {
        color: '#707070',
        fontSize: 17,
        fontWeight: 'bold',
    },
});
