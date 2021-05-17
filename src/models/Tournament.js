/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {db} from '../modules/firebase/firebase';
import {getUserReference, getUser, createUser} from './User';
import firebase from 'firebase/app';
import {createNotification} from './Notification';
import {roundMaking, getRemaining} from '../Algorithms/TreeMaking';

const collectionName = 'tournaments';

const formatDate = (date) => {
    const convDate = new Date(date.seconds * 1000);
    const zeroPadd = (num) => (num < 10 ? '0' + num : num);

    date = `${convDate.getFullYear()}-${zeroPadd(convDate.getMonth() + 1)}-${zeroPadd(convDate.getDate())}`;
    return date;
};

const formatDocData = async (doc) => {
    const data = doc.data();
    data.owner = (await data.owner.get()).data();
    data.id = doc.id;
    data.date = formatDate(data.date);
    data.location = formatLocation(data.city);
    return data;
};

const formatLocation = (city) => (city);


export function subscribeTournament(id, onUpdate, onError) {
    const unsubscribe = db.collection(collectionName)
        .where('owner', '==', getUserReference(id))
        .onSnapshot(async (snapshot) => {
            const tournaments = await Promise.all(snapshot.docs.map(formatDocData));
            onUpdate(tournaments);
        }, onError);
    return unsubscribe;
}

export async function getTournaments(parameters) {
    let tournaments = await db.collection(collectionName);
    if (parameters.city != '') tournaments = await tournaments.where('city', '==', parameters.city);
    if (parameters.date != '') tournaments = await tournaments.where('date', '>=', parameters.from);
    tournaments = await tournaments.get();
    return await Promise.all(tournaments.docs.map(formatDocData));
}

export function createTournament({
    owner = null,
    city = null,
    date = null,
    contactinfo = null,
    minRank = null,
    maxRank = null,
    minPlayers = null,
    name = null,
    matchlist = null,
    isStarted = false,
    isDone = false,
    roundDone = false,
    }) {
    return db.collection(collectionName).add({
        owner: getUserReference(owner),
        ownerId: owner,
        participants: [getUserReference(owner)],
        city,
        date,
        contactinfo,
        minRank,
        maxRank,
        minPlayers,
        name,
        matchlist,
        isStarted,
        isDone,
        roundDone,
        winner: null,
    });
}

export async function getTournament(tournamentId) {
    return db.collection(collectionName).doc(tournamentId).get().then((u) => u.data());
}

export async function joinTournament(tournamentId, playerId) {
    const tournamentInfo = await getTournament(tournamentId);
    const playerInfo = await getUser(playerId);
    createNotification({
        owner: tournamentInfo.owner.id,
        header: playerInfo.displayName + ' has joined your match!',
        description: playerInfo.displayName + ' is now part of your tournament in ' + tournamentInfo.city,
        detailText: null,
        type: 'text',
        typeDetails: {},
    });
    return db.collection(collectionName).doc(tournamentId).update({
        participants: firebase.firestore.FieldValue.arrayUnion(getUserReference(playerId))
    });
}

export async function startTournament(tournamentId, setError) {
    const tournamentData = await getTournament(tournamentId);
    if (tournamentData.participants.length < 2) {
        setError('Not enough participants to start the tournaments');
    }
    else{
        const matches = roundMaking(tournamentData.participants);
        return db.collection(collectionName).doc(tournamentId)
            .update({matchlist: matches, isStarted: true});
    }
}

export async function newRounds(tournamentId) {
    const tournamentData = await getTournament(tournamentId);
    const remainingParticipants = getRemaining(tournamentData.matches);
    const matches = roundMaking(remainingParticipants);
    return db.collection(collectionName).doc(tournamentId)
        .update({matchlist: matches, roundDone: false});
}
/*
export async function joinTournament(tournamentId, playerId) {
    const tournamentData = await getTournament(tournamentId);
    let partisipants = tournamentData.participants;
    partisipants.push(playerId);
    //const newPartisipanst = currentPartisipants.apend
    return db.collection(collectionName).doc(tournamentId)
        .update({participants: partisipants});
}
*/

export async function reportResaults(tournamentId, playerId, matchWinner) {
    const tournamentData = await getTournament(tournamentId);
    let matches = tournamentData.matchlist;
    let newRound = true;
    let isDone = false;
    let winner = null;

    for(let i = 0; i < matches.length; i++) {
        if(matches[i].player1 == playerId || matches[i].player2 == playerId) {
            matches[i].winner = matchWinner;
            matches[i].isDone = true;
        }
        if(matches[i].isDone = false) {
            newRound = false;
        }
    }

    if(matches.length == 1) {
        isDone = true;
        winner = matchWinner;
        /*
        need to be able to get match winner idisStarted
        createNotification({
            owner: matchWinner,
            header: 'You won!',
            description: 'You won the ' + tournamentData.name + ' tournament! Congratulations!',
            type: 'text',
        });
        */
    }

    
    if(newRound && !isDone) {
        createNotification({
            owner: tournamentData.ownerId,
            header: 'Ready for a new round!',
            description: 'Half of the players are now eliminated, time for a new round!',
            type: 'text',
        });
    }
    
    console.log(matches);
    console.log(newRound);
    console.log(isDone);
    console.log(matchWinner);
    return db.collection('tournaments').doc(tournamentId)
        .update({matchlist: matches, roundDone: newRound, isDone: isDone, winner: winner}); 
}

