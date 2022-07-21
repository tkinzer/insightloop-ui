import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth as getFirebaseAuth,
  Auth as FirebaseAuth,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  signInWithEmailAndPassword,
  UserCredential,
  onAuthStateChanged,
  AuthProvider,
  User,
  signInAnonymously,
} from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import React, { FC, ReactNode } from 'react';

type FirebaseContextType = {
  app: FirebaseApp | null;
  user: User | null;
  auth: FirebaseAuth | null;
  firestore: Firestore | null;
  loginUser: () => Promise<string | void | undefined>;
  loginWithGoogle: (onSuccess: () => void) => Promise<void>;
  logoutUser: () => Promise<void>;
  loginGuest: (onSuccess: () => void) => Promise<void>;
  // getRedirectResult: () => Promise<any>;
  loginUserWithEmailAndPassword: (email: string, password: string) => Promise<UserCredential>;
};

const defaultFirebaseContext: FirebaseContextType = {
  app: null,
  user: null,
  auth: null,
  firestore: null,
  loginUser: () => Promise.resolve(),
  logoutUser: () => Promise.resolve(),
  // getRedirectResult: () => Promise.resolve({}),
  loginGuest: () => Promise.resolve(),
  loginWithGoogle: () => Promise.resolve(),
  loginUserWithEmailAndPassword: () => Promise.resolve({} as UserCredential),
};

const FirebaseContext = React.createContext<FirebaseContextType>(defaultFirebaseContext);
export const useFirebaseContext = () => React.useContext(FirebaseContext);

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

export const FirebaseProvider: FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  // const useEmulator = () => import.meta.env.VITE_USE_FIREBASE_EMULATOR;
  const firebaseContext = useFirebaseContext();

  const [firebaseApp, setFirebaseApp] = React.useState<FirebaseApp | null>(null);
  const [firebaseAuth, setFirebaseAuth] = React.useState<FirebaseAuth | null>(firebaseContext.auth);
  const [firebaseFirestore, setFirebaseFirestore] = React.useState<Firestore | null>(firebaseContext.firestore);
  const [providerToken, setProviderToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
  const [provider, setProvider] = React.useState<AuthProvider | null>(null);
  // TODO: configure localhost emulators
  // eg. handle const useFirebaseEmulator = useEmulator();
  // FIX: const useFirebaseEmulatorConfig = useFirebaseEmulator ? viteFirebaseConfig : firebaseConfig;
  // const useFirebaseConfig = useFirebaseEmulator ? useFirebaseEmulatorConfig : firebaseConfig;
  // const useFirebaseApp = useFirebaseEmulator ? useFirebaseEmulator : firebaseApp;

  function start(options?: any) {
    setIsLoading(true);
    const app = initializeApp(firebaseConfig);
    setFirebaseApp(app);

    const db = getFirestore(app);
    setFirebaseFirestore(db);

    const auth = getFirebaseAuth(app);
    setFirebaseAuth(auth);

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    setProvider(provider);
    setIsLoading(false);
  }

  React.useEffect(() => {
    if (firebaseApp && firebaseFirestore && firebaseAuth) {
      return;
    }
    start();
  }, [firebaseApp]);

  React.useEffect(() => {
    if (!firebaseAuth) {
      return;
    }
    // const authEmulator = connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    onAuthStateChanged(firebaseAuth, async (user) => {
      console.log('auth state changed', user);
      // TODO: compare this user with the one in the context
      if (user && user.uid && !isLoggedIn) {
        const idToken = await user.getIdToken();
        setProviderToken(idToken);
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setProviderToken(null);
        setUser(null);
        setIsLoggedIn(false);
      }
    });
  }, [firebaseAuth, firebaseApp]);

  const loginGuest = async (onSuccess: () => void) => {
    if (!firebaseAuth) {
      console.error('Firebase auth is not initialized. Can not perform guest login');
      return;
    }

    signInAnonymously(firebaseAuth)
      .then((response) => {
        if (response) {
          console.log('signInAnonymously', response);
          onSuccess();
        }
      })
      .catch((e) => console.error(e));
  };

  /**
   * Login with Redirect
   * @returns {Promise<void>}
   */
  async function loginWithGoogle() {
    console.log('loginWithGoogle');
    if (!firebaseAuth || !provider) {
      console.error('firebaseAuth or provider is null');
      return;
    }

    const result = await getRedirectResult(firebaseAuth).then((result) => {
      console.log('getRedirectResult from login -->', result);
      if (result?.user) {
        result.user.getIdToken().then((idToken) => {
          console.log('idToken from login -->', idToken);
          setProviderToken(idToken);
        });
        // This gives you a Google Access Token.
      }
    });

    // TBD do we need to await this?
    signInWithRedirect(firebaseAuth, provider);
  }

  /**
   * Simple login with popup that will redirect to the login page.
   * TODO: Pass the provider so that it can ne dynamic for multiple providers.
   * @param e React.MouseEvent<HTMLAnchorElement, MouseEvent>
   * @returns
   */
  function loginUserWithPopup(): Promise<string | void | undefined> {
    if (!firebaseAuth || !provider) {
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
      return Promise.reject();
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
        app: firebaseApp,
        user: user,
        auth: firebaseAuth,
        firestore: firebaseFirestore,
        loginUser: loginUserWithPopup,
        logoutUser: logoutUser,
        loginGuest: loginGuest,
        loginWithGoogle: loginWithGoogle,
        loginUserWithEmailAndPassword: loginUserWithEmailAndPassword,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
