import { firebase, googleAuthProvider } from '../firebase/firebase';
import database from '../firebase/firebase';

export const login = (uid) => ({
    type: 'LOGIN',
    uid
});

export const startLoginUser = ({ email, password }) => {
    return (dispatch) => {        
        return firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            database.ref(`users/${firebase.auth().currentUser.uid}`).update({
                loggedIn: true
            });           
            dispatch(login(firebase.auth().currentUser.uid));
        }).catch((error) => {
            alert("Invalid email/password");           
        });
    };
};

export const startCreateLogin = ({ name, email, password, admin }) => {
    return (dispatch) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            const uid = firebase.auth().currentUser.uid;
            const user = {
                name: name,
                email: email,
                uid: uid,
                loggedIn: true,
                admin: admin
            };
            database.ref(`users/${user.uid}`).update(user).then(() => {
                dispatch(addUser(user));
            });
        });
    };
};

export const addUser = (user) => ({
    type: 'ADD_USER',
    user
});

export const logout = () => ({
    type: 'LOGOUT'
});

export const startLogout = () => {
    return (dispatch) => {
        const uid = firebase.auth().currentUser.uid;
        database.ref(`users/${uid}`).update({
            loggedIn: false
        }).then(() => {
            return firebase.auth().signOut().then(() => {
                dispatch(logout());
            })
        });
    };
};