/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Modal} from 'react-native';
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

const CreateTournamentScreen = ({navigation}) => {
    // States interacting with slider
    const [rank1, setRank1] = useState(10); // used for Minimum rank slider
    const [rank2, setRank2] = useState(10); // used for Maximum rank slider
    const [players, setPlayers] = useState(1);
    const [rankColor, setRankColor] = useState(styling.colorYellow);

    // States for switches
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);

    // States for date and time
    const [date, setDate] = useState('dd-mm-yyyy');
    const [timeFrom, setTimeFrom] = useState('00:00');
    const [timeTo, setTimeTo] = useState('00:00');
    const [errorMsg, setErrorMsg] = useState('');

    // Relevant constants
    const minPlayers = 1;
    const maxPlayers = 10;
    const minRank = 10;
    const maxRank = 100;
    const step = maxRank % 9;
    const imageUrl = {uri: 'https://image.freepik.com/free-photo/golden-trophy-cup-white-background-with-clipping-path_35913-551.jpg'};

    // Date confirmation
    const handleDateConfirm = (date) => {
        date = getDate(date);
        setDate(date);
    };

    // Time confirmation (From)
    const handleTimeFrom = (str) => {
        const time = getTime(str);
        setTimeFrom(time);
    };

    // Time confirmation (To)
    const handleTimeTo = (str) => {
        const time = getTime(str);
        setTimeTo(time);
    };

    // Getters
    const getTime = (time) => {
        return time.toString().match(/\d\d\:\d\d/)[0];
    };

    const getDate = (date) => {
        date = date.toString().substring(0, 15).split(' ');
        return date[3] + '-' + date[1] + '-' + date[2];
    };


    // Validators
    const validRankInterval = () => {
        return rank1 <= rank2;
    };

    // Set rank slider color
    const setRankSliderColor = () => {
        if (validRankInterval()) {
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
        if (toggle1 && toggle2 && !validRankInterval()) {
            setErrorMsg('Invalid rank interval');
            return;
        };

        // Validate date
        if (date == 'dd-mm-yyyy') {
            setErrorMsg('Please suggest a date');
            return;
        };
        // timeFrom, timeTo, date, minplayers, minrank, maxrank
    };

    /* Local date picker component*/
    const Date = () => {
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

    // Ignore native driver message for now...
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);

    return (
        <Modal presentationStyle = 'pageSheet'animationType= 'slide'>
            <SafeAreaView>
                <CardHeader
                    centerHeader='Create Tournament'
                    leftHeader='Cancel'
                    leftOnPress={() => navigation.goBack()}
                />
                <View style={{alignItems: 'center'}}>
                    <Avatar source={imageUrl} size='xlarge'/>
                    {/* Minimum Rank Slider */}
                    <View style={{marginTop: 10}}>
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
                            step={step}
                            min={minRank}
                            max={maxRank}
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
                            <Text style={styling.colorGrey}>{minRank}</Text>
                            <Text style={styling.colorYellow}>{toggle1 ? rank1 : ''}</Text>
                            <Text style={styling.colorGrey}>{maxRank}</Text>
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
                            step={step}
                            min={minRank}
                            max={maxRank}
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
                            <Text style={colors.colorDisabled}>{minRank}</Text>
                            <Text style={colors.colorYellow}>{toggle2 ? rank2 : ''}</Text>
                            <Text style={colors.colorDisabled}>{maxRank}</Text>
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
                            min={minPlayers}
                            max={maxPlayers}
                            value={players}
                            onChange={(val) => setPlayers(val)}
                            thumbTintColor={toggle3 ? colors.colorYellow : colors.colorDisabled}
                            maxTrackColor={toggle3 ? colors.colorLightGrey : colors.colorDisabled}
                            minTrackColor={toggle3 ? colors.colorYellow : colors.colorDisabled}
                            disabled={!toggle3}
                        />
                        <View style={styling.textCon}>
                            <Text style={colors.colorDisabled}>{minPlayers}</Text>
                            <Text style={colors.colorYellow}>{toggle3 ? players : ''}</Text>
                            <Text style={styling.colorGrey}>{maxPlayers}</Text>
                        </View>
                    </View>

                    {/* Date picker*/}
                    <View style={{paddingTop: 10}}>
                        <Date />
                    </View>
                    {/* Time picker*/}
                    <View style={{flexDirection: 'row', paddingTop: 5, justifyContent: 'center'}}>
                        <TimeTo />
                        <TimeFrom />
                    </View>
                    {/* Button*/}
                    <View style={{marginBottom: -10}}>
                        <Text style={[styles.error, {marginTop: 10}]}>{errorMsg}</Text>
                    </View>
                    <View style={{marginTop: -15}}>
                        <MainButton title="Create tournament" onPress={createTrnmnt}/>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    );
};

export default CreateTournamentScreen;

const styling = StyleSheet.create({
    container: {
        flex: 1,
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
});
