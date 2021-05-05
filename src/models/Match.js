import {db} from '../modules/firebase/firebase';

const collectionName = 'matches';

export function subscribeMatch(id, onUpdate, onError) {
    var unsubscribe = db.collection(collectionName)
        .where('owner', '==', id)
        .onSnapshot((snapshot) => {
            const matches = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            onUpdate(matches);
        }), onError;
    return unsubscribe;
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
        owner: owner,
        city,
        court,
        from,
        to,
        date,
        mode,
    });
}
