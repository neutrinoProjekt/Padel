import React from 'react';
import {View, Text, Pressable, Modal, StyleSheet} from 'react-native';
import {Overlay} from 'react-native-elements';

const OverlayMenu = (props) => {
    const closeMenu =() =>{
        props.close();
    };

    return (
        <Overlay
            isVisible={props.open}
            ModalComponent={Modal}
            fullScreen = {false}
            transparent={true}
            onBackdropPress ={() => closeMenu()}
            overlayStyle = {styles.modalView}
        >
            <View style={styles.centeredView}>
                <Pressable
                    style={[styles.button, {backgroundColor: '#cf4242'}]}
                    onPress={props.onPress1}
                >
                    <Text style={[styles.textStyle]}>{props.text1}</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => {props.onPress2(); closeMenu();}}
                >
                    <Text style={styles.textStyle}>{props.text2}</Text>
                </Pressable>
                <Pressable
                    style={styles.button}
                    onPress={() => closeMenu()}
                >
                    <Text style={styles.textStyle}>Cancel</Text>
                </Pressable>
            </View>
        </Overlay>
    );
};


export default OverlayMenu;


const styles = StyleSheet.create({
    centeredView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 50,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        width: '130%',
        borderRadius: 15,
        padding: 10,
        paddingHorizontal: 20,
        margin: 4,
        elevation: 10,
        backgroundColor: '#00CEB4',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
