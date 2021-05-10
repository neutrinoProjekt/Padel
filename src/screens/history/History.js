import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {getMatchHistory} from '../../models/Match';
import {useAuth} from '../../contexts/auth';
import ExpandableItem from '../../components/ExpandableItem';

export default function History({navigation}) {
    const [matchData, setMatchData] = useState([]);
    const {currentUser} = useAuth();

    useEffect(() => {
        getMatchHistory(currentUser.uid).then(setMatchData);
    }, []);

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    matchData.map((match) => (
                        <ExpandableItem
                            key={match.id}
                            t1={match.owner.fullname}
                            t2={'Match'}
                            t3={`Min rank: ${match.minRank}\nMax rank: ${match.maxRank}`}
                            imgSource={match.owner.photoURL}
                            date={match.date}
                            location={match.location}
                            participants={match.participants}
                            matchData={match}
                            navigation={navigation}
                        />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
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