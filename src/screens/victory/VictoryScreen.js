/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React from 'react';
import {Text, View, Image, ImageBackground} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FlatList} from 'react-native-gesture-handler';
import {ProgressBar} from 'react-native-paper';
import {Ionicons} from '@expo/vector-icons';

// --fire base--
// make it possible to fetch tournament resaults from fire base

// --other--
// top doesn't scroll
// work style
// improve view1
// implement progress circkles

// info should come from firestore
// placeholder
const TOURNAMENTRESULTS = {
    titel: 'Bengts söndags turnering',
    results: 'shared fifth',
    place: 'Södertälje padelhall, Stockholm',
    time: '2011-04-04 till 2021-04-04',
    totalmatches: 10,
    playerwins: 8,
    history:
        [
            {
                id: '23',
                person1: {
                    name: 'Anna',
                    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/EVER_GIVEN_%2849643352087%29.jpg/1920px-EVER_GIVEN_%2849643352087%29.jpg',
                },
                person2: {
                    name: 'August',
                    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Crafoord_Prize_D81_9141_%2842282165922%29_%28cropped%29.jpg/800px-Crafoord_Prize_D81_9141_%2842282165922%29_%28cropped%29.jpg',
                },
                placment: 'second',
                wins: 8,
            },
            {
                id: '23',
                person1: {
                    name: 'Lukas',
                    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/EVER_GIVEN_%2849643352087%29.jpg/1920px-EVER_GIVEN_%2849643352087%29.jpg',
                },
                person2: {
                    name: 'Vide',
                    picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Crafoord_Prize_D81_9141_%2842282165922%29_%28cropped%29.jpg/800px-Crafoord_Prize_D81_9141_%2842282165922%29_%28cropped%29.jpg',
                },
                placment: 'shared fith',
                wins: 2,
            },
        ],
};

// makes similar view for every item, f.ex. notifications
// render each teams final position in the tournament
const RenderPlacment = ({item}) => (
    <View
        style={{
            borderBottomWidth: 1,
            borderColor: '#707070', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', margin: 10}}>
            <Image
                style={{height: 60, width: 60, borderRadius: 30}}
                source = {{uri: item.person1.picture}}
            />
            <Image
                style={{
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    marginLeft: -20,
                    marginTop: 20,
                }}
                source = {{uri: item.person2.picture}}
            />
        </View>
        <Text style={{
            alignSelf: 'center',
            color: '#707070'}}>
            {item.person1.name} and {item.person2.name} came
             on {item.placment} place with a total of {item.wins} wins!
        </Text>
    </View>
);

const VictoryScreen = () => {
    const winrate=TOURNAMENTRESULTS.playerwins/TOURNAMENTRESULTS.totalmatches;

    return (
        <SafeAreaProvider>
            {/* Placeholder, firebaseissue: get the information about
            the last match
            (name, place, time, participants*/}
            <View style={{
                borderBottomWidth: 1,
                borderColor: '#707070',
                backgroundColor: '#00ceb4',
                alignItems: 'center'}}>
                <View style={{padding: 100}}>
                    <Text style={{
                        fontWeight: 'bold',
                        fontSize: 40, color: '#000',
                        textAlign: 'center'}}>
                            You came {TOURNAMENTRESULTS.results}, well done!
                    </Text>
                </View>
            </View>
            <View
                style={{
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    borderColor: '#707070',
                    backgroundColor: '#f7f7f7'}}>
                <Text
                    style={{
                        fontWeight: 'bold',
                        fontSize: 18, margin: 5,
                        color: '#707070',
                    }}
                >
                    {TOURNAMENTRESULTS.titel}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1, alignItems: 'center'}}>
                    <View>
                        <Ionicons
                            name='location-outline'
                            color='#707070' size='15'
                            style={{margin: 5, height: 15}}
                        />
                        <Ionicons
                            name='time-outline'
                            color='#707070'
                            size= '15'
                            style={{margin: 5, height: 15}}
                        />
                    </View>
                    <View>
                        <Text style={{
                            margin: 5,
                            height: 15,
                            color: '#707070',
                        }}>
                            {TOURNAMENTRESULTS.place}
                        </Text>
                        <Text style={{
                            margin: 5,
                            height: 15,
                            color: '#707070'}}>
                            {TOURNAMENTRESULTS.time}
                        </Text>
                    </View>
                </View>
                <View style={{alignSelf: 'center', margin: 10, width: '60%'}}>
                    <Text
                        style={{
                            position: 'absolute',
                            alignSelf: 'center',
                            color: '#707070'}}
                    >
                        You won {TOURNAMENTRESULTS.playerwins}/
                        {TOURNAMENTRESULTS.totalmatches} matches
                    </Text>
                    <ProgressBar style={{
                        height: 20,
                        borderColor: '#707070',
                        borderRadius: 10,
                        borderWidth: 2,
                        position: 'relative',
                        opacity: 0.6}}
                    progress={winrate}
                    color={'#00ceb4'}/>
                </View>
            </View>
            <View>
                {/* shows only specific match but you're also able to scroll*/}
                <FlatList
                    data={TOURNAMENTRESULTS.history}
                    renderItem={RenderPlacment}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </SafeAreaProvider>
    );
};

export default VictoryScreen;
