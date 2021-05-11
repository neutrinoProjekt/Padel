import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateTimePicker from '../../components/DateTimePicker';
import MainButton from '../../components/MainButton';
import MainFormInput from '../../components/MainFormInput';
import {getTournaments} from '../../models/Tournament';


const FindTournaments = ({navigation}) => {
    const [city, setCity] = useState('');
    const [dateFrom, setDateFrom] = useState('yyyy-mm-dd');
    const [errorMsg, setErrorMsg] = useState('');
    const imageUrl = {uri: 'https://image.freepik.com/free-photo/golden-trophy-cup-white-background-with-clipping-path_35913-551.jpg'};

    useEffect(() => {
        setErrorMsg('');
    }, [city, dateFrom]);

    // ISO date
    const [dateFromISO, setDateFromISO] = useState(new Date());

    const handleDateFrom = (str) => {
        setDateFromISO(new Date(str));
        setDateFrom(getDate(str));
    };

    // Getters
    const getDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    const DateFrom = () => {
        return (
            <DateTimePicker
                placeholder={dateFrom}
                onConfirm={handleDateFrom}
                subHeader='Date from'
                mode='date'
                width={305}
            />
        );
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{alignItems: 'center'}}>
                <Avatar source={imageUrl} size='xlarge'/>
            </View>
            <View style={[styles.inputContainer, {marginLeft: -10}]}>
                <MainFormInput
                    placeholder={'Enter a city to search for'}
                    inputTitle={'City'}
                    inputWidth={305}
                    input={city}
                    setInput={(text) => setCity(text)}>
                </MainFormInput>
            </View>
            <View style={{marginTop: 20}}>
                <DateFrom />
            </View>
            <Text style={[styles.error, {marginTop: 10}]}>{errorMsg}</Text>
            <View style={styles.actionButtonContainer}>
                <MainButton
                    title='Search'
                    onPress={async () => {
                        if (dateFromISO == '') {
                            setErrorMsg('Please enter a date');
                            return;
                        }
                        const from = new Date(dateFromISO.getFullYear(), dateFromISO.getMonth(), dateFromISO.getDate(), '0', '0');
                        const parameters = {city, from};
                        const tournamentData = await getTournaments(parameters);
                        navigation.navigate('Search Results', {tournamentData});
                    }}
                />
            </View>
        </SafeAreaView>
    );
};

export default FindTournaments;

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
