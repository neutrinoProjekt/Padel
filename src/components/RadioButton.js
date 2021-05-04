/* eslint-disable valid-jsdoc */
/* eslint-disable max-len */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

/** Radio button component
 * @property {function} onClick - Function called upon click
 * @property {number} size - Height and width
 * @property {string} color - Color (when selected and not selected)
 * @property {string} label - Text label
 * @return {function}
 */
const RadioButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onClick} activeOpacity={0.8} style={styles.radioButton}>
            <View style={[styles.radioButtonHolder, {height: props.size, width: props.size, borderColor: props.color}]}>
                {
                    (props.selected) ?
                        (<View style={[styles.radioIcon, {height: props.size / 2, width: props.size / 2, backgroundColor: props.color}]}></View>) :
                        null
                }
            </View>
            <Text style={[styles.label, {color: props.color}]}>{props.label}</Text>
        </TouchableOpacity>
    );
};


export default RadioButton;

const styles = StyleSheet.create({
    radioButton: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioButtonHolder: {
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioIcon: {
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        marginLeft: 10,
        fontSize: 20,
    },
});
