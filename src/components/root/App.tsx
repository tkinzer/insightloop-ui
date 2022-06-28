import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from '~/components/router/Router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { setupFirebase } from '../contexts/FirebaseContext';

export const App = () => {
  console.log('starting firebase');
  setupFirebase();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('signed in user:  ', user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  return (
    <HelmetProvider>
      <main>
        <Router />
      </main>
    </HelmetProvider>
  );
};
