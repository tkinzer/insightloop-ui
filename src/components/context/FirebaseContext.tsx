import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth as getFirebaseAuth,
  Auth as FirebaseAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth';
import { connectFirestoreEmulator, Firestore, getFirestore } from 'firebase/firestore';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

let firebaseApp: FirebaseApp;
const appName = import.meta.env.appName ?? 'insight-loop';
const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;

type FirebaseContextType = {
  firebaseApp: FirebaseApp | null;
  auth: FirebaseAuth | null;
  firestore: Firestore | null;
  initializeApp: (options?: any) => void;
  loginUser: () => Promise<string | void | undefined>;
  loginWithGoogle: () => Promise<void>;
  logoutUser: () => Promise<void>;
  // getRedirectResult: () => Promise<any>;
  loginUserWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
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
  loginUserWithEmailAndPassword: () => Promise.resolve({} as UserCredential),
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
  const [providerToken, setProviderToken] = React.useState<string | null>(null);
  const provider = new GoogleAuthProvider();

  function init() {
    console.debug('Starting Firebase *******');
    if (firebaseApp) {
      return;
    }

    const tempApp = initializeApp(firebaseConfig, appName);

    const tempAuth = getFirebaseAuth(tempApp);
    const tempFirestore = getFirestore(tempApp);

    if (!firebaseAuth) setFirebaseAuth(tempAuth);
    if (!firebaseFirestore) setFirebaseFirestore(tempFirestore);

    if (useEmulator()) {
      connectFirestoreEmulator(tempFirestore, 'localhost', 8080);
      connectAuthEmulator(tempAuth, 'http://localhost:9099');
    }

    setApp(tempApp);
    console.log('FirebaseApp', tempApp);
  }

  async function loginWithGoogle() {
    if (!firebaseAuth) {
      return;
    }

    getRedirectResult(firebaseAuth).then(function (result) {
      if (result) {
        // This gives you a Google Access Token.
        console.log('getRedirectResult from login -->', result);
      }
    });

    await signInWithRedirect(firebaseAuth, provider);
  }

  /**
   * Simple login with popup that will redirect to the login page.
   * TODO: Pass the provider so that it can ne dynamic for multiple providers.
   * @param e React.MouseEvent<HTMLAnchorElement, MouseEvent>
   * @returns
   */
  function loginUser(): Promise<string | void | undefined> {
    if (!firebaseAuth) {
      return Promise.reject();
    }

    console.log('Redirecting to third-party login page');
    const token = signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        console.log('user login', result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        console.log('GoogleAuth access token:  ', token);
        // TODO - save token to local storage
        setProviderToken(token ?? '');

        return token;
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

    return token ?? Promise.reject();
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

  /**
   * Login user with email and password
   * @param email string
   * @param password string
   * @returns {Promise<void>}
   */
  function loginUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
    if (!firebaseAuth) {
      return Promise.reject('No firebase auth');
    }

    return signInWithEmailAndPassword(firebaseAuth, email, password);
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
        loginUserWithEmailAndPassword: loginUserWithEmailAndPassword,
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
