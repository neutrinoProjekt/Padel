import React from 'react';
import {Slider} from 'react-native-elements/dist/slider/Slider';

/* Parameter slider
/* @param step - Step value
/* @param min - Minimum value
/* @param max - Maximum value
/* @param onChange - Function called upon value change
/* @param thumbTintColor - Color of cursor
/* @param maxTrackColor - Color to the right of cursor
/* @param minTrackColor - Color to the left of cursor
/* @param disabled - Is slider disabled or not (bool)
*/
const ParameterSlider = (props) => {
    return (
        <Slider
            style={{width: 300}}
            step={props.step}
            minimumValue={props.min}
            maximumValue={props.max}
            value={props.value}
            onValueChange={props.onChange}
            thumbTintColor={props.thumbTintColor}
            maximumTrackTintColor= {props.maxTrackColor}
            minimumTrackTintColor={props.minTrackColor}
            disabled={props.disabled}
        />
    );
};

export default ParameterSlider;
