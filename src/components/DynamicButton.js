/* eslint-disable max-len */
import React from 'react';
import {Button} from 'react-native-elements';

/* DynamicButton - similar to MainButton in shape, but with dynamic title styling and box coloring
   custom props: {title, onPress, titleStyle, boxColor}
   Note: boxColor='transparent' gives a transparent box
   Example: <TransparentButton title='Next' onPress={some_function} titleStyle={custom styling} boxColor='transparent'/>
*/
const DynamicButton = (props) => {
    return (
        <Button
            titleStyle={props.textStyle}
            title = {props.title}
            onPress = {props.onPress}
            type = 'clear'
            containerStyle = {{
                height: 40,
                width: 305,
                borderRadius: 10,
                backgroundColor: props.boxColor,
            }}
        />
    );
};

export default DynamicButton;

