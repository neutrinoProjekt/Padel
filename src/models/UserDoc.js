import firebase from 'firebase';
import {db} from '../modules/firebase/firebase';
import Notification from './Notification';

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

            console.log(3);

            return new this(documentReference);
        } catch (error) {
            console.error(error);
            throw new Error('could not create user in database');
        }
    }

    // TODO deprecated
    // static async updateUserByID(id, data) {
    //     try {
    //         await db
    //             .collection('users')
    //             .doc(id)
    //             .update(data);
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error('could not add ' + data + ' to user ' + id);
    //     }
    // }

    /**
     * TODO reconstruct parameter list
     * @param {array} data - parameters to update
     */
    async update(data) {
        try {
            console.log('updating user');
            console.dir(data);

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
        await Notification.onUpdate({userReference: this.reference, onResult, onError});
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
        return `${collectionName}/${this.id}`;
    }
}
