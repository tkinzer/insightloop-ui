import * as firebase from 'firebase/app';

// Add the Firebase services that you want to use
import * as firestore from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCP3txb00LQMcZm5iKQJEXMxTQ3kkINGLY',
  authDomain: 'insight-loop.firebaseapp.com',
  projectId: 'insight-loop',
  storageBucket: 'insight-loop.appspot.com',
  messagingSenderId: '429871420839',
  appId: '1:429871420839:web:bf576aa453960b5e875282',
  measurementId: 'G-HQRTNW8EFC',
};

firebase.initializeApp(config);

// const databaseRef = firebase.getApp();
// export const todosRef = databaseRef.child("todos");

export default firebase;
