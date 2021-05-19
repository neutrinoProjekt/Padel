import React, {useLayoutEffect, useState} from 'react';
import {
    StyleSheet, View,
    Text, ScrollView,
} from 'react-native';
import MainButton from './../../components/MainButton';
import {joinMatch} from '../../models/Match';
import {useAuth} from '../../contexts/auth';
import {Ionicons, EvilIcons} from '@expo/vector-icons';
import TeamSelector from '../../components/TeamSelector';

const MatchDetailsScreen = ({route, navigation}) => {
    const {currentUser} = useAuth();

    const {isParticipant, participants, location, date, id, result, user_edit, mode, isResult} = route.params;

    const [teamParticipants, setTeamParticipants] = useState([participants.map(participant => ({...participant, team: 0})), [], []]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Match Details',
        });
    }, [navigation]);

    const buttonsretur = () => {
        if(isParticipant && !isResult){
            return(
                <View style={{alignSelf: 'center', marginTop: 10}}>
                        <MainButton
                            title='Finish Match'
                            onPress={async () => {
                                if (teamParticipants[0].length == 0 && !isResult) {
                                    if(mode == 'Single' || (mode == 'Double' && teamParticipants[1].length != 2)){
                                        teamParticipants[1] = teamParticipants[1].concat(["rating: 0"]);
                                    }
                                    let orderedParticipants = teamParticipants[1].concat(teamParticipants[2]);
                                    navigation.navigate('FinishMatchScreen', {id, result, user_edit, mode, participants: orderedParticipants });
                                }
                            }}
                        />
                    </View>
            );
        }else if((mode == 'Single' && participants.length < 2 || mode == 'Double' && participants.length < 4) && !isResult) {
            return(
                <View style={{alignSelf: 'center', paddingTop: 10}}>
                    <MainButton
                        title='Join Match'
                        onPress={async () => {
                            await joinMatch(id, currentUser.uid);
                            navigation.goBack();
                        }}
                    />
                </View>
            );
        }else{
            return(<View></View>);
        }
    }

    return (
        <View>
            <ScrollView style={styles2.scrollContainer}>
                <View style={{paddingTop: 20, width: 305, flexDirection: 'column', height: 140, alignContent: 'center', justifyContent: 'space-around'}}>
                    <View style={styles2.rowContainer}>
                        <View marginLeft={-1}>
                            <Ionicons
                                size={22}
                                name='location-outline'
                                color='#707070'
                            />
                        </View>
                        <Text style={styles2.subheader1}>
                            {location}
                        </Text>
                    </View>

                    <View style={styles2.rowContainer}>
                        <View marginLeft={-1}>
                            <Ionicons
                                size={15}
                                name='time-outline'
                                color='#707070'
                            />
                        </View>
                        <Text style={styles2.subheader1}>
                            {date}
                        </Text>
                    </View>

                    <View style={styles2.rowContainer}>
                        <View marginLeft={-1}>
                            <EvilIcons 
                            name="check" 
                            size={20} 
                            color="black" />
                        </View>
                        <Text style={styles2.subheader1}>
                            {result}
                        </Text>
                    </View>
                </View>

                <TeamSelector teamParticipants={teamParticipants} setTeamParticipants={setTeamParticipants} mode={mode}/>

                { buttonsretur() }
            </ScrollView>
        </View>
    );
};

export default MatchDetailsScreen;

const styles2 = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    scrollContainer: {
        backgroundColor: 'white',
        height: '100%',
    },
    rowContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 250,
        paddingLeft: 20,
    },
    header: {
        backgroundColor: 'white',
        height: 70,
        fontWeight: '800',
    },
    actionButtonContainer: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute',
        bottom: 70,
    },
    formTitle: {
        paddingBottom: 10,
        fontWeight: 'bold',
        color: '#707070',
        fontSize: 20,
        alignSelf: 'center',
        paddingTop: 20,
    },
    subheader1: {
        paddingLeft: 10,
        color: '#707070',
        fontSize: 16,
        flex: 1,
    },

});
