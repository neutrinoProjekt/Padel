/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../contexts/auth';
import {SafeAreaView, StyleSheet, TouchableOpacity, View, Text}
    from 'react-native';
import {Divider, ListItem,Avatar, Header, Image} from 'react-native-elements';
import {startTournament, newRounds, joinTournament, reportResaults} from '../../models/Tournament.js';
import MatchListItem from '../../components/MatchListItem'
import DynamicButton from '../../components/DynamicButton';
import {getUserReference} from '../../models/User';
import {findMatch} from '../../Algorithms/TreeMaking';


/* 
    funktioner
raportera resultat

    join
    börja
    starta nya matcher

    saker som vi vill visa
show tournament tree
error message
namn, datum stad
spelares 
    ranking
    namn
    profilbild
partisipant list
*/

const PlayersList = (props) => {
    return (
        <>
            <View style={{flexDirection: 'row', padding: 12 }}>
                <Avatar
                    rounded
                    size="small"
                    source={props.img}
                    activeOpacity={0.7} />
                <Text style={{ alignSelf: 'center', padding: 5 }}>{props.player}</Text>
                <Text style={{ alignSelf: 'center' }}>Rank: {props.rank}</Text>
                <Divider />
            </View>
            <Divider style={{ height: 1 }} />
        </>

    );
};


const TournamentDetailView = ({navigation, route}) => {
    const tournamentData = route.params;
    //console.log(tournamentData)
    const {currentUser} = useAuth();
    const [errorMessage, setErrorMessage] = useState();
    
    let testData = [{p1: 'August', p2: 'Shaff', r1: 2020, r2: 2030}, {p1: 'August', p2: 'Shaff', r1: 2020, r2: 2030}, {p1: 'August', p2: 'Shaff', r1: 2020, r2: 2030}]
    let testtest = [{p: 'August', p2: 'Shaff', r1: 2020, r2: 2030}, {p1: 'August', p: 'Shaff', r1: 2020, r2: 2030}, {p: 'August', p2: 'Shaff', r1: 2020, r2: 2030}]
    const image = {uri: 'https://images.interactives.dk/einstein_shutterstock-qbUmtZmY5FII0w3giBzzOw.jpg?auto=compress&ch=Width%2CDPR&dpr=2.63&h=480&ixjsv=2.2.4&q=38&rect=33%2C0%2C563%2C390'};


    //console.log(tournamentData.participants);
    console.log((tournamentData.id));

    //console.log(findMatch(tournamentData.id, currentUser.getUserReference));
    return (
        <View>
            <View style={{alignItems:'center', margin: 20}}>
                <Image source={{uri: tournamentData.owner.photoURL}} style={{height: 80, width: 80, borderRadius: 40}}/>
                <Text style={{fontSize: 24, fontWeight: 'bold', margin: 10}}>{tournamentData.name}</Text>
                <Text>The most exciting tournament in all of {tournamentData.city}!</Text>
            </View>
            <Divider/>
            {/*(tournamentData.isStarted) ?
                //tournamentData.isStarted ?
                tournamentData.matchlist.map((match) => (
                    <MatchListItem p1={match.p1} p2={match.p2}/>
                )): null
                //: <Text>Tournament not started</Text>
            }

            {tournamentData.participants.map((pla) => (
                <PlayersList player = {pla.fullname} img = {image} />
            ))*/}


            {/* lite info om tournament som vilka spelare som är med, startdatum etc*/}

            {/*Vi vill ha olika komponeneter beroande på om matchen är startad eller inte*/}

            {/*information om deltagarna i turneringen
             && !(tournamentData.isStarted)
            */}
            <View style={{alignItems:'center'}}>
                <Text style={{color: '#f22'}}>{errorMessage}</Text>
                {(!tournamentData.isStarted) ?//&& (tournamentData.ownerId == currentUser.uid) ?//((tournamentData.owner.displayName == currentUser.displayName)) ?
                    <DynamicButton 
                        title='Start Tournament' 
                        onPress={() => startTournament(tournamentData.id, setErrorMessage)} 
                        textStyle={{fontSize: 16, color: 'white'}} 
                        boxColor='#00CEB4'/> : null
                }

                {(tournamentData.roundDone) && (tournamentData.ownerId == currentUser.uid) ?
                    <DynamicButton 
                        title='New Round' 
                        onPress={() => newRounds(tournamentData.id, setErrorMessage)} 
                        textStyle={{fontSize: 16, color: 'white'}} 
                        boxColor='#cf4242'/> : null
                }
                {(!tournamentData.isStarted) && (!tournamentData.participants.includes(currentUser.getUserReference)) ?
                    <DynamicButton 
                        title='Join tournament' 
                        onPress={() => joinTournament(tournamentData.id, currentUser.uid)} 
                        textStyle={{fontSize: 16, color: 'white'}} 
                        boxColor='#cf4242'/> : null
                }
                {!findMatch(tournamentData.id, currentUser.getUserReference).isDone ?//((tournamentData.isStarted) && !(tournamentData.participants.isDone)&& !(tournamentData.participants.roundDone)) ?
                    <DynamicButton 
                        title='Claim victory!' 
                        onPress={() => reportResaults(tournamentData.id, currentUser.getUserReference, currentUser.getUserReference)} 
                        textStyle={{fontSize: 16, color: 'white'}} 
                        boxColor='#cf4242'/> : null
                }
            </View>


        </View>
    );
};

export default TournamentDetailView;


const styles = StyleSheet.create({
    subTitle1: {
        paddingLeft: 2,
        color: '#707070',
        fontWeight: '700',
        fontSize: 10,
    },
    subTitle2: {
        paddingBottom: 5,
        padding: 2,
        color: '#00CEB4',
        fontWeight: '700',
        fontSize: 10,
    },
    listItemOne: {
        flex: 1,
        height: 70,
        backgroundColor: '#F7F7F7',
    },
});