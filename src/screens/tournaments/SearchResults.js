import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ExpandableItem from '../../components/ExpandableItem';

const SearchResults = ({navigation, route}) => {
    const { tournamentData } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Search Results',
            headerBackTitle: 'Find Tournaments',
        });
    }, [navigation]);

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {
                    tournamentData.map((tournament) => (
                        <ExpandableItem
                            key={tournament.id}
                            t1={tournament.name}
                            t2={'Tournament'}
                            t3={`Min rank: ${tournament.minRank}\nMax rank: ${tournament.maxRank}`}
                            imgSource={tournament.owner.photoURL}
                            date={tournament.date}
                            location={tournament.location}
                            participants={tournament.participants}
                            matchData={tournament}
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
