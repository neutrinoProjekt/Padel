import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ExpandableItem from '../../components/ExpandableItem';

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
                        <ExpandableItem
                            key={match.id}
                            t1={match.owner.fullname}
                            t2={'Match'}
                            imgSource={match.owner.photoURL}
                            date={match.date}
                            location={match.location}
                            participants={match.participants}
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
