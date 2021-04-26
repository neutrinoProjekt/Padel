import firebase from 'firebase';
import {FirebaseConfig} from './firebaseConfig';

const config = {
    apiKey: FirebaseConfig.apiKey,
    authDomain: FirebaseConfig.authDomain,
    projectId: FirebaseConfig.projectId,
    storageBucket: FirebaseConfig.storageBucket,
    messagingSenderId: FirebaseConfig.messagingSenderId,
    appId: FirebaseConfig.appId,
};


const Firebase = firebase.initializeApp(config);
export const auth = Firebase.auth();
export const db = Firebase.firestore();
export default Firebase;
