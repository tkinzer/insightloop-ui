import { HelmetProvider } from 'react-helmet-async';
import { Router } from '~/components/router/Router';
import { JournalProvider } from '~/journal/useJournalEntries';
import { AuthProvider } from '../context/AuthContext';
import { FirebaseProvider } from '../context/FirebaseContext';
import { UserProvider } from '../context/UserContext';

export default function App() {
  return (
    <HelmetProvider>
      <FirebaseProvider>
        <AuthProvider>
          <UserProvider>
            <JournalProvider>
              <Router />
            </JournalProvider>
          </UserProvider>
        </AuthProvider>
      </FirebaseProvider>
    </HelmetProvider>
  );
}
