import React, {useEffect, useState, useLayoutEffect} from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainFormInput from '../../components/MainFormInput';
import MainButton from '../../components/MainButton';
import BackButton from '../../components/BackButton';
import {styles} from '../styling/Styles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {db} from '../../modules/firebase/firebase';
import {getUser, updateUser} from '../../models/User';
import {useAuth} from '../../contexts/auth';
import {elo_calc} from '../../Algorithms/RankAlgo';

// FRONT-END:
// header (DONE)
// 4 textinputs for me and the oponents (3 pers)
// Save button (DONE)

// BACK-END


const FinishMatchScreen = ({navigation, route}) => {
    // states for my and player2 results
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [team1Results, setTeam1Results] = useState(0.5);
    const [showModal, setModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const {id, result, mode, participants} = route.params;

    useEffect(() => {
        setErrorMsg('');
    }, [team1, team2]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Finish Match', // header title
            headerTitleAlign: 'center',
            headerTitleStyle: {alignSelf: 'center'},
        })

    }, [navigation])

    // sets the score for the enemy depending on the input from the user
    const setScore = (props) => {
        setTeam1(props);
        switch(props){
            case 'Victory':
                setTeam2('Defeat');
                setTeam1Results(1);
                break;
            case 'Defeat':
                setTeam2('Victory');
                setTeam1Results(0);
                break;
            case 'Draw':
                setTeam2('Draw');
                setTeam1Results(0.5);
                break;
            default:
                break;
        }
        setModal(false)
    }

    // sets the result in firebase
    const setResult = async () => {
        if(team1 == '' || team2 == ''){
            setErrorMsg('Please select the score!');
            return;
        }

        if(result == 'No result yet'){
            db.collection('matches').doc(id).update(writeResult());
            db.collection('matches').doc(id).update({isResult: true});
            let newRatings = elo_calc(participants.map(participant => participant.rating), team1Results, mode);
            await Promise.all(participants.map((participant, index) => updateUser(participant.id, {rating: newRatings[index]})))
        }

        setModal(false);
        navigation.navigate('Your Matches');
    }

    const writeResult = () => {
        if(mode == 'Double' && team1 == 'Victory'){
            return {result: 'Team 1 won' + ' with ' + participants[0].fullname + ' and ' + participants[1].fullname};
        }else if(mode == 'Double' && team1 == 'Defeat'){
            return {result: 'Team 2 won' + ' with ' + participants[2].fullname + ' and ' + participants[3].fullname};
        }else if(mode == 'Single' && team1 == 'Victory'){
            return {result: 'Team 1 won' + ' with ' + participants[0].fullname};
        }else{
            return {result: 'Team 2 won' + ' with ' + participants[2].fullname};
        }
    }

    const pickerValue = [
        {
            title: 'Victory',
            value: 'Victory'
        },
        {
            title: 'Defeat',
            value: 'Defeat'
        },
        {
            title: 'Draw',
            value: 'Draw'
        }
    ]

    return (
        <Modal>
            <View style={styles.container}>
                <View style={{bottom: 110, alignItems: 'center'}}>
                    <Text style={styles.title}>Result</Text>
                    <Text style={{paddingTop: 20}}>Please select the outcome of the match</Text>
                    <Text style={{padding: 10}}>Team 1: {team1}</Text>
                    <Text>Team 2: {team2}</Text>
                    <Text style={[styles.error, {marginBottom: -30}]}>{errorMsg}</Text>
                    <View style={{paddingTop: 30}}>
                        <MainButton title='select' onPress={() => {setModal(true)}}/>
                    </View>
                    <View style={{paddingTop: 20}}>
                        <MainButton title='save' onPress={() => setResult()}/>
                    </View>
                    <View style={{paddingTop: 20}}>
                        <BackButton title='cancel' onPress={() => navigation.navigate('Your Matches')}/>
                    </View>
                </View>
                <Modal visible={showModal} animationType={"slide"} transparent={true} onRequestClose={() => {setModal(false)}}>
                    <View style={{
                        margin: 20, 
                        padding: 20,
                        backgroundColor: '#cccaca',
                        bottom: 50,
                        left: 20,
                        right: 20,
                        alignItems: 'center',
                        position: 'absolute'
                        }}>
                        <Text style={{fontWeight: 'bold', marginBottom: 10}}>How did it go?</Text>
                        {pickerValue.map((value, index) => {
                            return <TouchableOpacity key={index} onPress={() => setScore(value.value)} style={{paddingTop: 4, paddingBottom: 4}}>
                                        <Text>{value.title}</Text>
                                    </TouchableOpacity>
                        })}
                        <TouchableOpacity onPress={() => setModal(false)}>
                            <Text style={{color: '#999', marginTop: 5}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
            
                </Modal>
            </View>
        </Modal>
    );
};

export default FinishMatchScreen;