import React, {useEffect, useState, useLayoutEffect} from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainFormInput from '../../components/MainFormInput';
import MainButton from '../../components/MainButton';
import BackButton from '../../components/BackButton';
import {styles} from '../styling/Styles';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {db} from '../../modules/firebase/firebase';
import {getUser} from '../../models/User';
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
    const [showModal, setModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const {id, result, user_edit, mode, participants} = route.params;
    const {currentUser} = useAuth();

    console.log(route.params);

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
                break;
            case 'Defeat':
                setTeam2('Victory');
                break;
            case 'Draw':
                setTeam2('Draw');
                break;
            default:
                break;
        }
        setModal(false)
    }

    // sets the result in firebase
    const setResult = () => {
        if(team1 == '' || team2 == ''){
            setErrorMsg('Please select the score!');
            return;
        }

        // if nobody has declared the outcome of the match or if the first person wants to edit
        if(result == 'No result yet' || user_edit == currentUser.uid){
            db.collection('matches').doc(id).update({result: team1 + ' - Awaiting confirmation from the other team/person'});
            db.collection('matches').doc(id).update({user_edit: currentUser.uid});
        } // ändra sedan så att inte två från samma lag confirmar varandras...
        else if(result != 'No result yet' || user_edit != currentUser.uid){
            /* sätt in så att:
                resultatet som finns i databasen och som personer skriver in är samma
                beräkna ranken
                efter att allt är confirmed visa hur mycket hen gick upp eller ner
            */
            if(checkScore){

                // let personer = 
                let value = elo_calc();
                console.log(value);
            }
        }else{
            alert('Oops, something wrong occured!');    
        }
        setModal(false);
        navigation.navigate('Your Matches');
    }

    const checkScore = () =>{
        let string = ' - Awaiting confirmation from the other team/person';
        switch(result){
            case 'Defeat' + string:
                if(team1 == 'Victory'){
                    return true;
                }
                break;
            case 'Victory' + string:
                if(team1 == 'Defeat'){
                    return true;
                }
                break;
            case 'Draw' + string:
                if(team1 == 'Draw'){
                    return true;
                }
                break;
            default:
                return false;
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
                    <Text style={{padding: 10}}>Your score: {team1}</Text>
                    <Text>Opponenet's score: {team2}</Text>
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