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
            if (!(await documentReference.get()).exists) {
                return await this.createByID(id);
            }

            return new this(documentReference);
        } catch (error) {
            console.error(error);
            return null;
            //throw new Error('failed to fetch user data');
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
     * create notification and add reference to user
     * @param {array} notficationOptions - will be passed to Notification
     */
    async addNotification(notficationOptions) {
        try {
            const notification = await Notification.create({...notficationOptions, owner: this.id})
            
            await this.documentReference
                .update({
                    notifications: firebase.firestore.FieldValue.arrayUnion(notification.id),
                });

            console.log('added notification (UserDoc)');
        } catch (error) {
            console.error(error);
            throw new Exception('could not add notification (UserDoc)');
        }
    }

    async onNotificationUpdate(onResult, onError) {
        await Notification.onUpdate({userReference: this.reference, onResult, onError});
    }

    get id() {
        return this.documentReference.id;
    }

    get reference() {
        return `${collectionName}/${this.id}`;
    }
}
