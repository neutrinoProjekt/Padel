import React from 'react';
import {Bracket, Seed, SeedItem, SeedTeam, SeedTime, RoundProps, RenderSeedProps} from 'react-brackets';
import styled from 'styled-components/native';

const rounds = [
    {
        title: 'Round 11',
        seeds: [
            {
                id: 1,
                date: new Date().toDateString(),
                teams: [
                    {id: 1, name: 'The Leons', score: 2},
                    { id: 3, name: 'Kitties', score: 6 },
                ],
            },
            {
                id: 1,
                date: new Date().toDateString(),
                teams: [
                    {id: 1, name: 'The Leons', score: 2},
                    { id: 3, name: 'Kitties', score: 6 },
                ],
            },
            {},
            {
                id: 1,
                date: new Date().toDateString(),
                teams: [
                    {id: 1, name: 'The Leons', score: 2},
                    { id: 3, name: 'Kitties', score: 6 },
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
                {id: 1, name: 'The Leons', score: 2},
                {id: 3, name: 'Kitties', score: 6},
            ],
        }),
    },
    {
        title: 'Round 3',
        seeds: [...new Array(1)].fill({
            id: 1,
            date: new Date().toDateString(),
            teams: [
                {id: 1, name: 'The Leons', score: 2},
                {id: 3, name: 'Kitties', score: 6},
            ],
        }),
    },
];

const RenderSeed = ({seed}) => {
    return (
        <Seed >
            <SeedItem >
                <div>
                    <SeedTeam>{seed.teams?.[0].name || '-----------'}</SeedTeam>
                    <div style={{height: 1, backgroundColor: '#707070'}}></div>
                    <SeedTeam>{seed.teams?.[1]?.name || 'wow'}</SeedTeam>
                </div>
            </SeedItem>
            <SeedTime >
                {seed.date}
            </SeedTime>
        </Seed>
    );
};

const TournamentPage = () => {
    return (
        <Bracket
            mobileBreakpoint={992}
            rounds={rounds}
            renderSeedComponent={RenderSeed}
        />
    );
};

export default TournamentPage;
