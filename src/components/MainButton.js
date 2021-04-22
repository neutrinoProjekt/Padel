import React from 'react';
import {Button} from 'react-native-elements';

/* MainButton
   custom props: {title, onPress}
   Example: <MainButton title='Next' onPress={some_function}/>
*/
const MainButton = (props) => {
    return (
        <Button
            titleStyle={{
                color: '#ffffff',
                fontWeight: 'bold',
            }}
            containerStyle = {{
                height: 40,
                width: 305,
                borderRadius: 10,
                backgroundColor: '#00CEB4',
            }}
            title = {props.title}
            onPress = {props.onPress}
            type = 'clear'
            raised
        />
    );
};

export default MainButton;

