import React from 'react';
import {
    StyleSheet, View, Modal, TextInput, TouchableOpacity, SafeAreaView, Text,
} from 'react-native';
import {Divider, Header} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import MainButton from './../../components/MainButton';
import {styles} from './../styling/Styles';

const AddMatchScreen = ({navigation}) => {
    return (
        <Modal
            presentationStyle='pageSheet'
            animationType='slide'
        >
            <SafeAreaView style={styles2.safeContainer}>
                <Header
                    centerComponent={{
                        text: 'Add Match',
                        style: {
                            color: '#707070',
                            fontWeight: '600',
                            fontSize: 16},
                    }}
                    containerStyle={styles2.header}
                    leftComponent=
                        {{
                            text: 'Cancel',
                            onPress: () => {navigation.goBack();},
                            style: {
                                color: '#707070',
                                fontWeight: '600',
                                fontSize: 16},
                        }}
                >
                </Header>
                <Divider/>
                <ScrollView style={styles2.scrollContainer}>
                    <View style={{marginTop: 30, width: 305}}>
                        <Text style={styles2.formTitle}>City</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'What city would you like to play in?'}
                            placeholderTextColor={'#BFBFBF'}
                            textAlign ='left'
                        />
                    </View>
                    <View style={{marginTop: 30, width: 305}}>
                        <Text style={styles2.formTitle}>Court</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'What court are you going to play in?'}
                            placeholderTextColor={'#BFBFBF'}
                            textAlign ='left'
                        />
                    </View>
                    <View style={{marginTop: 30, width: 305}}>
                        <Text style={styles2.formTitle}>Date</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'yyyy-mm-dd'}
                            placeholderTextColor={'#BFBFBF'}
                            textAlign ='left'
                        />
                    </View>
                    <View style={styles2.rowContainer}>
                        <View style={{marginTop: 30, width: 145, marginRight: 10}}>
                            <Text style={styles2.formTitle}>From</Text>
                            <TextInput
                                style={styles.narrowInput}
                                placeholder={'hh:mm'}
                                placeholderTextColor={'#BFBFBF'}
                                textAlign ='left'
                            />
                        </View>
                        <View style={{marginTop: 30, width: 145}}>
                            <Text style={styles2.formTitle}>To</Text>
                            <TextInput
                                style={styles.narrowInput}
                                placeholder={'hh:mm'}
                                placeholderTextColor={'#BFBFBF'}
                                textAlign ='left'
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={styles2.actionButtonContainer}>
                    <TouchableOpacity>
                        <MainButton title='Post Match'/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default AddMatchScreen;

const styles2 = StyleSheet.create({
    safeContainer: {
        flex: 1,
        alignItems: 'center',
    },
    scrollContainer: {
        backgroundColor: 'white',
        height: '100%',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    header: {
        backgroundColor: 'white',
        height: 70,
        fontWeight: '800',
    },
    actionButtonContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 70,
    },
    formTitle: {
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#707070',
        fontSize: 12,
    },
});
