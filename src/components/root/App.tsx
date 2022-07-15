import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from '~/components/router/Router';
import useFirebase, { FirebaseProvider } from '../context/FirebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const firebaseContext = useFirebase();
  const [auth, setAuth] = React.useState(firebaseContext.auth);
  // if (auth) {
  //   onAuthStateChanged(auth, (user) => {
  //     // Check for user status
  //     console.log('onAuthStateChanged', user);
  //   });
  // } else {
  //   console.error('auth is null');
  // }

  React.useEffect(() => {
    firebaseContext.initializeApp();
  }, []);

  React.useEffect(() => {
    console.log('useFirebase', firebaseContext);
    if (firebaseContext.firebaseApp) {
      console.log('useFirebase', firebaseContext.firebaseApp);
      setAuth(getAuth(firebaseContext.firebaseApp));
    }
  }, [firebaseContext.firebaseApp]);

  return (
    <HelmetProvider>
      <FirebaseProvider>
        <Router />
      </FirebaseProvider>
    </HelmetProvider>
  );
}
