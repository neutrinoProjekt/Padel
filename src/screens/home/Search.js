import React, {useState} from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MainButton from '../../components/MainButton';
import MainFormInput from '../../components/MainFormInput';

const Search = ({navigation}) => {

    // States for input
    const [city, setCity] = useState('');
    const [court, setCourt] = useState('');
    const [date, setDate] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView style={styles.scrollContainer}>
                <MainFormInput
                    placeholder={'What city would you like to play in?'}
                    inputTitle={'City'}
                    inputWidth={305}
                    input={city}
                    setInput={(text) => setCity(text)}>
                </MainFormInput>
                <MainFormInput
                    placeholder={'Search among courts'}
                    inputTitle={'Court'}
                    inputWidth={305}
                    input={court}
                    setInput={(text) => setCourt(text)}>
                </MainFormInput>
                <MainFormInput
                    placeholder={'yyyy-mm-dd'}
                    inputTitle={'Date'}
                    inputWidth={305}
                    input={date}
                    setInput={(text) => setDate(text)}>
                </MainFormInput>
                <View style={styles.rowContainer}>
                    <MainFormInput
                        placeholder={'hh:mm'}
                        inputTitle={'From'}
                        inputWidth={145}
                        marginRight={10}
                        input={from}
                        setInput={(text) => setFrom(text)}>
                    </MainFormInput>
                    <MainFormInput
                        placeholder={'hh:mm'}
                        inputTitle={'To'}
                        inputWidth={145}
                        input={to}
                        setInput={(text) => setTo(text)}>
                    </MainFormInput>
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
    actionButtonContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
