import {db} from '../modules/firebase/firebase';

const collectionName = 'matches';

export default class Match {
    static async create() {
        try {
            const documentReference = await db
                .collection(collectionName)
                .add({
                    owner,
                    city,
                    court,
                    from,
                    to,
                    date,
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
     * @return unsubscribe callable
     */
    static async onUpdate({userReference, onResult, onError}) {
        // extract data from documentSnapshot and format into object
        const formatDocumentData = async (documentSnapshot) => {
            const formattedData = {...documentSnapshot.data(), id: documentSnapshot.id};
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
}

export function subscribeMatch(id, onUpdate, onError) {
    return db.collection(collectionName)
        .where('owner', '==', '/users/' + id)
        .onSnapshot((snapshot) => {
            const matches = snapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
            onUpdate(matches);
        }), onError;
}

export function createMatch({
    owner = null,
    city = null,
    court = null,
    from = null,
    to = null,
    date = null}) {
    return db.collection(collectionName).add({
        owner: '/users/' + owner,
        city,
        court,
        from,
        to,
        date,
    });
}
