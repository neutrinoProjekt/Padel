// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Avatar, Icon} from 'react-native-elements';

const Personal = () => {
    const [descript, setDescription] = useState('');
    const [contactinfo, setContactInfo] = useState('');
};


const PersonalAccount = () => {
    return (
        <SafeAreaProvider>
            <View>
                <TouchableOpacity style={styles.button}>
                    <Icon
                        name={'done'}
                        color={'#707070'}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Avatar
                    rounded
                    size="xlarge"
                    source={{
                        uri:
                            'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390',
                    }}
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
                        placeholder={'Mobile phone:\n' +
                        '                            \ne-mail:'}
                        placeholderTextColor={'#707070'}
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => setContactInfo(text)}
                    />
                </View>
            </View>
        </SafeAreaProvider>
    );
};


export default PersonalAccount;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
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
    button: {
        alignSelf: 'flex-end',
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
});
