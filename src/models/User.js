import {db} from '../modules/firebase/firebase';

const INITIAL_RATING = 1000;
const collectionName = 'users';

export function updateUser(id, data) {
    return db.collection(collectionName).doc(id).update(data);
}

export function createUser(id, fullname, displayName) {
    return db.collection(collectionName).doc(id).set({
        fullname: fullname,
        displayName: displayName,
        rating: INITIAL_RATING,
        description: '-',
        matchesPlayed: 0,
        wins: 0,
        losses: 0,
        city: '-',
        country: '-',
        phoneNumber: '-',
        photoURL: 'https://eu.ui-avatars.com/api/?background=random&name=' + fullname,
    });
}

export function getUser(id) {
    return db.collection(collectionName).doc(id).get().then((u) => u.data());
}

export function getTopRated() {
    return db.collection(collectionName).orderBy('rating', 'desc').limit(20).get()
        .then((u) => u.docs.map((doc) => doc.data()));
}

export function getUserReference(id) {
    return db.doc(`${collectionName}/${id}`);
}

export function deleteUserData(id) {
    return db.collection(collectionName).doc(id).delete();
}

export function getUsers(user) {
    return db.collection(collectionName)
        .where('fullname', '>=', user)
        .where('fullname', '<=', user + "\uf8ff")
        .limit(20).get()
        .then((u) => u.docs.map((doc) => ({...doc.data(), id: doc.id})));
};
