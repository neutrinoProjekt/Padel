import {db} from '../modules/firebase/firebase';
import {getUserReference} from './User';

const collectionName = 'notifications';

export function subscribeNotifications(id, onUpdate, onError) {
    const unsubscribe = db.collection(collectionName)
        .where('owner', '==', getUserReference(id))
        .onSnapshot((snapshot) => {
            const notifications = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            onUpdate(notifications);
        }); var onError;
    return unsubscribe;
}

export function pressNotification(id) {
    db.collection('notifications').doc(id)
        .update({isnew: false});
    return null;
}

export function deletNotification(id) {
    db.collection('notifications').doc(id)
        .delete();
    return null;
}


export function uppdateNotification({
    description = null,
    detailText = null},
    id) {
    db.collection('notifications').doc(id)
        .update({detailText: detailText, description: description, type: 'text'});
    return null;
}


export function createNotification({
    type = 'default',
    header = null,
    owner = null,
    description = null,
    image = null,
    date = (new Date()),
    isnew = true,
    detailText = null,
    detailData = null}) {
    return db.collection(collectionName).add({
        type,
        title: header,
        owner: getUserReference(owner),
        header,
        description,
        image,
        date,
        isnew,
        detailText,
        detailData,
    });
}
