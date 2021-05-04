import React, { useState } from 'react';
import {Pressable, StyleSheet, Text, View, TextInput} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

/* Custom date, time or date&time picker
/* @param onPress
/*
/*
/*
*/


const DateTimePicker = (props) => {
    const [visible, setVisibility] = useState(false);
    const showPicker = () => {
        setVisibility(true);
    };
    const hidePicker = () => {
        setVisibility(false);
    };

    return (
        <Pressable onPress={showPicker}>
            <View pointerEvents='none' style={{paddingRight: 10}}>
                <Text style={styles.subHeader}>{props.subHeader}</Text>
                <TextInput
                    placeholder={props.placeholder}
                    style={[styles.textInput, {width: props.width}]}
                />
                <DateTimePickerModal
                    isVisible={visible}
                    mode={props.mode}
                    onConfirm={props.onConfirm}
                    onCancel={hidePicker}
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
        fontSize: 14,
        paddingLeft: 15,
    },

});
