/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {db} from '../modules/firebase/firebase';

const collectionName = 'tournaments';

export function subscribeTournament(id, onUpdate, onError) {
    var unsubscribe = db.collection(collectionName)
        .where('owner', '==', '/users/' + id)
        .onSnapshot((snapshot) => {
            const tournaments = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            onUpdate(tournaments);
        }), onError;
    return unsubscribe;
}

export function createTournament({
    owner = null,
    city = null,
    court = null,
    from = null,
    to = null,
    date = null,
    minRank = null,
    maxRank = null,
    minPlayers = null}) {
    return db.collection(collectionName).add({
        owner: '/users/' + owner,
        city,
        court,
        from,
        to,
        date,
        minRank,
        maxRank,
        minPlayers,
    });
}
