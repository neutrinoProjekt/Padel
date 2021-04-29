import firebase from 'firebase';
import {db} from '../modules/firebase/firebase';
import Notification from './Notification';
import Match from './Match';

const collectionName = 'users';

/**
 * Represents a document in the users collection
 */
export default class UserDoc {
    // should never be called externally
    constructor(documentReference) {
        this.documentReference = documentReference;
    }

    /**
     * @param {string} id - the document/auth user id
     * @return instance of UserDoc class
     */
    static async getByID(id) {
        try {
            const documentReference = await db
                .collection(collectionName)
                .doc(id);

            // create user if not already existent
            if (await documentReference.get().exists == false) {
                return await this.createByID(id);
            }

            return new this(documentReference);
        } catch (error) {
            console.error(error);
            return null;
            // throw new Error('failed to fetch user data');
            // TODO let crash on fail, or load without user?
        }
    }

    /**
     * @param {string} id - the document/auth user id
     * @return instance of UserDoc class
     */
    static async createByID(id) {
        try {
            // save empty user document to db
            const documentReference = await db
                .collection(collectionName)
                .doc(id);

            await documentReference
                .set({});

            return new this(documentReference);
        } catch (error) {
            console.error(error);
            throw new Error('could not create user in database');
        }
    }

    /**
     * TODO reconstruct parameter list
     * @param {array} data - parameters to update
     */
    async update(data) {
        try {
            await this.documentReference
                .update(data);
        } catch (error) {
            console.error(error);
            throw new Error('could not add ' + data + ' to user ' + this.id);
        }
    }

    /**
     * create notification and add reference to user
     * @param {array} notficationOptions - will be passed to Notification
     */
    async addNotification(notficationOptions) {
        try {
            // create notification doc
            const notification = await Notification.create({...notficationOptions, owner: this.reference});

            // add notificaiton reference to user doc
            await this.documentReference
                .update({
                    notifications: firebase.firestore.FieldValue.arrayUnion(notification.reference),
                });
        } catch (error) {
            console.error(error);
            throw new Error('could not add notification (UserDoc)');
        }
    }

    /**
     * Add hooks to handle updates of notifications for a user
     * @param {callable} onResult - handler for updates, will be passed array of notification data
     * @param {callable} onError - will be called on errors
     */
    async onNotificationUpdate(onResult, onError) {
        return await Notification.onUpdate({userReference: this.reference, onResult, onError});
    }

    async addMatch(matchOptions) {
        try {
            await Match.create({...matchOptions, owner: this.reference});
        } catch (error) {
            console.error(error);
            throw new Error('could not add match (UserDoc)');
        }
    }

    /**
     * Add hooks to handle updates of matches for a user
     * @param {callable} onResult - handler for updates, will be passed array of match data
     * @param {callable} onError - will be called on errors
     */
    async onMatchUpdate(onResult, onError) {
        return await Match.onUpdate({userReference: this.reference, onResult, onError});
    }


    /**
     * @return document id
     */
    get id() {
        return this.documentReference.id;
    }

    /**
     * @return document reference
     */
    get reference() {
        return db.doc(`${collectionName}/${this.id}`);
    }

    get photoURL() {
        return (async () => (await this.documentReference.get()).data().photoURL)();
    }
}
