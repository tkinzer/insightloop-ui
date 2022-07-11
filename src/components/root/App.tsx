import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from '~/components/router/Router';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { setupFirebase } from '../contexts/FirebaseContext';

export const App = () => {
  console.log('starting firebase');
  setupFirebase();

  return (
    <HelmetProvider>
      <main>
        <Router />
      </main>
    </HelmetProvider>
  );
};
