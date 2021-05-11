import React from 'react';
import {ScrollView, View} from 'react-native';
import {Bracket, RoundProps, Seed, SeedItem, SeedTeam,
    RenderSeedProps, SeedTime} from 'react-brackets';


const RenderSeed = ({breakpoint, seed}: RenderSeedProps) => {
    return (
        <Seed mobileBreakpoint={breakpoint} style={{
            backgroundColor: '#red'}}>
            <SeedItem style={{textAlignments: 'center', width: '80%',
                backgroundColor: 'white', borderRadius: 15,
                alignItems: 'center',

            }}>
                <View>
                    <SeedTeam style={{borderRadius: 15, textAlignments: 'center',
                        fontSize: 20, height: 30, color: '#00CEB4',
                        backgroundColor: 'transparent', width: '50%'}}
                    >{seed.teams?.[0].name +'  '+ seed.teams?.[0].score||
                     'No Team'}
                        {seed.teams?.[0].score}</SeedTeam>
                    <View style={{height: 10, backgroundColor: '#707070'}}>
                    </View>
                    <SeedTeam style={{borderRadius: 15,
                        textAlignments: 'center',
                        fontSize: 20, height: 30, color: '#00CEB4',
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
                {
                    id: 5,
                    date: new Date().toDateString(),
                    teams: [
                        {id: 1, name: 'dasdma', score: 2},
                        {id: 3, name: 'fafen', score: 6},
                    ],
                },
            ],
        },
        {
            title: 'Round 2',
            seeds: [
                {
                    id: 1,
                    date: new Date().toDateString(),
                    teams: [
                        {id: 1, name: 'CDATA', score: 2},
                        {id: 3, name: 'NEUTRINO', score: 6},
                    ],
                },
                {
                    id: 2,
                    date: new Date().toDateString(),
                    teams: [
                        {id: 1, name: 'OPEN', score: 2},
                        {id: 3, name: 'NEUTRINO', score: 6},
                    ],
                },
            ],
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
        <>
            <ScrollView> {/* <ScrollView> nestedScrollEnabled={true}> */}
                <Bracket
                    rounds={DATA}
                    renderSeedComponent={RenderSeed} />
            </ScrollView>
        </>


    );
};

export default TournamentPage;
