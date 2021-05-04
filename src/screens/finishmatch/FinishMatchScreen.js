import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CardHeader from '../../components/CardHeader';
import MainFormInput from '../../components/MainFormInput';
import MainButton from '../../components/MainButton';
import {styles} from '../styling/Styles';

//FRONT-END:
// header (DONE)
// 4 textinputs for me and the oponents (3 pers)
// Save button (DONE)

//BACK-END


const FinishMatchScreen = ({navigation}) => {

    // states for my and player2 results
    const [myresults, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [player3, setPlayer3] = useState('');
    const [player4, setPlayer4] = useState('');

    return (
    <SafeAreaProvider>

        {/** Header */}
        <CardHeader
         centerHeader='Match Results'
         leftComponent={
            <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#707070'}}>Cancel</Text>
                        </TouchableOpacity>
            }/>

        <View  style={styles.container}>
            {/** 4 inputs to register results: my results and the oponent's */}
            <MainFormInput 
                inputWidth = {'30%'} 
                inputTitle = {'Player 1 (me)'}
                placeholder = {'00'}
                input = {myresults}
                setInput = {(text) => setPlayer1(text)}
                />
            <MainFormInput 
                inputWidth = {'30%'} 
                inputTitle = {'Player 2 (username here)'}
                placeholder = {'00'}
                input = {player2}
                setInput = {(text) => setPlayer2(text)}/>
                
             <MainFormInput 
                inputWidth = {'30%'} 
                inputTitle = {'Player 3 (username here)'}
                placeholder = {'00'}
                input = {player3}
                setInput = {(text) => setPlayer3(text)}/>
            <MainFormInput 
                inputWidth = {'30%'} 
                inputTitle = {'Player 4 (username here)'}
                placeholder = {'00'}
                input = {player4}
                setInput = {(text) => setPlayer4(text)}/>

            <View styles={{margin: 10}}>
              {/* Button to save the results*/}
            <MainButton title='Save' onPress={() => alert('hi bish')}/> 
            </View>  
        </View>
    </SafeAreaProvider>
    );
};

export default FinishMatchScreen;