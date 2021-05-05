import {db} from '../modules/firebase/firebase';

const collectionName = 'notifications';

export function subscribeNotifications(id, onUpdate, onError) {
    var unsubscribe = db.collection(collectionName)
        .where('owner', '==', id)
        .onSnapshot((snapshot) => {
            const notifications = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            onUpdate(notifications);
        }), onError;
    return unsubscribe;
}

export function getNotifications(id) {
    return db.collection(collectionName).where('owner', '==', id).get()
        .then((n) => n.docs.map((doc) => ({...doc.data(), id: doc.id})));
}

export function createNotification({
    type = 'default',
    header = null,
    owner = null,
    description = null,
    image = null,
    date = null,
    isnew = null}) {
    return db.collection(collectionName).add({
        type,
        title: header,
        owner: owner,
        header,
        description,
        image,
        date,
        isnew,
    });
}
