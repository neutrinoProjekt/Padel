import {db} from '../modules/firebase/firebase';
import {getUserReference} from './User';
import firebase from 'firebase/app';

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

export function joinMatch(matchId, playerId) {
    return db.collection(collectionName).doc(matchId).update({
        participants: firebase.firestore.FieldValue.arrayUnion(getUserReference(playerId))
    });
}

