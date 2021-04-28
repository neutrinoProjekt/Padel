import {db} from '../modules/firebase/firebase';

const collectionName = 'notifications';

/**
 * Represents a document in the notifcation collection
 */
export default class Notification {
    // should never be called externally
    constructor(documentReference) {
        this.documentReference = documentReference;
    }

    /**
     * @param {string} id - the document/auth user id
     * @return instance of UserDoc class - or null if non existent
     */
    static async getByID(id) {
        try {
            const documentReference = await db
                .collection(collectionName)
                .doc(id);

            // return null if document does not exist
            if (!(await documentReference.get()).exists) {
                return null
            }

            return new this(documentReference);
        } catch (error) {
            console.error(error);
            throw new Error('failed to fetch notification data');
            // TODO let crash on fail, or load without user?
        }
    }

    /**
     * @param {string} type
     * @param {string} title
     * @param {string} owner - reference to owner (user)
     */
    static async create({type, title, owner = null}) {
        try {
            // save empty user document to db
            const documentReference = await db
                .collection(collectionName)
                .doc(id);

            await documentReference
                .set({
                    type,
                    title,
                    owner
                });
            
            return new this(documentReference);
        } catch (error) {
            console.error(error);
            throw new Error('could not create notification in database');
        }
    }

    /**
     * Add hooks to handle updates of notifications for a user
     * @param {string} userReference - reference to user who's notifications to watch
     * @param {callable} onResult - handler for updates, will be passed array of notification data
     * @param {callable} onError - will be called on errors
     */
    static async onUpdate({userReference, onResult, onError}) {
        await db
            .collection(collectionName)
            .where('owner', '==', userReference)
            .onSnapshot((querySnapshot) => {
                onResult(querySnapshot.map(documentSnapshot => documentSnapshot.data()));
            }, onError);
    }

    // async update({title}) {
    //     try {
            
    //         const notifications = await this.documentReference
    //             .update({
    //                 notifications: title,
    //             });
    //         console.log('woop wooop test2');
    //     } catch (error) {
    //         console.error('oh noes' + err);
    //     }
    // }

    get id() {
        // can this fail?
        return this.documentReference.id;
    }
}
