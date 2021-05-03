import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const MainFormInput = (props) => {
    [input, setInput] = useState('');

    return (
        <View style={{marginTop: 30, width: props.inputWidth}}>
            <Text style={styles.formTitle}>{props.inputTitle}</Text>
            <TextInput
                style={styles.input}
                width={props.inputWidth}
                placeholder={props.placeholder}
                placeholderTextColor={'#BFBFBF'}
                textAlign ='left'
                value={input}
                onChangeText={(text) => setInput(text)}
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
        borderColor: '#BFBFBF',
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        fontSize: 14,
        paddingLeft: 15,
        alignSelf: 'center',
    },
    narrowInput: {
        textAlign: 'center',
        height: 50,
        borderColor: '#BFBFBF',
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        fontSize: 14,
        paddingLeft: 15,
        alignSelf: 'center',
    },
});
