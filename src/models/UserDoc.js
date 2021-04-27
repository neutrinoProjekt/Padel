import {db} from '../modules/firebase/firebase';
import firebase from 'firebase';


/**
 * Represents a document in the users collection
 */
export default class UserDoc {
    // should never be called externally
    constructor(userDocument) {
        this.userDocument = userDocument;
    }

    /**
     * @param {string} id - the document/auth user id
     * @return instance of UserDoc class
     */
    static async getUserByID(id) {
        try {
            const userDocument = await db
                .collection('users')
                .doc(id);

            // create user if not already existent
            if (!(await userDocument.get()).exists); {
                await this.createUserByID(id);
            }

            return new this(userDocument);
        } catch (error) {
            console.error(error);
            throw new Exception('failed to fetch user data');
            // TODO let crash on fail, or load without user?
        }
    }

    /**
     * @param {string} id - the document/auth user id
     */
    static async createUserByID(id) {
        try {
            // save empty user document to db
            await db
                .collection('users')
                .doc(id)
                .set({});
        } catch (error) {
            console.error(error);
            throw new Exception('could not create user in database');
        }
    }

    async createNotification({title}) {
        try {
            const notifications = await this.userDocument
                .update({
                    notifications: title,
                });
            console.log('woop wooop test2');
        } catch (error) {
            console.error('oh noes' + err);
        }
    }
}
