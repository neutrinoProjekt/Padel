import React from 'react'
import {db} from '../modules/firebase/firebase';

const createMatch = async ({city}) => {
    await db.collection('matches').add({
        city: city,
    }).then(() => {
        navigation.goBack();
    })
        .catch((error) => alert(error));
};


export default createMatch;
