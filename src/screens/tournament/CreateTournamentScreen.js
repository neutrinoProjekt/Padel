import React, {useState} from 'react';
import {Image, Text, View, StyleSheet, TextInput} from 'react-native';
import {Avatar} from 'react-native-elements/dist/avatar/Avatar';
import {styles} from '../styling/Styles';
import {Slider} from 'react-native-elements/dist/slider/Slider';
import MainButton from '../../components/MainButton';

const CreateTournamentScreen = () => {
    const imageUrl = {uri: 'https://image.freepik.com/free-photo/golden-trophy-cup-white-background-with-clipping-path_35913-551.jpg'};

    const [rank1, setRank1] = useState(10); // used for Minimum rank slider
    const [rank2, setRank2] = useState(10); // used for Maximum rank slider
    const [players, setPlayers] = useState(1);
    const [rankColor, setRankColor] = useState(styling.colorYellow);

    const minPlayers = 1;
    const maxPlayers = 10;
    const minRank = 10;
    const maxRank = 100;
    const step = maxRank % 9;

    // Check whether entered rank interval is valid
    const validRankInterval = () => {
        return rank1 <= rank2;
    };

    // Set rank slider color
    const setRankSliderColor = () => {
        if (rank1 <= rank2) {
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
                <View>
                    <Text style={{alignSelf: 'center'}}>Minimum rank</Text>
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
                    thumbTintColor='rgb(252, 228, 149)'
                    maximumTrackTintColor= '#d3d3d3'
                    minimumTrackTintColor={rankColor}
                />
                <View style={styling.textCon}>
                    <Text style={styling.colorGrey}>{minRank}</Text>
                    <Text style={styling.colorYellow}>
                        {rank1}
                    </Text>
                    <Text style={styling.colorGrey}>{maxRank}</Text>
                </View>
            </View>

            {/* Maximum Rank Slider */}
            <View style={{paddingTop: 10}}>
                <View>
                    <Text style={{alignSelf: 'center'}}>Maximum rank</Text>
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
                    thumbTintColor='rgb(252, 228, 149)'
                    maximumTrackTintColor='#d3d3d3'
                    minimumTrackTintColor='rgb(252, 228, 149)'
                />
                <View style={styling.textCon}>
                    <Text style={styling.colorGrey}>{minRank}</Text>
                    <Text style={styling.colorYellow}>
                        {rank2}
                    </Text>
                    <Text style={styling.colorGrey}>{maxRank}</Text>
                </View>
            </View>

            {/* Minimum Players Slider */}
            <View style={{paddingTop: 10}}>
                <View>
                    <Text style={{alignSelf: 'center'}}>Minimum players</Text>
                </View>
                <Slider
                    style={{width: 300}}
                    step={1}
                    minimumValue={minPlayers}
                    maximumValue={maxPlayers}
                    value={players}
                    onValueChange={(val) => setPlayers(val)}
                    thumbTintColor='rgb(252, 228, 149)'
                    maximumTrackTintColor='#d3d3d3'
                    minimumTrackTintColor='rgb(252, 228, 149)'
                />
                <View style={styling.textCon}>
                    <Text style={styling.colorGrey}>{minPlayers}</Text>
                    <Text style={styling.colorYellow}>
                        {players}
                    </Text>
                    <Text style={styling.colorGrey}>{maxPlayers}</Text>
                </View>
            </View>
            {/* Date picker*/}
            <View>

            </View>

            {/* Additional information*/}
            <View>
                <TextInput
                    placeholder = "Additional information"
                />
            </View>
            <View paddingTop = {20}>
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
    colorGrey: {
        color: 'grey',
    },
    colorYellow: {
        color: 'rgb(252, 228, 149)',
    },
});
