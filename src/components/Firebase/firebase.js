import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// const config = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: "",
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: "1:780343943889:web:b10dcc0e1e776703"
//   };
const config = {
    apiKey: "AIzaSyANeigxeSmGmaOINo8kq87En8RlqkqvDBM",
    authDomain: "react-firebase-authentic-5af2f.firebaseapp.com",
    databaseURL: "https://react-firebase-authentic-5af2f.firebaseio.com",
    projectId: "react-firebase-authentic-5af2f",
    storageBucket: "",
    messagingSenderId: "780343943889",
    appId: "1:780343943889:web:b10dcc0e1e776703"
  };

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);
    
    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

    // *** Merge Auth and DB User API ***

    onAuthUserListener = (next, fallback) => 
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };

                        next(authUser);
                    })
            } else {
                fallback();
            }
        });

    // *** Uer API ***

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');
}

export default Firebase;