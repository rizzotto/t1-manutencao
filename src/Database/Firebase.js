import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

class FirebaseDatabase {
    _db = firebase.database();

    getLastAnamnesis = async (userId) => {
        const snapshot = await this._db.ref(`${userId}/anamneses`).orderByKey().limitToLast(1).once("value");
        return snapshot;
        // const record = snapshot.val();
        // records.timestamp = snapshot.key;
        // return record;
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
