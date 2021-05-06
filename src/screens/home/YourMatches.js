import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View}
    from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuth} from '../../contexts/auth';
import {subscribeMatch} from '../../models/Match';
import ExpandableItem from '../../components/ExpandableItem';
import MatchListItem from '../../components/MatchListItem';

const YourMatches = ({navigation}) => {
    const [matchData, setMatchData] = useState([]);
    const {currentUser} = useAuth();

    useEffect(() => {
        const unsubscribe = subscribeMatch(currentUser.uid, setMatchData);
        return () => unsubscribe();
    }, []);

    const addMatch = () => {
        navigation.navigate('AddMatchScreen');
    };
    console.log(matchData);
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
            <View style={styles.actionButtonContainer}>
                <TouchableOpacity
                    style={styles.actionButton}
                    onPress={addMatch}
                >
                    <Ionicons name='add-outline' size={32} color={'#00CEB4'}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default YourMatches;

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
