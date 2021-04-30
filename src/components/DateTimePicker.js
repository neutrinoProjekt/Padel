import React from 'react';
import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DateTimePicker = (props) => {
    return (
        <Pressable onPress={props.onPress}>
            <View pointerEvents='none' style={{paddingRight: 10}}>
                <Text style={styles.subHeader}>{props.subHeader}</Text>
                <TextInput
                    placeholder={props.placeholder}
                    placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                    style={[styles.textInput, {width: props.width}]}
                    textAlign = 'center'
                />
                <DateTimePickerModal
                    isVisible={props.isVisible}
                    mode={props.mode}
                    onConfirm={props.onConfirm}
                    onCancel={props.onCancel}
                    isDarkModeEnabled={true}
                    locale='sv_SE'
                />
            </View>
        </Pressable>
    );
};

export default DateTimePicker;

const styles = StyleSheet.create({
    subHeader: {
        paddingBottom: 10,
        fontWeight: 'bold',
        fontSize: 12,
        color: '#707070',
    },
    textInput: {
        height: 50,
        borderColor: '#BFBFBF',
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        fontSize: 20,
    },

});
