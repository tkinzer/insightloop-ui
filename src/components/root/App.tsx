import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Router } from '~/components/router/Router';
import { setupFirebase } from '../../lib/firebase';
import { UserContext, UserProvider, useUserState } from '../context/UserContext';

export default function App() {
  setupFirebase();

  return (
    <HelmetProvider>
      <UserProvider>
        <Router />
      </UserProvider>
    </HelmetProvider>
  );
}
