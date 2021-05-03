import {db} from '../modules/firebase/firebase';

const INITIAL_RATING = 1000;

export function updateUser(id, data) {
    return db.collection('users').doc(id).set(data);
}

export function createUser(id, fullname, displayName) {
    return db.collection('users').doc(id).set({
        fullname: fullname,
        displayName: displayName,
        rating: INITIAL_RATING,
        description: "This is not the description you're looking for",
        photoURL: 'https://eu.ui-avatars.com/api/?background=random&name=' + fullname,
    });
}

export function getUser(id) {
    return db.collection('users').doc(id).get().then(u => u.data());
}