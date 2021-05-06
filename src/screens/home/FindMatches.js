import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MainButton from '../../components/MainButton';
import MainFormInput from '../../components/MainFormInput';
import DateTimePicker from '../../components/DateTimePicker';
import {getMatches} from '../../models/Match';
import {useAuth} from '../../contexts/auth';

const FindMatches = ({navigation}) => {
    const {currentUser} = useAuth();

    const matchData = getMatches(currentUser.uid);

    // States for input
    const [city, setCity] = useState('');
    const [court, setCourt] = useState('');
    const [dateFrom, setDateFrom] = useState('yyyy-mm-dd');
    const [dateTo, setDateTo] = useState('yyyy-mm-dd');
    const [errorMsg, setErrorMsg] = useState('');

    // Date confirmation (From)
    const handleDateFrom = (str) => {
        setDateFrom(getTime(str));
    };

    // Date confirmation (To)
    const handleDateTo = (str) => {
        setDateTo(getTime(str));
    };

    const getDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    /* Local date picker component (From)*/
    const DateFrom = () => {
        return (
            <DateTimePicker
                placeholder={dateFrom}
                onConfirm={handleDateFrom}
                subHeader='Date from'
                mode='date'
                width={145}
            />
        );
    };

    /* Local date picker component (To)*/
    const DateTo = () => {
        return (
            <DateTimePicker
                placeholder={dateTo}
                onConfirm={handleDateTo}
                subHeader='Date to'
                mode='date'
                width={145}
            />
        );
    };

    /* Posts match if parameters are valid */
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
        if (dateFrom == 'yyyy-mm-dd' || dateTo == 'yyyy-mm-dd') {
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
        navigation.navigate('SearchResults');
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
                <View style={styles.rowContainer}>
                    <View style={{marginRight: 10}}>
                        <DateFrom />
                    </View>
                    <DateTo />
                </View>
            </ScrollView>
            <View style={styles.actionButtonContainer}>
                <MainButton
                    title='Search'
                    onPress={() => navigation.navigate('SearchResults', matchData={matchData})}
                />
            </View>
        </SafeAreaView>
    );
};

export default FindMatches;

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
