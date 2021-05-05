import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MainButton from '../../components/MainButton';
import MainFormInput from '../../components/MainFormInput';
import DateTimePicker from '../../components/DateTimePicker';

const Search = ({navigation}) => {
    // States for input
    const [city, setCity] = useState('');
    const [court, setCourt] = useState('');
    const [date, setDate] = useState('yyyy-mm-dd');
    const [timeFrom, setTimeFrom] = useState('hh:mm');
    const [timeTo, setTimeTo] = useState('hh:mm');

    // Date confirmation
    const handleDateConfirm = (date) => {
        date = getDate(date);
        setDate(date);
    };

    // Time confirmation (From)
    const handleTimeFrom = (str) => {
        setTimeFrom(getTime(str));
    };

    // Time confirmation (To)
    const handleTimeTo = (str) => {
        setTimeTo(getTime(str));
    };

    // Getters
    const getTime = (time) => {
        return time.toString().match(/\d\d:\d\d/)[0];
    };

    const getDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    /* Local date picker component*/
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

    /* Local time picker components*/
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

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.inputContainer}>
                    <MainFormInput
                        placeholder={'What city would you like to play in?'}
                        inputTitle={'City'}
                        inputWidth={305}
                        input={city}
                        setInput={(text) => setCity(text)}>
                    </MainFormInput>
                </View>
                <View style={styles.inputContainer}>
                    <MainFormInput
                        placeholder={'Search among courts'}
                        inputTitle={'Court'}
                        inputWidth={305}
                        input={court}
                        setInput={(text) => setCourt(text)}>
                    </MainFormInput>
                </View>
                {/* Date picker*/}
                <View style={styles.inputContainer}>
                    <DatePicker />
                </View>
                <View style={styles.rowContainer}>
                    <View style={{marginRight: 10}}>
                        <TimeFrom />
                    </View>
                    <TimeTo />
                </View>
            </ScrollView>
            <View style={styles.actionButtonContainer}>
                <MainButton
                    title='Search'
                    onPress={() => navigation.navigate('Matches')}
                />
            </View>
        </SafeAreaView>
    );
};

export default Search;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    scrollContainer: {
        height: '100%',
    },
    inputContainer: {
        marginTop: 30,
        width: 305,
    },
    actionButtonContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
    },
});
