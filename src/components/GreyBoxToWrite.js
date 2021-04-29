import React from 'react';
import {TextInput} from 'react-native';
import {StyleSheet} from 'react-native';

/* A grey input box to put some text in, for example
* decription, contactinfo, email
*
* Example: <GreyBoxToWrite placeholder={'Describe yourself..'}
* onChangeText={(text) => setDescription(text)}/>*/

const GreyBoxToWrite = (props) => {
    return (
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            placeholderTextColor={'#707070'}
            underlineColorAndroid='transparent'
            onChangeText={props.onChangeText}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        maxWidth: 500,
        height: 45,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 15,
        margin: '2%',
        backgroundColor: '#f7f7f7',
    },
});

export default GreyBoxToWrite;
