/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {db} from '../modules/firebase/firebase';
import {getUserReference} from './User';

const collectionName = 'tournaments';

export function subscribeTournament(id, onUpdate, onError) {
    const formatDate = (date) => {
        const convDate = new Date(date.seconds * 1000);
        const zeroPadd = (num) => (num < 10 ? '0' + num : num);

        date = `${convDate.getFullYear()}-${zeroPadd(convDate.getMonth() + 1)}-${zeroPadd(convDate.getDate())}`;
        return date;
    };

    const formatLocation = (city) => (city);

    const formatDocData = async (doc) => {
        const data = doc.data();
        data.owner = (await data.owner.get()).data();
        data.id = doc.id;
        data.date = formatDate(data.date);
        data.location = formatLocation(data.city);
        return data;
    };

    const unsubscribe = db.collection(collectionName)
        .where('owner', '==', getUserReference(id))
        .onSnapshot(async (snapshot) => {
            const tournaments = await Promise.all(snapshot.docs.map(formatDocData));
            onUpdate(tournaments);
        }, onError);
    return unsubscribe;
}

export function getTournament(id) {
    return db.collection(collectionName).doc(id).get()
        .then((u) => (u.data()));
}

export function createTournament({
    owner = null,
    city = null,
    date = null,
    contactinfo = null,
    minRank = null,
    maxRank = null,
    minPlayers = null,
    name = null,}) {
    return db.collection(collectionName).add({
        owner: getUserReference(owner),
        city,
        date,
        contactinfo,
        minRank,
        maxRank,
        minPlayers,
        name,
    });
}
