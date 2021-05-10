/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Modal, ScrollView} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {styles} from '../styling/Styles';
import MainButton from '../../components/MainButton';
import {LogBox} from 'react-native';
import {colors} from '../styling/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import CardHeader from '../../components/CardHeader';
import ToggleSwitch from '../../components/ToggleSwitch';
import DateTimePicker from '../../components/DateTimePicker';
import ParameterSlider from '../../components/ParameterSlider';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {validateDate, validateRankInterval} from '../../validators/Parameters';
import {createTournament} from '../../models/Tournament';
import {useAuth} from '../../contexts/auth';
import MainFormInput from '../../components/MainFormInput';
import {MAX_RANK, MIN_RANK, MIN_PLAYERS, MAX_PLAYERS, STEP} from '../../config';


const CreateTournamentScreen = ({navigation}) => {
    const {currentUser} = useAuth();
    // States interacting with slider
    const [rank1, setRank1] = useState(MIN_RANK); // used for Minimum rank slider
    const [rank2, setRank2] = useState(MIN_RANK); // used for Maximum rank slider
    const [players, setPlayers] = useState(1);
    const [rankColor, setRankColor] = useState(colors.colorYellow);

    // States for switches
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);

    // Parameters in iso
    const [isoDate, setIsoDate] = useState('');

    // States for date, time and location
    const [date, setDate] = useState('yyyy-mm-dd');
    const [errorMsg, setErrorMsg] = useState('');
    const [city, setCity] = useState('');
    const [tournamentName, setTournamentName] = useState('');

    // Relevant constants
    const imageUrl = {uri: 'https://image.freepik.com/free-photo/golden-trophy-cup-white-background-with-clipping-path_35913-551.jpg'};

    // Date confirmation
    const handleDateConfirm = (date) => {
        setIsoDate(new Date(date));
        setDate(getDate(date));
    };

    // Getters
    const getDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };

    // Set rank slider color
    const setRankSliderColor = () => {
        if (validateRankInterval(rank1, rank2) || !toggle2) {
            setRankColor(colors.colorYellow);
        } else {
            setRankColor('red');
        };
    };

    // Hook for clearing error message
    useEffect(() => {
        setErrorMsg('');
    }, [rank1, rank2, date]);

    // Create tournament
    const createTrnmnt = () => {
        // Validate rank interval
        if (toggle1 && toggle2 && !validateRankInterval(rank1, rank2)) {
            setErrorMsg('Invalid rank interval');
            return;
        };

        // Validate date (todo: fix same date)
        if (date == 'yyyy-mm-dd') {
            setErrorMsg('Please suggest a date');
            return;
        } else if (!validateDate(date)) {
            setErrorMsg('Date has already passed');
            return;
        }

        createTournament({
            owner: currentUser.uid,
            date: isoDate,
            minPlayers: toggle3 ? players : '-',
            minRank: toggle1 ? rank1 : '-',
            maxRank: toggle2 ? rank2 : '-',
            city: city,
            name: tournamentName,
        });
        navigation.goBack();
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

    // Ignore native driver message for now...
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);

    return (
        <Modal presentationStyle = 'pageSheet' animationType= 'slide'>
            <SafeAreaView>
                <CardHeader
                    centerHeader='Create Tournament'
                    leftComponent={
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#707070'}}>Cancel</Text>
                        </TouchableOpacity>
                    }
                />
                <ScrollView>
                    <View style={{alignItems: 'center', marginBottom: 100}}>
                        <Avatar source={imageUrl} size='xlarge'/>

                        {/* Tournament name */}
                        <View style={{paddingTop: 10, paddingRight: 15}}>
                            <MainFormInput
                                inputTitle='Name'
                                placeholder='What is the name of your tournament?'
                                inputWidth={305}
                                input={tournamentName}
                                setInput={(text) => setTournamentName(text)}
                            />
                        </View>

                        {/* Location */}
                        <View style={{paddingTop: 10, paddingRight: 15}}>
                            <MainFormInput
                                inputTitle='City'
                                placeholder='What city would you like to play in?'
                                inputWidth={305}
                                input={city}
                                setInput={(text) => setCity(text)}
                            />
                        </View>

                        {/* Date picker (start date)*/}
                        <View style={{paddingTop: 10}}>
                            <DatePicker />
                        </View>

                        {/* Minimum Rank Slider */}
                        <View style={{marginTop: 20}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{paddingLeft: 110, alignSelf: 'center'}}>
                                    <Text>Minimum rank</Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <ToggleSwitch
                                        onValueChange={(val) => setToggle1(val)}
                                        value={toggle1}/>
                                </View>
                            </View>
                            <ParameterSlider
                                step={STEP}
                                min={MIN_RANK}
                                max={MAX_RANK}
                                value={rank1}
                                onChange={(val) => {
                                    setRank1(val);
                                    setRankSliderColor();
                                }}
                                thumbTintColor={toggle1 ? colors.colorYellow : colors.colorDisabled}
                                maxTrackColor= {toggle1 ? colors.colorLightGrey : colors.colorDisabled}
                                minTrackColor={toggle1 ? rankColor : colors.colorDisabled}
                                disabled={!toggle1}
                            />
                            <View style={styling.textCon}>
                                <Text style={colors.colorDisabled}>{MIN_RANK}</Text>
                                <Text style={colors.colorYellow}>{toggle1 ? rank1 : ''}</Text>
                                <Text style={colors.colorDisabled}>{MAX_RANK}</Text>
                            </View>
                        </View>

                        {/* Maximum Rank Slider */}
                        <View style={{paddingTop: 10}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{paddingLeft: 110, alignSelf: 'center'}}>
                                    <Text>Maximum rank</Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <ToggleSwitch onValueChange={(val) => setToggle2(val)} value={toggle2}/>
                                </View>
                            </View>
                            <ParameterSlider
                                step={STEP}
                                min={MIN_RANK}
                                max={MAX_RANK}
                                value={rank2}
                                onChange={(val) => {
                                    setRank2(val);
                                    setRankSliderColor();
                                }}
                                thumbTintColor={toggle2 ? colors.colorYellow : colors.colorDisabled}
                                maxTrackColor={toggle2 ? colors.colorLightGrey : colors.colorDisabled}
                                minTrackColor={toggle2 ? colors.colorYellow : colors.colorDisabled}
                                disabled={!toggle2}
                            />
                            <View style={styling.textCon}>
                                <Text style={colors.colorDisabled}>{MIN_RANK}</Text>
                                <Text style={colors.colorYellow}>{toggle2 ? rank2 : ''}</Text>
                                <Text style={colors.colorDisabled}>{MAX_RANK}</Text>
                            </View>
                        </View>

                        {/* Minimum Players Slider */}
                        <View style={{paddingTop: 10}}>
                            <View style={{flexDirection: 'row'}}>
                                <View style={{paddingLeft: 101, alignSelf: 'center'}}>
                                    <Text>Minimum players</Text>
                                </View>
                                <View style={{flex: 1, alignItems: 'flex-end'}}>
                                    <ToggleSwitch
                                        onValueChange={(val) => setToggle3(val)}
                                        value={toggle3}
                                    />
                                </View>
                            </View>
                            <ParameterSlider
                                step={1}
                                min={MIN_PLAYERS}
                                max={MAX_PLAYERS}
                                value={players}
                                onChange={(val) => setPlayers(val)}
                                thumbTintColor={toggle3 ? colors.colorYellow : colors.colorDisabled}
                                maxTrackColor={toggle3 ? colors.colorLightGrey : colors.colorDisabled}
                                minTrackColor={toggle3 ? colors.colorYellow : colors.colorDisabled}
                                disabled={!toggle3}
                            />
                            <View style={styling.textCon}>
                                <Text style={colors.colorDisabled}>{MIN_PLAYERS}</Text>
                                <Text style={colors.colorYellow}>{toggle3 ? players : ''}</Text>
                                <Text style={colors.colorDisabled}>{MAX_PLAYERS}</Text>
                            </View>
                        </View>

                        {/* Button*/}
                        <View style={{marginBottom: -10}}>
                            <Text style={[styles.error, {marginTop: 10}]}>{errorMsg}</Text>
                        </View>
                        <View style={{marginTop: -15}}>
                            <MainButton title="Create tournament" onPress={createTrnmnt}/>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

export default CreateTournamentScreen;

const styling = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    textCon: {
        width: 320,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textInput: {
        height: 50,
        borderColor: '#BFBFBF',
        borderRadius: 10,
        backgroundColor: '#F7F7F7',
        fontSize: 20,
        width: 145,
    },
    safeContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
});
