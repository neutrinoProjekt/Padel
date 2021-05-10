/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View}
    from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useAuth} from '../../contexts/auth';
import {subscribeTournament} from '../../models/Tournament';
import {ScrollView} from 'react-native-gesture-handler';
import ExpandableItem from '../../components/ExpandableItem';


const TournamentsList = ({navigation}) => {
    const [tournamentData, setTournamentData] = useState([]);
    const {currentUser} = useAuth();

    useEffect(() => {
        const unsubscribe = subscribeTournament(currentUser.uid, setTournamentData);
        return () => unsubscribe();
    }, []);

    const addTournament = () => {
        navigation.navigate('AddTournament');
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    tournamentData.map((tournament) => (
                        <ExpandableItem
                            key={tournament.id}
                            t1={tournament.name}
                            t2='Tournament'
                            t3={`Min rank: ${tournament.minRank}\nMax rank: ${tournament.maxRank}`}
                            imgSource={tournament.owner.photoURL}
                            date={tournament.date}
                            location={tournament.location}
                            share={tournament.contactinfo} // share = false or true
                            phonenr={tournament.owner.phoneNumber}
                            participants={null}
                        />
                    ))
                }
            </ScrollView>
            <View style={styles.actionButtonContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => addTournament()} >
                    <Ionicons name='add-outline' size={32} color={'#00CEB4'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default TournamentsList;


const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    nEnd: {
        color: '#707070',
        textAlign: 'center',
        margin: 50,
    },
    columnContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    listItemOne: {
        flex: 1,
        height: 70,
        backgroundColor: '#F7F7F7',
    },
    listItemTwo: {
        flex: 1,
    },
    title: {
        paddingTop: 10,
        paddingLeft: 2,
        color: '#707070',
        fontWeight: '800',
        fontSize: 12,
    },
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
    subTitle3: {
        paddingTop: 5,
        paddingBottom: 5,
        color: '#707070',
        fontWeight: '600',
        fontSize: 12,
    },
    name: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 20,
        color: '#707070',
        fontWeight: '700',
        fontSize: 10,
    },
    ranking: {
        paddingTop: 5,
        paddingBottom: 5,
        color: '#00CEB4',
        fontWeight: '700',
        fontSize: 10,
    },
    actionButtonContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 100,
        shadowRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: {height: 10},
    },
});
