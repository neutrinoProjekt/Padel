import React, {useEffect, useState, useContext} from 'react';
import {auth} from '../modules/firebase/firebase';
import UserDoc from '../models/UserDoc';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [currentUserDoc, setCurrentUserDoc] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    function signup(email, password, username, fullname) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(({user}) => {
                user.updateProfile({
                    displayName: username,
                    photoURL: 'https://eu.ui-avatars.com/api/?background=random&name=' + fullname
                });
                UserDoc.createByID(user.uid)
                    .then(userDoc => userDoc.update({
                        fullname: fullname,
                        photoURL: 'https://eu.ui-avatars.com/api/?background=random&name=' + fullname,
                        notifications: {},
                        matches: {},
                    }));
            })
            .catch((e) => setError(e.message));
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
            .catch((e) => setError(e.message));
    }

    function logout() {
        return auth.signOut();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setCurrentUser(user);
            if (user != null) setCurrentUserDoc(await UserDoc.getByID(user.uid));
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        error,
        currentUser,
        currentUserDoc,
        login,
        signup,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
