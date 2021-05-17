import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

const MainFormInput = (props) => {
    console.log(props.placeholder)
    console.log(props.placeholder.length)
    return (
        <View>
            <Text style={styles.formTitle}>{props.inputTitle}</Text>
            <TextInput
                keyboardType={props.keyboardType}
                style={styles.input}
                width={props.inputWidth}
                placeholder={props.placeholder.length > 38 ? props.placeholder.substring(0,43) + "..." : props.placeholder}
                placeholderTextColor={'#BFBFBF'}
                textAlign ='left'
                value={props.input}
                onChangeText={props.setInput}
                height={props.height}
            />
        </View>
    );
};

export default MainFormInput;

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
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        fontSize: 14,
        paddingLeft: 15,
        paddingRight: 15,
        alignSelf: 'center',
    },
});
