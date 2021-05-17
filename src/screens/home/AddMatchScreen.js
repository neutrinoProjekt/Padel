/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {
    StyleSheet, View, Modal,
    TouchableOpacity, SafeAreaView, Text,
    ScrollView, Divider,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import MainButton from './../../components/MainButton';
import BackButton from './../../components/BackButton';
import {styles} from './../styling/Styles';
import {createMatch} from '../../models/Match';
import {useAuth} from '../../contexts/auth';
import CardHeader from '../../components/CardHeader';
import DateTimePicker from '../../components/DateTimePicker';
import {validateTimeInterval, validateDate, validateRankInterval} from '../../validators/Parameters';
import RadioButton from '../../components/RadioButton';
import {colors} from './../styling/Colors';
import MainFormInput from '../../components/MainFormInput';
import {MAX_RANK, MIN_RANK, STEP} from '../../config';
import ToggleSwitch from '../../components/ToggleSwitch';
import ParameterSlider from '../../components/ParameterSlider';
import {createNotification} from '../../models/Notification';
import {LogBox} from 'react-native';
import SearchInput from '../../components/SearchInput';
import {getUsers} from '../../models/User';
import UserItem from '../../components/UserItem';
import PlayerTag from '../../components/PlayerTag/';
import {getUserReference} from '../../models/User';

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
    const [contactinfo, setInfo] = useState(false);
    const [rank1, setRank1] = useState(MIN_RANK);
    const [rank2, setRank2] = useState(MIN_RANK);
    const [rankColor, setRankColor] = useState(colors.colorYellow);
    const [users, setUsers] = useState([]);
    const [errorMsg2, setErrorMsg2] = useState('');

    // state to show or not show search results
    const [showSearch, setShowSearch] = useState(false);

    // add participants to match
    const [players, setPlayers] = useState([]);


    // States for switches
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);

    // parameters in iso format
    const [dateIso, setDateIso] = useState('');
    const [test, setTest] = useState('');
    const [test2, setTest2] = useState('');
    const [searchUser, setSearchUser] = useState('');

    // Clear error messages
    useEffect(() => {
        setErrorMsg('');
        setErrorMsg2('');
    }, [date, timeFrom, timeTo, city, court, rank1, rank2, users]);


    /* Parameter handlers */
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

    // Set rank slider color
    const setRankSliderColor = () => {
        if (validateRankInterval(rank1, rank2) || !toggle2) {
            setRankColor(colors.colorYellow);
        } else {
            setRankColor('red');
        };
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

    /* Getters (to be moved) */
    const getTime = (time) => {
        return time.toString().match(/\d\d:\d\d/)[0];
    };

    const getDate = (date) => {
        return new Date(date).toISOString().split('T')[0];
    };


    /* Posts match if parameters are valid */
    const postMatch = () => {
        // Validate rank interval
        if (toggle1 && toggle2 && !validateRankInterval(rank1, rank2)) {
            setErrorMsg('Invalid rank interval');
            return;
        };

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
        const mode = single ? 'Single' : 'Double';

        // TODO fix this mess
        const from = new Date(dateIso.getFullYear(), dateIso.getMonth(), dateIso.getDate(), test.getHours(), test.getMinutes());
        const to = new Date(dateIso.getFullYear(), dateIso.getMonth(), dateIso.getDate(), test2.getHours(), test2.getMinutes());

        createMatch({owner: currentUser.uid, city: city, court: court, from, to, mode: mode, contactinfo: contactinfo, minRank: rank1, maxRank: rank2, result: 'No result yet'})
            .then((match) => {
                players.forEach((player) =>
                    createNotification({type: 'matchJoinRequest', header: 'New Match Invitation', owner: player.id, detailData: {id: match.id}}),
                );
            });
        navigation.goBack();
    };
    // Ignore native driver message for now...
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);


    const member = (players, user) => {
        let i = 0;
        for (i = 0; i < players.length; i++) {
            if (players[i].displayName == user.displayName) {
                return true;
            }
        }

        return false;
    };


    return (
        <Modal
            presentationStyle='pageSheet'
            animationType='slide'
        >
            <SafeAreaView>
                <CardHeader
                    centerHeader='Add Match'
                    leftComponent={leftComponent}
                />
                <ScrollView style={{height: '100%'}}>
                    <View style={{alignItems: 'center', marginBottom: 100}}>
                        <View style={{marginTop: 30, width: 305}}>
                            <SearchInput
                                inputTitle='Add participants'
                                inputWidth={305}
                                placeholder='Search to add participants'
                                onFocus={() => setShowSearch(true)}
                                onChangeText={(text) => {
                                    text == '' ? setUsers([]) : getUsers(text).then((u) => setUsers(u));
                                }}
                            />
                            <View style={{margin: 5}}>
                                {
                                    players.map((player) => (
                                        <PlayerTag
                                            key={player.displayName}
                                            fullname={player.fullname}
                                            onPress={() => setPlayers(players.filter((elem) => player.fullname != elem.fullname))}
                                        />
                                    ))
                                }
                            </View>
                            <Text style={[styles.error, {marginTop: 5, marginBottom: -40}]}>{errorMsg2}</Text>
                        </View>
                        {!showSearch ?
                            <>
                                {/* City*/}
                                <View style={{marginTop: 30, width: 305}}>
                                    <MainFormInput
                                        inputTitle='City'
                                        placeholder='What city are you going to play in?'
                                        input={city}
                                        setInput={(text) => setCity(text)}
                                        inputWidth={305}
                                    />
                                </View>

                                {/* Court*/}
                                <View style={{marginTop: 20, width: 305}}>
                                    <MainFormInput
                                        inputTitle='Court'
                                        placeholder='What court are you going to play in?'
                                        input={court}
                                        setInput={(text) => setCourt(text)}
                                        inputWidth={305}
                                    />
                                </View>

                                {/* Date picker*/}
                                <View style={{marginTop: 20, width: 305}}>
                                    <DatePicker />
                                </View>

                                {/* Time pickers*/}
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

                                {/* Minimum Rank Slider*/}
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
                                    <View style={styles2.textCon}>
                                        <Text style={colors.colorDisabled}>{MIN_RANK}</Text>
                                        <Text style={colors.colorDisabled}>{toggle1 ? rank1 : ''}</Text>
                                        <Text style={colors.colorDisabled}>{MAX_RANK}</Text>
                                    </View>
                                </View>

                                {/* Maximum rank slider */}
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
                                    <View style={styles2.textCon}>
                                        <Text style={colors.colorDisabled}>{MIN_RANK}</Text>
                                        <Text style={colors.colorYellow}>{toggle2 ? rank2 : ''}</Text>
                                        <Text style={colors.colorDisabled}>{MAX_RANK}</Text>
                                    </View>
                                </View>

                                {/* Mode selector*/}
                                <View style={{paddingTop: 20}}>
                                    <Text style={[styles2.formTitle, {width: 305, paddingTop: 10}]}>Mode</Text>
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

                                {/* Post match button*/}
                                <View style={styles2.actionButtonContainer}>
                                    <Text style={[styles.error, {marginBottom: -30}]}>{errorMsg}</Text>
                                    <TouchableOpacity>
                                        <MainButton
                                            title='Post Match'
                                            onPress={postMatch}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </> :
                            <View>
                                <ScrollView style={{marginTop: 30, width: 305}}>
                                    {
                                        // filter så att endast spelare som ej är appendade displayas
                                        users.map((user) => (
                                            (!member(players, user)) ?
                                                <UserItem
                                                    key={user.displayName}
                                                    fullname={user.fullname}
                                                    photoURL={user.photoURL}
                                                    displayName={user.displayName}
                                                    onPress={() => {
                                                        if (single && players.length == 1 || double && players.length == 3) {
                                                            setErrorMsg2('Maximum allowed players reached, change mode or remove a player to add more');
                                                            return;
                                                        }
                                                        setPlayers(players.concat([user]));
                                                    }}
                                                /> :
                                                <></>
                                        ))
                                    }
                                </ScrollView>
                                <View style={{position: 'absolute', marginTop: 60}}>
                                    <MainButton onPress={() => setShowSearch(false)}title={'Add users'}/>
                                    <View style={{marginTop: 10}}>
                                        <BackButton onPress={() => {
                                            setShowSearch(false); setPlayers([]);
                                        }} title={'Back'}/>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );
};

export default AddMatchScreen;

const styles2 = StyleSheet.create({
    safeContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        height: '100%',
    },
    scrollContainer: {
        backgroundColor: 'white',
        height: '100%',
    },
    checkbox: {
        alignSelf: 'center',
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
    },
    formTitle: {
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#707070',
        fontSize: 12,
    },
    textCon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
