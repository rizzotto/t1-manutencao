import * as firebase from 'firebase';

var config = {
    apiKey: " AIzaSyDfU143hZGnDdy0R5EC1SVhp15ZixYLWE0 ",
    authDomain: "testereact-59b3b.firebaseapp.com",
    databaseURL: "https://testereact-59b3b.firebaseio.com",
    storageBucket: "testereact-59b3b.appspot.com"
}; 

firebase.initializeApp(config);

export const db = firebase.database();