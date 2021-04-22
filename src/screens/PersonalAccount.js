// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity, ImageBackground,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Avatar, Icon} from 'react-native-elements';
// import {styles} from '../screens/Styles';


const PersonalAccount = () => {
    const [descript, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [phonenr, setPhonenr] = useState('');
    const image = {uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'};

    return (
        <SafeAreaProvider>

            <View style={{color: 'white'}}>
                <TouchableOpacity style={styles.buttonright}>
                    <Icon
                        name={'save'}
                        color={'#707070'}
                    />
                </TouchableOpacity>
            </View>

            <ImageBackground source = {image} style = {styles.image}>
                <View style={styles.container}>
                    <Avatar
                        rounded
                        size="xlarge"
                        source={image}
                        onPress={() => console.log('Works!')}
                        activeOpacity={0.7}
                    />
                    <Text style={styles.text}>Albert Einstein</Text>
                    <Text style={{color: '#707070', fontSize: 10}}>
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
                            value={descript}
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
                            value = {phonenr}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => setPhonenr(text)}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder={'e-mail:'}
                            placeholderTextColor={'#707070'}
                            underlineColorAndroid='transparent'
                            value = {email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaProvider>
    );
};


export default PersonalAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        blurRadius: 100,
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
        alignSelf: 'flex-end',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    buttonleft: {
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
});
