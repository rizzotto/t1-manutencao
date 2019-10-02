// esse arquivo apenas configura o Firebase e exporta
// apenas o que é usado (apenas Realtime Database, por enquanto)

import * as firebase from 'firebase';
import firebaseConfig from '../firebaseConfig';

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
export { database };
