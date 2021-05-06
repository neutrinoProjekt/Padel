/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {
    StyleSheet, View, Modal,
    TouchableOpacity, SafeAreaView, Text,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MainButton from './../../components/MainButton';
import {styles} from './../styling/Styles';
import {createMatch} from '../../models/Match';
import {useAuth} from '../../contexts/auth';
import CardHeader from '../../components/CardHeader';
import DateTimePicker from '../../components/DateTimePicker';
import {validateTimeInterval, validateDate} from '../../validators/Parameters';
import RadioButton from '../../components/RadioButton';
import {colors} from './../styling/Colors';
import MainFormInput from '../../components/MainFormInput';


const AddMatchScreen = ({jamen}) =>(
    <Text>hej</Text>
);

/*
const AddMatchScreen = ({navigation}) => {
    const {currentUser} = useAuth();

    // state hooks for inputs
    const [city, setCity] = useState('');
    const [court, setCourt] = useState('');
    const [date, setDate] = useState('yyyy-mm-dd');
    const [timeFrom, setTimeFrom] = useState('hh:mm');
    const [timeTo, setTimeTo] = useState('hh:mm');
    const [errorMsg, setErrorMsg] = useState('');
    const [single, setSingle] = useState(true);
    const [double, setDouble] = useState(false);

    // parameters in iso format
    const [dateIso, setDateIso] = useState('');
    const [test, setTest] = useState('');
    const [test2, setTest2] = useState('');

    // Clear error messages
    useEffect(() => {
        setErrorMsg('');
    }, [date, timeFrom, timeTo, city, court]);


    /* Parameter handlers 
    const handleTimeFrom = (time) => {
        setTest(new Date(time));
        setTimeFrom(getTime(time));
    };

    const handleTimeTo = (time) => {
        setTest2(new Date(time));
        setTimeTo(getTime(time));
    };

    const handleDateConfirm = (date) => {
        setDateIso(new Date(date));
        setDate(getDate(date));
    };

    // Left header component
    const leftComponent = () => {
        return (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#707070'}}>Cancel</Text>
            </TouchableOpacity>
        );
    };

    /* Local date picker component
    const DatePicker = () => {
        return (
            <DateTimePicker
                placeholder={date}
                onConfirm={handleDateConfirm}
                subHeader='Date'
                mode='date'
                width={305}
            />
        );
    };

    /* Local time picker components
    const TimeFrom = () => {
        return (
            <DateTimePicker
                placeholder={timeFrom}
                onConfirm={handleTimeFrom}
                subHeader='From'
                mode='time'
                width={145}
            />
        );
    };

    const TimeTo = () => {
        return (
            <DateTimePicker
                placeholder={timeTo}
                onConfirm={handleTimeTo}
                subHeader='To'
                mode = 'time'
                width={145}
            />
        );
    };

    /* Getters (to be moved) 
    const getTime = (time) => {
        return time.toString().match(/\d\d:\d\d/)[0];
    };

    const getDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    /* Posts match if parameters are valid 
    const postMatch = () => {
        // Validate City input (todo: actually validate that it's a city)
        if (city == '') {
            setErrorMsg('Please enter a city');
            return;
        }

        // Validate paddle hall (todo: actually validate that it's a paddle hall)
        if (court == '') {
            setErrorMsg('Please enter a court');
            return;
        }
        // Validate date (todo: fix same date)
        if (date == 'yyyy-mm-dd') {
            setErrorMsg('Please suggest a date');
            return;
        } else if (!validateDate(date)) {
            setErrorMsg('Date has already passed');
            return;
        }

        // Validate time interval
        if (timeFrom == 'hh:mm' || timeTo == 'hh:mm') {
            setErrorMsg('Please enter a time interval');
            return;
        } else if (!validateTimeInterval(timeFrom, timeTo)) {
            setErrorMsg('Invalid time interval');
            return;
        }
        let mode = single ? 'Single' : 'Double';

        // TODO fix this mess
        const from = new Date(dateIso.getFullYear(), dateIso.getMonth(), dateIso.getDate(), test.getHours(), test.getMinutes());
        const to = new Date(dateIso.getFullYear(), dateIso.getMonth(), dateIso.getDate(), test2.getHours(), test2.getMinutes());

        createMatch({owner: currentUser.uid, city: city, court: court, from, to, mode: mode});
        navigation.goBack();
    };

    return (
        <Modal
            presentationStyle='pageSheet'
            animationType='slide'
        >
            <SafeAreaView style={styles2.safeContainer}>
                <CardHeader
                    centerHeader='Add Match'
                    leftComponent={leftComponent}
                />
                <ScrollView style={styles2.scrollContainer}>
                    <View style={{marginTop: 30, width: 305}}>
                        <MainFormInput
                            inputTitle='City'
                            placeholder='What city are you going to play in?'
                            input={city}
                            setInput={(text) => setCity(text)}
                            inputWidth={305}
                        />
                    </View>
                    <View style={{marginTop: 20, width: 305}}>
                        <MainFormInput
                            inputTitle='Court'
                            placeholder='What court are you going to play in?'
                            input={court}
                            setInput={(text) => setCourt(text)}
                            inputWidth={305}
                        />
                    </View>
                    <View style={{marginTop: 20, width: 305}}>
                        <DatePicker />
                    </View>
                    <View style={styles2.rowContainer}>
                        <View
                            style={{marginTop: 10,
                                width: 145,
                                marginRight: 10}}
                        >
                            <TimeFrom />
                        </View>
                        <View style={{marginTop: 10, width: 145}}>
                            <TimeTo />
                        </View>
                    </View>
                    <View style={{paddingTop: 10}}>
                        <Text style={styles2.formTitle}>Mode</Text>
                        <RadioButton
                            onClick={() => {
                                setSingle(true); setDouble(false);
                            }}
                            size={24}
                            color={single ? colors.signature : 'black'}
                            selected={single}
                            label='Single'
                        />
                        <RadioButton
                            onClick={() => {
                                setDouble(true); setSingle(false);
                            }}
                            size={24}
                            color={double ? colors.signature : 'black'}
                            selected={double}
                            label='Double'
                        />
                    </View>
                </ScrollView>
                <View style={styles2.actionButtonContainer}>
                    <Text style={[styles.error, {paddingTop: 30}]}>{errorMsg}</Text>
                    <TouchableOpacity>
                        <MainButton
                            title='Post Match'
                            onPress={postMatch}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </Modal>
    );
};
*/

export default AddMatchScreen;

/*
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
*/
