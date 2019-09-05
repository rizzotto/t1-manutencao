import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

class FirebaseDatabase {
    _db = firebase.database();

    /**
     * Retorna a última anamnese do usuário
     * @param userId ID do usuário
     * @returns Object
     */
    getLastAnamnesis = async (userId) => {
        const snapshot = await this._db.ref(`${userId}/anamneses`).orderByKey().limitToLast(1).once("value");
        const value = snapshot.val();

        return this._mapAnamneses(value)[0];
    }

    /**
     * Retorna todas as anamneses do usuário
     * @param userId ID do usuário
     * @returns Object
     */
    getAnamneses = async (userId) => {
        const snapshot = await this._db.ref(`${userId}/anamneses`).orderByKey().once("value");
        const value = snapshot.val();

        return this._mapAnamneses(value);
    }

    /**
     * Salva a anamnese inserida pelo usuário
     * @param userId ID do usuário
     * @param data Objeto contendo os dados da anamnese 
     * (é necessário ter o atributo creationDate, ex.: x.creationDate = new Date())
     * @returns Object
     */
    saveAnamnesis = (userId, data) => {
        const date = data.creationDate;
        data.creationDate = null;

        const timestamp = date.getTime();
        return this._db.ref(`${userId}/anamneses/${timestamp}`).set(data);
    }

    _mapAnamneses = (value) => {
        return Object.keys(value)
            .map((timestamp) => {
                const record = value[timestamp];
                record.creationDate = new Date(parseInt(timestamp));
                return record;
            })
            .sort((a, b) => a.creationDate < b.creationDate);
    }
}

const database = new FirebaseDatabase();

export default database;
