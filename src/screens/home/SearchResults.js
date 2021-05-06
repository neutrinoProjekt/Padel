import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MatchListItem from '../../components/MatchListItem';

const SearchResults = ({navigation, route}) => {
    const { matchData } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Search Results',
            headerBackTitle: 'Find Matches',
        });
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    matchData.map((match) => (
                        <MatchListItem
                            key={match.id}
                            matchData={match}
                            owner={match.owner}
                            participants={match.participants}
                            navigation={navigation}
                        />
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    );
};

export default SearchResults;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        alignItems: 'center',
    },
    scrollContainer: {
        backgroundColor: 'white',
        height: '100%',
    },
});
