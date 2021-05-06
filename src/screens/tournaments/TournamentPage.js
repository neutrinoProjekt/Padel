import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Bracket, RoundProps, Seed, SeedItem, SeedTeam,
    RenderSeedProps, SeedTime} from 'react-brackets';
import {FlatList} from 'react-native-gesture-handler';
import {ListItem} from 'react-native-elements';
const RenderSeed = ({breakpoint, seed}: RenderSeedProps) => {
    return (
        <Seed mobileBreakpoint={breakpoint} style={{width: '80%', fontSize: 20,
            alignItems: 'center'}}>
            <SeedItem style={{textAlign: 'center', width: '50%', backgroundColor: '#F7F7F7'}}>
                <View>
                    <SeedTeam style={{textAlign: 'center',
                        fontSize: 20, height: 50, color: '#00CEB4',
                        backgroundColor: 'white'}}
                    >{seed.teams?.[0].name +'  '+ seed.teams?.[0].score||
                     'No Team'}</SeedTeam>
                    <View style={{height: 2, backgroundColor: '#707070'}}>
                    </View>
                    <SeedTeam style={{
                        fontSize: 20, height: 50, color: '#00CEB4',
                        backgroundColor: 'white'}}
                    >{seed.teams?.[1].name || 'No Team'}</SeedTeam>
                </View>
            </SeedItem>
            <SeedTime mobileBreakpoint={breakpoint} style={{fontSize: 10}}>
                {seed.date}
            </SeedTime>
        </Seed>
    );
};


const TournamentPage = () => {
    const DATA = [
        {
            title: 'Round 1',
            seeds: [
                {
                    id: 1,
                    date: new Date().toDateString(),
                    teams: [
                        {id: 1, name: 'Team 0', score: 2},
                        {id: 3, name: 'Team 1', score: 4},
                    ],
                },
                {
                    id: 2,
                    date: new Date().toDateString(),
                    teams: [
                        {id: 1, name: 'Team 2', score: 2},
                        {id: 3, name: 'Team 3', score: 4},
                    ],
                },
                {

                    id: 3,
                    date: new Date().toDateString(),
                    teams: [
                        {id: 1, name: 'Team 4', score: 2},
                        {id: 3, name: 'Team 5', score: 4},
                    ],
                },
                {
                    id: 4,
                    date: new Date().toDateString(),
                    teams: [
                        {id: 1, name: 'Obama', score: 2},
                        {id: 3, name: 'Kungen', score: 6},
                    ],
                },
            ],
        },
        {
            title: 'Round 2',
            seeds: [...new Array(2)].fill({
                id: 1,
                date: new Date().toDateString(),
                teams: [
                    {id: 1, name: 'CDATA', score: 2},
                    {id: 3, name: 'NEUTRINO', score: 6},
                ],
            }),
        },
        {
            title: 'Finals Baby',
            seeds: [...new Array(1)].fill({
                id: 1,
                date: new Date().toDateString(),
                teams: [
                    {id: 1, name: 'NEUTRINO', score: 2},
                    {id: 3, name: 'CINTE', score: 6},
                ],
            }),
        },
    ];


    return (
        <SafeAreaView>
            <ScrollView nestedScrollEnabled={true}>
                <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
                <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
                <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
                <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
                <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
                <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
                <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
                <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
                <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>

                <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>
                <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>            <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>            <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>            <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>            <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>            <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>            <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>            <ScrollView>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>            <ScrollView nestedScrollEnabled={true}>
                    <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
                    </Text>
                </ScrollView>


                <ScrollView>
                    <View
                        style={{
                            alignItems: 'center',
                            borderBottomWidth: 1,
                            borderColor: '#707070',
                            backgroundColor: '#f7f7f7'}}>
                        <Bracket rounds={DATA} renderSeedComponent={RenderSeed}/>
                    </View>
                </ScrollView>
            </ScrollView>

        </SafeAreaView>


    );
};

export default TournamentPage;
