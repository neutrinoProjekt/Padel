import React, {useState, useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MainButton from '../../components/MainButton';
import MainFormInput from '../../components/MainFormInput';
import DateTimePicker from '../../components/DateTimePicker';
import {getMatches} from '../../models/Match';

const FindMatches = ({navigation}) => {
    // States for input
    const [city, setCity] = useState('');
    const [court, setCourt] = useState('');
    const [dateFrom, setDateFrom] = useState('yyyy-mm-dd');
    const [dateTo, setDateTo] = useState('yyyy-mm-dd');
    const [errorMsg, setErrorMsg] = useState('');

    // parameters in iso format
    const [isoDateFrom, setIsoDateFrom] = useState('');
    const [isoDateTo, setIsoDateTo] = useState('');

    useEffect(() => {
        setErrorMsg('');
    }, [city, court]);

    // Date confirmation (From)
    const handleDateFrom = (str) => {
        setIsoDateFrom(new Date(str));
        setDateFrom(getDate(str));
    };

    // Date confirmation (To)
    const handleDateTo = (str) => {
        setIsoDateTo(new Date(str));
        setDateTo(getDate(str));
    };

    const getDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    // If isoDateFrom isn't empty, return that date.
    // Else, we return todays date.
    const checkDateFrom = () => {
        const date = new Date();
        if (isoDateFrom != '') {
            date.setFullYear(isoDateFrom.getFullYear());
            date.setMonth(isoDateFrom.getMonth());
            date.setDate(isoDateFrom.getDate());
        }
        return date;
    };

    // If isoDateTo isn't empty, return that date.
    // Else, we return the date that is a year from today.
    const checkDateTo = () => {
        const date = new Date();
        if (isoDateTo != '') {
            date.setFullYear(isoDateTo.getFullYear());
            date.setMonth(isoDateTo.getMonth());
            date.setDate(isoDateTo.getDate());
        } else {
            date.setFullYear(date.getFullYear() + 1);
        }
        return date;
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
                <Text style={[styles.error, {marginBottom: -30}]}>{errorMsg}</Text>
                <MainButton
                    title='Search'
                    onPress={async () => {
                        // TODO might mess up if you spam the button
                        const from = checkDateFrom();
                        const to = checkDateTo();
                        const parameters = {court, city, from, to};
                        const matchData = await getMatches(parameters);
                        if (matchData.length == 0) {
                            setErrorMsg('No matches match your search criteria');
                            return;
                        }
                        navigation.navigate('SearchResults', {matchData});
                    }}
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
    error: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ff0f0f',
        height: 60,
        width: 300,
        textAlign: 'center',
        alignSelf: 'center',
    },
});
