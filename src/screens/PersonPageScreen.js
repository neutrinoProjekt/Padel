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


// function that displays the Title of the whole page
// eslint-disable-next-line require-jsdoc
function LogoTitle() {
    return (
        <View style={styles.container}>
            <Text>PaddlePal</Text>
            <Text style={{color: '#707070', fontSize: 25, fontWeight: 'bold'}}>My Account</Text>
        </View>
    );
}

// function that displays screen under the header
// eslint-disable-next-line require-jsdoc
function Screen() {
    const [descript, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phonenr, setPhonenr] = useState('');
    // this should be a function that checks if the image exist,
    // if image exist, get it from firestore
    // firebase
    const image = {uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'};

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

            {/* Firebase issue*/}
            <Text style={styles.text}>Albert Einstein</Text>
            <Text style={{color: '#707070', fontSize: 15, fontWeight: 'bold'}}>
                        alb_ein_2021
            </Text>
            <View>
                <Text style={{
                    color: '#707070',
                    fontSize: 17,
                    fontWeight: 'bold'}}>
                            Description:
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Describe yourself...'}
                    placeholderTextColor={'#707070'}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => setDescription(text)}
                />
                <Text style={{
                    color: '#707070',
                    fontSize: 17,
                    fontWeight: 'bold'}}>
                            Contact info:
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder={'Mobile phone:'}
                    placeholderTextColor={'#707070'}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => setPhonenr(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder={'e-mail:'}
                    placeholderTextColor={'#707070'}
                    underlineColorAndroid='transparent'
                    onChangeText={(text) => setEmail(text)}
                />
            </View>
            <View style={{color: 'white'}}>
                <TouchableOpacity style={styles.buttonright}>
                    <Icon
                        name={'done'}
                        color={'#707070'}
                        // firebase issue
                        onPress={()=> alert(phonenr)}
                    />
                </TouchableOpacity>
            </View>
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
    input: {
        maxWidth: 500,
        minWidth: 500,
        height: 45,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 15,
        margin: '2%',
        backgroundColor: '#f7f7f7',
    },
    buttonright: {
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
});
