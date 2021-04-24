import { db } from '../modules/firebase';


export class User {
  static async add({id, name, email}) {
    try {
      const user = await bd
        .collection('users')
        .doc(id)
        .set({
          name,
          email,
        })
      
      console.log('added user')
    } catch (err) {
      console.error('failed to add user');
    }
  }


}