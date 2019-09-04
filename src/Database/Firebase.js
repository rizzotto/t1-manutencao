import * as firebase from 'firebase';

var config = {
    apiKey: " AIzaSyDfU143hZGnDdy0R5EC1SVhp15ZixYLWE0 ",
    authDomain: "testereact-59b3b.firebaseapp.com",
    databaseURL: "https://testereact-59b3b.firebaseio.com",
    storageBucket: "testereact-59b3b.appspot.com"
}; 

firebase.initializeApp(config);

class FirebaseDatabase {
    _db = firebase.database();

    getLastAnamnesis = (userId) => {
        return this._db.ref(`${userId}/anamneses`).orderByKey().limitToLast(1).once("value");
    }

    getAnamneses = (userId) => {
        return this._db.ref(`${userId}/anamneses`).orderByKey().once("value");
    }

    saveAnamnesis = (userId, record, date) => {
        const timestamp = date.getTime();
        return this._db.ref(`${userId}/anamneses/${timestamp}`).set(record);
    }
}

const database = new FirebaseDatabase();

export default database;
