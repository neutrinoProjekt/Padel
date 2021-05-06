import React, {useState, useLayoutEffect} from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MainFormInput from '../../components/MainFormInput';
import MainButton from '../../components/MainButton';
import {styles} from '../styling/Styles';
import { TouchableHighlight } from 'react-native-gesture-handler';

// FRONT-END:
// header (DONE)
// 4 textinputs for me and the oponents (3 pers)
// Save button (DONE)

// BACK-END


const FinishMatchScreen = ({navigation}) => {
    // states for my and player2 results
    const [team1, setTeam1] = useState('');
    const [team2, setTeam2] = useState('');
    const [showModal, setModal] = useState(false);


    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Finish Match', // header title
            headerTitleAlign: 'center',
            headerTitleStyle: {alignSelf: 'center'},
        })

    }, [navigation])

    const setScore = (props) => {
        setTeam1(props);
        switch(props){
            case 'victory':
                setTeam2('defeat');
                break;
            case 'defeat':
                setTeam2('victory');
                break;
            case 'draw':
                setTeam2('draw');
                break;
            default:
                break;
        }
        setModal(false)
    }

    const pickerValue = [
        {
            title: 'Victory',
            value: 'victory'
        },
        {
            title: 'Defeat',
            value: 'defeat'
        },
        {
            title: 'Draw',
            value: 'draw'
        }
    ]

    return (
        <View style={styles.container}>
            <View style={{bottom: 110, alignItems: 'center'}}>
                <Text style={styles.title}>Result</Text>
                <Text style={{paddingTop: 20}}>Please select the outcome of the match</Text>
                <Text style={{padding: 10}}>Team1: {team1}</Text>
                <Text>Team2: {team2}</Text>
                <View style={{paddingTop: 30}}>
                    <MainButton title='select' onPress={() => {setModal(true)}}/>
                </View>
                <View style={{paddingTop: 20}}>
                    <MainButton title='save' onPress={() => alert(team1)}/>
                </View>
            </View>
            <Modal visible={showModal} animationType={"slide"} transparent={true} onRequestClose={() => {setModal(false)}}>
                <View style={{
                    margin: 20, 
                    padding: 20,
                    backgroundColor: '#cccaca',
                    bottom: 90,
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
    );
};

export default FinishMatchScreen;