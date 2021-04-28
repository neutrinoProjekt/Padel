/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TextInput, KeyboardAvoidingView} from 'react-native';
import {Switch} from 'react-native-switch';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {styles} from '../styling/Styles';
import {Slider} from 'react-native-elements/dist/slider/Slider';
import MainButton from '../../components/MainButton';
import {LogBox} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DynamicButton from '../../components/DynamicButton';


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

    const handleConfirm = (datetime) => {
        console.log('A date has been picked: ', datetime);
        hideDatePicker();
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
                        <Text>Minimum rank</Text>
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
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 40}}>
                <DynamicButton title="Pick date" onPress={showDatePicker} textStyle={{fontWeight: 'bold'}} boxColor={styles.colorYellow}/>
                <DynamicButton title="Pick date" onPress={showDatePicker} textStyle={{fontWeight: 'bold'}} boxColor={styles.colorYellow}/>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="datetime"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    isDarkModeEnabled={true}
                    locale='sv_SE'
                />
            </View>
            {/* Additional information*/}
            <View style={{paddingTop: 40}}>
                <TextInput
                    placeholder = "Additional information"
                />
            </View>
            <View paddingTop = {100}>
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
        fontWeight: 'bold',
    },
    colorLightGrey: {
        color: '#d3d3d3',
    },
});
