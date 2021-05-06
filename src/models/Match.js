import {db} from '../modules/firebase/firebase';

const collectionName = 'matches';

export function subscribeMatch(id, onUpdate, onError) {
    return db.collection(collectionName)
        .where('owner', '==', '/users/' + id)
        .onSnapshot((snapshot) => {
            const matches = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            onUpdate(matches);
        }), onError;
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
    date = null,
    mode = null}) {
    return db.collection(collectionName).add({
        owner: '/users/' + owner,
        city,
        court,
        from,
        to,
        date,
        mode,
    });
}
