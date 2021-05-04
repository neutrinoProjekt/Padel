import React, {useEffect, useState, useContext} from 'react';
import {auth} from '../modules/firebase/firebase';
import {createUser} from '../models/User';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    function signup(email, password, username, fullname) {
        return auth.createUserWithEmailAndPassword(email, password)
            .then(({user}) => createUser(user.uid, fullname, username))
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
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        error,
        currentUser,
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
