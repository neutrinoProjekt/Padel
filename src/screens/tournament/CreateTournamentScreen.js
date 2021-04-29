/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, Pressable} from 'react-native';
import {Switch} from 'react-native-switch';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {styles} from '../styling/Styles';
import {Slider} from 'react-native-elements/dist/slider/Slider';
import MainButton from '../../components/MainButton';
import {LogBox} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const CreateTournamentScreen = () => {
    // States interacting with slider
    const [rank1, setRank1] = useState(10); // used for Minimum rank slider
    const [rank2, setRank2] = useState(10); // used for Maximum rank slider
    const [players, setPlayers] = useState(1);
    const [rankColor, setRankColor] = useState(styling.colorYellow);

    // States for toggling (toggle buttons)
    const [toggle1, setToggle1] = useState(false);
    const [toggle2, setToggle2] = useState(false);
    const [toggle3, setToggle3] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible1, setTimePickerVisibility1] = useState(false);
    const [isTimePickerVisible2, setTimePickerVisibility2] = useState(false);


    // States for date and time
    const [date, setDate] = useState('dd-mm-yyyy');
    const [timeFrom, setTimeFrom] = useState('00:00');
    const [timeTo, setTimeTo] = useState('00:00');

    // Relevant constants
    const minPlayers = 1;
    const maxPlayers = 10;
    const minRank = 10;
    const maxRank = 100;
    const step = maxRank % 9;
    const imageUrl = {uri: 'https://image.freepik.com/free-photo/golden-trophy-cup-white-background-with-clipping-path_35913-551.jpg'};

    // date picker functions
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        date = getDate(date);
        setDate(date);
        hideDatePicker();
    };

    // Time picker functions (from)
    const showTimePicker1 = () => {
        setTimePickerVisibility1(true);
    };

    const hideTimePicker1 = () => {
        setTimePickerVisibility1(false);
    };

    const handleTimeFrom = (str) => {
        const time = getTime(str);
        setTimeFrom(time);
        hideTimePicker1();
    };

    // Time picker functions (to)
    const hideTimePicker2 = () => {
        setTimePickerVisibility2(false);
    };
    const showTimePicker2 = () => {
        setTimePickerVisibility2(true);
    };

    const handleTimeTo = (str) => {
        const time = getTime(str);
        setTimeTo(time);
        hideTimePicker2();
    };

    // Returns time formatted as xx:xx, given a random string containing xx:xx
    const getTime = (time) => {
        return time.toString().match(/\d\d\:\d\d/)[0];
    };

    // Returns date
    const getDate = (date) => {
        date = date.toString().substring(0, 15).split(' ');
        return date[3] + '-' + date[1] + '-' + date[2];
    };


    // Ignore native driver message for now...
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);

    // Check whether entered rank interval is valid
    const validRankInterval = () => {
        return rank1 <= rank2;
    };

    // Set rank slider color
    const setRankSliderColor = () => {
        if (validRankInterval()) {
            setRankColor('rgb(252, 228, 149)');
        } else {
            setRankColor('red');
        };
    };

    const [errorMsg, setErrorMsg] = useState('');
    // Create tournament
    const createTrnmnt = () => {
    
    };

    return (
        <View style={{alignItems: 'center'}}>
            <View style={styles.titleAlignment}>
                <Text style={styles.title}>Create Tournament</Text>
            </View>
            <View>
                <Avatar
                    source={imageUrl}
                    size='xlarge'
                />
            </View>

            {/* Minimum Rank Slider */}
            <View style={{marginTop: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{paddingLeft: 110, alignSelf: 'center'}}>
                        <Text>Minimum rank</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Switch
                            value={toggle1}
                            onValueChange={(val) => setToggle1(val)}
                            activeText={'On'}
                            inActiveText={'Off'}
                            circleActiveColor={'rgb(252, 228, 149)'}
                            circleInctiveColor={'#d3d3d3'}
                        />
                    </View>
                </View>
                <Slider
                    style={{width: 300}}
                    step={step}
                    minimumValue={minRank}
                    maximumValue={maxRank}
                    value={rank1}
                    onValueChange={(val) => {
                        setRank1(val);
                        setRankSliderColor();
                    }}
                    thumbTintColor={toggle1 ? 'rgb(252, 228, 149)' : 'grey'}
                    maximumTrackTintColor= {toggle1 ? '#d3d3d3' : 'grey'}
                    minimumTrackTintColor={toggle1 ? rankColor : 'grey'}
                    disabled={!toggle1}
                />
                <View style={styling.textCon}>
                    <Text style={styling.colorGrey}>{minRank}</Text>
                    <Text style={styling.colorYellow}>
                        {toggle1 ? rank1 : ''}
                    </Text>
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
                        <Switch
                            value={toggle2}
                            onValueChange={(val) => setToggle2(val)}
                            activeText={'On'}
                            inActiveText={'Off'}
                            circleActiveColor={'rgb(252, 228, 149)'}
                            circleInctiveColor={'#d3d3d3'}
                        />
                    </View>
                </View>
                <Slider
                    style={{width: 300}}
                    step={step}
                    minimumValue={minRank}
                    maximumValue={maxRank}
                    value={rank2}
                    onValueChange={(val) => {
                        setRank2(val);
                        setRankSliderColor();
                    }}
                    thumbTintColor={toggle2 ? 'rgb(252, 228, 149)' : 'grey'}
                    maximumTrackTintColor={toggle2 ? '#d3d3d3' : 'grey'}
                    minimumTrackTintColor={toggle2 ? 'rgb(252, 228, 149)' : 'grey'}
                    disabled={!toggle2}
                />
                <View style={styling.textCon}>
                    <Text style={styling.colorGrey}>{minRank}</Text>
                    <Text style={styling.colorYellow}>
                        {toggle2 ? rank2 : ''}
                    </Text>
                    <Text style={styling.colorGrey}>{maxRank}</Text>
                </View>
            </View>

            {/* Minimum Players Slider */}
            <View style={{paddingTop: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{paddingLeft: 101, alignSelf: 'center'}}>
                        <Text>Minimum players</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                        <Switch
                            value={toggle3}
                            onValueChange={(val) => setToggle3(val)}
                            activeText={'On'}
                            inActiveText={'Off'}
                            circleActiveColor={'rgb(252, 228, 149)'}
                            circleInctiveColor={'#d3d3d3'}
                        />
                    </View>
                </View>
                <Slider
                    style={{width: 300}}
                    step={1}
                    minimumValue={minPlayers}
                    maximumValue={maxPlayers}
                    value={players}
                    onValueChange={(val) => setPlayers(val)}
                    thumbTintColor={toggle3 ? 'rgb(252, 228, 149)' : 'grey'}
                    maximumTrackTintColor={toggle3 ? '#d3d3d3' : 'grey'}
                    minimumTrackTintColor={toggle3 ? 'rgb(252, 228, 149)' : 'grey'}
                    disabled={!toggle3}
                />
                <View style={styling.textCon}>
                    <Text style={styling.colorGrey}>{minPlayers}</Text>
                    <Text style={styling.colorYellow}>
                        {toggle3 ? players : ''}
                    </Text>
                    <Text style={styling.colorGrey}>{maxPlayers}</Text>
                </View>
            </View>
            {/* Date picker*/}
            <Pressable onPress={showDatePicker}>
                <View style={{marginTop: 20}} pointerEvents="none">
                    <Text style={{paddingBottom: 10, fontWeight: 'bold', fontSize: 12, color: '#707070'}}>Date</Text>
                    <TextInput
                        placeholder={date}
                        placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                        style={styles.input}
                        textAlign = 'center'
                    />
                </View>
            </Pressable>

            {/* Time picker*/}
            <View style={{flexDirection: 'row', paddingTop: 10, justifyContent: 'center'}}>
                <Pressable onPress={showTimePicker1}>
                    <View pointerEvents='none' style={{paddingRight: 10}}>
                        <Text style={{paddingBottom: 10, fontWeight: 'bold', fontSize: 12, color: '#707070'}}>From</Text>
                        <TextInput
                            placeholder={timeFrom}
                            placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                            style={styling.textInput}
                            textAlign = 'center'
                        />
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible1}
                            mode="time"
                            onConfirm={handleTimeFrom}
                            onCancel={hideTimePicker1}
                            isDarkModeEnabled={true}
                            locale='sv_SE'
                        />
                    </View>
                </Pressable>
                <Pressable onPress={showTimePicker2}>
                    <View pointerEvents='none'>
                        <Text style={{paddingBottom: 10, fontWeight: 'bold', fontSize: 12, color: '#707070'}}>To</Text>
                        <TextInput
                            placeholder={timeTo}
                            placeholderTextColor={'rgba(0, 0, 0, 0.5)'}
                            style={styling.textInput}
                            textAlign = 'center'
                        />
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible2}
                            mode="time"
                            onConfirm={handleTimeTo}
                            onCancel={hideTimePicker2}
                            isDarkModeEnabled={true}
                            locale='sv_SE'
                        />
                    </View>
                </Pressable>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
                isDarkModeEnabled={true}
                locale='sv_SE'
            />
            <View paddingTop = {30}>
                <MainButton title="Create tournament" onPress={createTrnmnt}/>
            </View>
        </View>
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
    colorDisabled: {
        color: 'grey',
    },
    colorYellow: {
        color: 'rgb(252, 228, 149)',
    },
    colorLightGrey: {
        color: '#d3d3d3',
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
