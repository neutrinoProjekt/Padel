import {db} from '../modules/firebase/firebase';

const collectionName = 'matches';

/**
 * Represents a document in the matches collection
 */
export default class Match {
    // should never be called externally
    constructor(documentReference) {
        this.documentReference = documentReference;
    }

    // /**
    //  * @param {string} id - the document/auth user id
    //  * @return instance of UserDoc class - or null if non existent
    //  */
    // static async getByID(id) {
    //     try {
    //         const documentReference = await db
    //             .collection(collectionName)
    //             .doc(id);

    //         // return null if document does not exist
    //         if (!(await documentReference.get()).exists) {
    //             return null;
    //         }

    //         return new this(documentReference);
    //     } catch (error) {
    //         console.error(error);
    //         throw new Error('failed to fetch notification data');
    //         // TODO let crash on fail, or load without user?
    //     }
    // }

    static async create({owner = null, city = null, court = null, from = null, to = null, date = null}) {
        try {
            console.log('owner object');
            console.dir(owner);
            
            const documentReference = await db
                .collection(collectionName)
                .add({
                    owner, 
                    city, 
                    court, 
                    from, 
                    to, 
                    date
                });

            return new this(documentReference);
        } catch (error) {
            console.error(error);
            throw new Error('could not create match in database');
        }
    }

    /**
     * Add hooks to handle updates of notifications for a user
     * @param {string} userReference - reference to user who's notifications to watch
     * @param {callable} onResult - handler for updates, will be passed array of notification data
     * @param {callable} onError - will be called on errors
     * @returns unsubscribe callable
     */
    static async onUpdate({userReference, onResult, onError}) {
        // extract data from documentSnapshot and format into object
        const formatDocumentData = async (documentSnapshot) => {
            let formattedData = {...documentSnapshot.data(), id: documentSnapshot.id};
            formattedData.owner = (await formattedData.owner.get()).data();
            return formattedData;
        };
        
        return await db
            .collection(collectionName)
            .where('owner', '==', userReference)
            .onSnapshot(async (querySnapshot) => {
                onResult(await Promise.all(querySnapshot.docs.map(formatDocumentData)));
            }, onError);
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
}
