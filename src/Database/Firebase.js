import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

class FirebaseDatabase {
    _db = firebase.database();

    // =====================================================
    // ANAMNESE: ver arquivo `./AnamnesisRecord.js`
    // =====================================================

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
        // remover data de criação (será armazenada no path para a ficha)
        const date = data.creationDate;
        data.creationDate = null;

        // converter data de nascimento de Date para string ISO (YYYY-MM-DD)
        const birthDateDate = data.birthDate;
        data.birthDate = birthDateDate.toISOString().split("T")[0];

        const timestamp = date.getTime();
        return this._db.ref(`${userId}/anamneses/${timestamp}`).set(data);
    }

    /**
     * Mapeia anamneses do formato do Firebase para o formato do app.
     * Ver documentação de ambos os formatos em `./AnamnesisRecord.js`.
     */
    _mapAnamneses = (value) => {
        return Object.keys(value)
            .map((timestamp) => {
                const record = value[timestamp];
                record.creationDate = new Date(parseInt(timestamp));

                const birthDateISO = record.birthDate;
                record.birthDate = new Date(birthDateISO);

                return record;
            })
            .sort((a, b) => a.creationDate < b.creationDate);
    }
}

const database = new FirebaseDatabase();

export default database;
