import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Divider} from 'react-native-elements';

/* Header used for typical "card-pages"
/* @param leftHeader - Left text field
/* @param leftOnPress - Function called when pressing leftHeader
/* @param centerHeader - Center text field (main header)
/* EXAMPLE: <CardHeader centerHeader={'My Account'} rightComponent= {<MainButton..../>} />
*/
const CardHeader = (props) => {
    return (
        <View>
            <Header
                centerComponent = {{
                    text: props.centerHeader,
                    style: styles.centerComponentStyle,
                }}
                containerStyle={styles.containerStyle}
                leftComponent = {props.leftComponent}
                rightComponent={props.rightComponent}
            />
            <Divider/>
        </View>
    );
};

export default CardHeader;

const styles = StyleSheet.create({
    leftComponentStyle: {
        color: '#707070',
        fontWeight: '600',
        fontSize: 16,
    },
    containerStyle: {
        backgroundColor: 'white',
        height: 70,
        fontWeight: '800',
    },
    centerComponentStyle: {
        color: '#707070',
        fontWeight: '600',
        fontSize: 16,
    },
});

