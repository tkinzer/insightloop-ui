// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCP3txb00LQMcZm5iKQJEXMxTQ3kkINGLY',
  authDomain: 'insight-loop.firebaseapp.com',
  projectId: 'insight-loop',
  storageBucket: 'insight-loop.appspot.com',
  messagingSenderId: '429871420839',
  appId: '1:429871420839:web:bf576aa453960b5e875282',
  measurementId: 'G-HQRTNW8EFC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
