// esse arquivo apenas configura o Firebase e exporta
// apenas o que é usado (apenas Realtime Database, por enquanto)

import * as firebase from 'firebase';
import firebaseConfig from '../Config/firebaseConfig';

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const storage = firebase.storage();
export { database, storage };
