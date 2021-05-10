/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {db} from '../modules/firebase/firebase';
import {getUserReference, getUser} from './User';
import firebase from 'firebase/app';
import {createNotification} from './Notification';

const collectionName = 'matches';

export function subscribeMatch(id, onUpdate, onError) {
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
        return data;
    };

    const unsubscribe = db.collection(collectionName)
        .where('owner', '==', getUserReference(id))
        .onSnapshot(async (snapshot) => {
            const matches = await Promise.all(snapshot.docs.map(formatDocData));
            onUpdate(matches);
        }, onError);
    return unsubscribe;
}

export function getMatches(id) {
    return db.collection(collectionName).where('owner', '==', '/users/' + id).get()
        .then((n) => n.docs.map((doc) => ({...doc.data(), id: doc.id})));
}

export function createMatch({
    owner = null,
    city = null,
    court = null,
    from = null,
    to = null,
    mode = null}) {
    return db.collection(collectionName).add({
        owner: getUserReference(owner),
        participants: [getUserReference(owner)],
        city,
        court,
        from,
        to,
        mode,
    });
}

export async function getMatchOwner(matchId) {
    return db.collection(collectionName).doc(matchId).get().then((u) => u.data());
}

export async function joinMatch(matchId, playerId) {
    const matchInfo = await getMatchOwner(matchId);
    const playerInfo = await getUser(playerId);
    createNotification({
        owner: matchInfo.owner.id,
        header: playerInfo.displayName + ' has joined your match!',
        description: playerInfo.displayName + ' is now part of your match that is to be played in ' + matchInfo.city,
        detailText: null,
        type: 'text',
        typeDetails: {
        },
    });
    return db.collection(collectionName).doc(matchId).update({
        participants: firebase.firestore.FieldValue.arrayUnion(getUserReference(playerId))
    });
}

