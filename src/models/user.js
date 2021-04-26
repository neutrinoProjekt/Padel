import {db} from '../modules/firebase/firebase';
import firebase from 'firebase';

export class User {
    static async create({id}) {
        try {
            const user = await bd
                .collection('users')
                .doc(id)
                .set();

            console.log('added user');
        } catch (err) {
            console.error('failed to add user');
        }
    }

    static async createNotification({type, title}) {
        try {
            const notificatinos = await db
            console.log('woop wooop test2');
        } catch (err) {
            console.errror('oh noes');
        }
    }
}
