import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth as getFirebaseAuth,
  Auth as FirebaseAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';
import React, { FC } from 'react';

let firebaseApp: FirebaseApp;
const appName = import.meta.env.appName ?? 'insight-loop';
const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

type FirebaseContextType = {
  firebaseApp: FirebaseApp | null;
  auth: FirebaseAuth | null;
  firestore: Firestore | null;
  initializeApp: (options?: any) => void;
  loginUser: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
  // getRedirectResult: () => Promise<any>;
};

const defaultFirebaseContext: FirebaseContextType = {
  firebaseApp: null,
  auth: null,
  firestore: null,
  initializeApp: () => {},
  loginUser: () => Promise.resolve(),
  logoutUser: () => Promise.resolve(),
  // getRedirectResult: () => Promise.resolve({}),
  loginWithGoogle: () => Promise.resolve(),
};

const FirebaseContext = React.createContext<FirebaseContextType>(defaultFirebaseContext);
export const useFirebaseContext = () => React.useContext(FirebaseContext);

type FirebaseProps = {
  appName?: string;
  useEmulator?: boolean;
  children: any;
};

const firebaseConfig = {
  apiKey: 'AIzaSyCP3txb00LQMcZm5iKQJEXMxTQ3kkINGLY',
  authDomain: 'insight-loop.firebaseapp.com',
  databaseURL: 'https://insight-loop-default-rtdb.firebaseio.com',
  projectId: 'insight-loop',
  storageBucket: 'insight-loop.appspot.com',
  messagingSenderId: '429871420839',
  appId: '1:429871420839:web:bf576aa453960b5e875282',
  measurementId: 'G-HQRTNW8EFC',
};

const viteFirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const FirebaseProvider: FC<FirebaseProps> = (props) => {
  console.debug('FirebaseProvider', props, firebaseConfig);
  const { children } = props;
  const firebaseContext = useFirebaseContext();
  const [firebaseApp, setApp] = React.useState<FirebaseApp | null>(firebaseContext.firebaseApp);
  const [firebaseAuth, setFirebaseAuth] = React.useState<FirebaseAuth | null>(firebaseContext.auth);
  const [firebaseFirestore, setFirebaseFirestore] = React.useState<Firestore | null>(firebaseContext.firestore);
  const provider = new GoogleAuthProvider();

  function init() {
    console.debug('Starting Firebase *******');
    if (firebaseApp) {
      return;
    }

    const app = initializeApp(firebaseConfig, appName);

    const tempAuth = getFirebaseAuth(app);
    const tempFirestore = getFirestore(app);

    if (!firebaseAuth) setFirebaseAuth(tempAuth);
    if (!firebaseFirestore) setFirebaseFirestore(tempFirestore);

    if (useEmulator()) {
      connectFirestoreEmulator(tempFirestore, 'localhost', 8080);
      connectAuthEmulator(tempAuth, 'http://localhost:9099');
    }

    setApp(app);
    console.log('FirebaseApp', app);
  }

  async function loginWithGoogle() {
    if (!firebaseAuth) {
      return;
    }

    getRedirectResult(firebaseAuth).then(function (result) {
      if (result) {
        // This gives you a Google Access Token.
        console.log('getRedirectResult', result);
      }
    });

    await signInWithRedirect(firebaseAuth, provider);
  }

  function loginUser(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault();
    if (!firebaseAuth) {
      return;
    }

    console.log('login in user');
    signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        console.log('user login', result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log('signed in user:  ', token);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(credential);
      });
  }

  /**
   * Logout the current user
   * @returns {Promise<void>}
   */
  function logoutUser() {
    if (!firebaseAuth) {
    }

    return Promise.resolve();
  }

  return (
    <FirebaseContext.Provider
      value={{
        firebaseApp: firebaseApp,
        auth: firebaseAuth,
        firestore: firebaseFirestore,
        initializeApp: init,
        loginUser: loginUser,
        logoutUser: logoutUser,
        loginWithGoogle: loginWithGoogle,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export default function useFirebase() {
  const firebaseContext = useFirebaseContext();

  React.useEffect(() => {
    firebaseContext.initializeApp();
  }, []);

  return firebaseContext;
}

export function useFirestore() {
  const firebaseContext = useFirebaseContext();

  React.useEffect(() => {
    console.log('useFirestore', firebaseContext.firestore);
  }, [firebaseContext.firestore]);

  return firebaseContext.firestore;
}
