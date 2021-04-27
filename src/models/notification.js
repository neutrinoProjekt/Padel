import { db } from '../modules/firebase/firebase';

export default class Notification {
    
    static async add({type, title}) {
        try {
            const notificatinos = await db
                .collection('notifications')
                .add({
                    type,
                    title
                })
    
            console.log('woop wooop');
        } catch (err) {
            console.errror('oh noes');
        }
    }
}

export const test = () => {
    console.log('hello');
}