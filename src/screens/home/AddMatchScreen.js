import React, {useState} from 'react';
import {
    StyleSheet, View, Modal, TextInput,
    TouchableOpacity, SafeAreaView, Text, Pressable,
} from 'react-native';
import {Divider, Header} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import MainButton from './../../components/MainButton';
import {styles} from './../styling/Styles';
import {createMatch} from '../../models/Match';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useAuth} from '../../contexts/auth';

const AddMatchScreen = ({navigation}) => {
    const {currentUser} = useAuth();

    // state hooks for inputs
    const [city, setCity] = useState('');
    const [court, setCourt] = useState('');
    const [date, setDate] = useState('yyyy-mm-dd');
    const [from, setFrom] = useState('hh:mm');
    const [to, setTo] = useState('hh:mm');


    // state hooks for date-/time-pickers
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    // time picker functions
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    // date picker functions
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (time) => {
        hideDatePicker();
    };

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
                            onPress: () => {
                                navigation.goBack();
                            },
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
                            value={city}
                            onChangeText={(text) => setCity(text)}
                        />
                    </View>
                    <View style={{marginTop: 30, width: 305}}>
                        <Text style={styles2.formTitle}>Court</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'What court are you going to play in?'}
                            placeholderTextColor={'#BFBFBF'}
                            textAlign ='left'
                            value={court}
                            onChangeText={(text) => setCourt(text)}
                        />
                    </View>
                    <View style={{marginTop: 30, width: 305}}>
                        <Text style={styles2.formTitle}>Date</Text>
                        <Pressable onPress={showDatePicker}>
                            <View pointerEvents='none'>
                                <TextInput
                                    style={styles.input}
                                    placeholder={'yyyy-mm-dd'}
                                    placeholderTextColor={'#BFBFBF'}
                                    textAlign ='left'
                                />
                            </View>
                        </Pressable>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            isDarkModeEnabled={true}
                            locale='sv_SE'
                            headerTextIOS='Pick Date'
                        />
                    </View>
                    <View style={styles2.rowContainer}>
                        <View
                            style={{marginTop: 30,
                                width: 145,
                                marginRight: 10}}
                        >
                            <Text style={styles2.formTitle}>From</Text>
                            <Pressable onPress={showTimePicker}>
                                <View pointerEvents='none'>
                                    <TextInput
                                        style={styles.narrowInput}
                                        placeholder={'hh:mm'}
                                        placeholderTextColor={'#BFBFBF'}
                                        textAlign='left'
                                    />
                                </View>
                            </Pressable>
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleConfirm}
                                onCancel={hideTimePicker}
                                isDarkModeEnabled={true}
                                locale='sv_SE'
                                headerTextIOS='Pick Time'
                            />
                        </View>
                        <View style={{marginTop: 30, width: 145}}>
                            <Pressable onPress={showTimePicker}>
                                <View pointerEvents='none'>
                                    <Text style={styles2.formTitle}>To</Text>
                                    <TextInput
                                        style={styles.narrowInput}
                                        placeholder={'hh:mm'}
                                        placeholderTextColor={'#BFBFBF'}
                                        textAlign ='left'
                                    />
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles2.actionButtonContainer}>
                    <TouchableOpacity>
                        <MainButton
                            title='Post Match'
                            onPress={() => {
                                createMatch({owner: currentUser.uid, city, court});
                                navigation.goBack();
                            }}
                        />
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
