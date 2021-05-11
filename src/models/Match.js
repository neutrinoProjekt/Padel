/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {db} from '../modules/firebase/firebase';
import {getUserReference, getUser} from './User';
import firebase from 'firebase/app';
import {createNotification} from './Notification';

const collectionName = 'matches';

const formatDate = (from, to) => {
    const fromDate = new Date(from.seconds * 1000);
    const toDate = new Date(to.seconds * 1000);

    const zeroPadd = (num) => (num < 10 ? '0' + num : num);

    const date = `${fromDate.getFullYear()}-${zeroPadd(fromDate.getMonth() + 1)}-${zeroPadd(fromDate.getDate())}`;
    const duration = `${zeroPadd(fromDate.getHours())}:${zeroPadd(fromDate.getMinutes())}-${zeroPadd(toDate.getHours())}:${zeroPadd(toDate.getMinutes())}`;
    return `${date}, ${duration}`;
};

const formatLocation = (court, city) => (`${court}, ${city}`);

const formatDocData = async (doc) => {
    const data = doc.data();
    data.owner = (await data.owner.get()).data();
    data.id = doc.id;
    data.date = formatDate(data.from, data.to);
    data.location = formatLocation(data.court, data.city);
    data.participants = await (await Promise.all(data.participants.map(p => p.get()))).map(p => ({...p.data(),id: p.id}));
    return data;
};

export function subscribeMatch(id, onUpdate, onError) {
    const unsubscribe = db.collection(collectionName)
        .where('participants', 'array-contains', getUserReference(id))
        .onSnapshot(async (snapshot) => {
            const matches = await Promise.all(snapshot.docs.map(formatDocData));
            onUpdate(matches);
        }, onError);
    return unsubscribe;
}

export async function getMatches(parameters) {
    let matches = await db.collection(collectionName);

    if (parameters.court != '') matches = matches.where('court', '==', parameters.court);
    if (parameters.city != '') matches = matches.where('city', '==', parameters.city);
    if (parameters.from != '') matches = matches.where('from', '>=', parameters.from);
    if (parameters.to != '') matches = matches.where('from', '<=', parameters.to);

    matches = await matches.get();
    matches = await Promise.all(matches.docs.map(formatDocData));
    return matches;
}

export async function getMatchHistory(id) {
    let matches = await db.collection(collectionName)
        .where('participants', 'array-contains', getUserReference(id))
        .where('from', '<', new Date(Date.now()))
        .get();
    matches = await Promise.all(matches.docs.map(formatDocData));
    return matches;
}

export function createMatch({
    owner = null,
    city = null,
    court = null,
    from = null,
    to = null,
    mode = null,
    contactinfo = null,
    minRank = null,
    maxRank = null,
    result = null,
    user_edit = null}) {
    return db.collection(collectionName).add({
        owner: getUserReference(owner),
        participants: [getUserReference(owner)],
        city,
        court,
        from,
        to,
        mode,
        contactinfo,
        minRank,
        maxRank,
        result,
        user_edit,
    });
}

export async function getMatch(matchId) {
    return db.collection(collectionName).doc(matchId).get().then((u) => u.data());
}

export async function joinMatch(matchId, playerId) {
    const matchInfo = await getMatch(matchId);
    const playerInfo = await getUser(playerId);
    createNotification({
        owner: matchInfo.owner.id,
        header: playerInfo.displayName + ' has joined your match!',
        description: playerInfo.displayName + ' is now part of your match that is to be played in ' + matchInfo.city,
        detailText: null,
        type: 'text',
        typeDetails: {},
    });
    return db.collection(collectionName).doc(matchId).update({
        participants: firebase.firestore.FieldValue.arrayUnion(getUserReference(playerId))
    });
}

