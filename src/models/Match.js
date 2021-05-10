/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {db} from '../modules/firebase/firebase';
import {getUserReference} from './User';
import firebase from 'firebase/app';

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

export async function getMatches(id, parameters) {
    let matches = await db.collection(collectionName)
        .where('court', '==', parameters.court)
        .where('city', '==', parameters.city)
        .where('from', '>=', parameters.from)
        .where('from', '<=', parameters.to)
        .get();
    matches = await Promise.all(matches.docs.map(formatDocData));
    return matches;
}

export async function getMatches2(parameters) {
    let matches = await db.collection(collectionName);

    if (parameters.court != '') matches = matches.where('court', '==', parameters.court);
    if (parameters.city != '') matches = matches.where('city', '==', parameters.city);
    if (parameters.from != '') matches = matches.where('from', '>=', parameters.from);
    if (parameters.to != '') matches = matches.where('from', '<=', parameters.to);

    matches = await matches.get();
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
    minRank = null,
    maxRank = null,}) {
    return db.collection(collectionName).add({
        owner: getUserReference(owner),
        participants: [getUserReference(owner)],
        city,
        court,
        from,
        to,
        mode,
        minRank,
        maxRank,
    });
}

export function joinMatch(matchId, playerId) {
    return db.collection(collectionName).doc(matchId).update({
        participants: firebase.firestore.FieldValue.arrayUnion(getUserReference(playerId))
    });
}

