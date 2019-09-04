import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

class FirebaseDatabase {
    _db = firebase.database();

    getLastAnamnesis = (userId) => {
        return this._db.ref(`${userId}/anamneses`).orderByKey().limitToLast(1).once("value");
    }

    /**
     * Retorna a anamnese atual do usuário
     * @param userId ID do usuário
     * @returns Object
     */
    getAnamneses = (userId) => {
        return this._db.ref(`${userId}/anamneses`).orderByKey().once("value");
    }

    /**
     * Salva a anamnese inserida pelo usuário
     * @param userId ID do usuário
     * @returns Object
     */
    saveAnamnesis = (userId, record, date) => {
        const timestamp = date.getTime();
        return this._db.ref(`${userId}/anamneses/${timestamp}`).set(record);
    }
}

const database = new FirebaseDatabase();

export default database;
