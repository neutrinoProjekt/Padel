import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, TouchableOpacity, View, Text}
    from 'react-native';
import MatchListItem from '../../components/MatchListItem';
import {Ionicons} from '@expo/vector-icons';
import {ScrollView} from 'react-native-gesture-handler';
import {useAuth} from '../../contexts/auth';
import {subscribeMatch} from '../../models/Match';

const YourMatches = ({navigation}) => {
    const [matchData, setMatchData] = useState([]);

    const {currentUser} = useAuth();

    useEffect(() => {
        const unsubscribe = subscribeMatch(currentUser.uid, setMatchData);
        return () => unsubscribe();
    }, []);

    const addMatch = () => {
        navigation.navigate('Add Match');
    };

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={addMatch}>
                <Text>
                    Press to add match
                </Text>
            </TouchableOpacity>
            <ScrollView style={styles.container}>
                {
                    matchData.map((match) => (
                        <MatchListItem
                            key={match.id}
                            owner={match.owner}
                            participants={match.participants}
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
