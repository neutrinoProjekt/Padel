import React from 'react';
import {Switch} from 'react-native-switch';
import {colors} from '../screens/styling/Colors';


/* Default switch used for toggling (on/off)
/* @param value - Switch is on/off (true/false)
/* @param onValueChange - Function called when switch is toggled
*/
const ToggleSwitch = (props) => {
    return (
        <Switch
            value={props.value}
            onValueChange={props.onValueChange}
            activeText={'On'}
            inActiveText={'Off'}
            circleActiveColor={colors.colorYellow}
            circleInctiveColor={colors.colorLightGrey}
        />
    );
};

export default ToggleSwitch;
