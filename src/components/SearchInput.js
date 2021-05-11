import React from 'react'
import {StyleSheet, Text, View, TextInput} from 'react-native';

const SearchInput = (props) => {
    return (
        <View>
            <Text style={styles.formTitle}>{props.inputTitle}</Text>
            <TextInput
                keyboardType={props.keyboardType}
                style={styles.input}
                width={props.inputWidth}
                placeholder={props.placeholder}
                placeholderTextColor={'#BFBFBF'}
                textAlign ='left'
                value={props.input}
                onChangeText={props.setInput}
                onFocus={props.onFocus}
                onChangeText={props.onChangeText}
            />
        </View>
    );
};

export default SearchInput

const styles = StyleSheet.create({
    formTitle: {
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#707070',
        fontSize: 12,
    },
    input: {
        textAlign: 'center',
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F7F7F7',
        fontSize: 14,
        paddingLeft: 15,
        alignSelf: 'center',
    },
});

