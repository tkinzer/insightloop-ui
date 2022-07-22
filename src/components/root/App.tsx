import { HelmetProvider } from 'react-helmet-async';
import { Router } from '~/components/router/Router';
import { JournalProvider } from '~/journal/useJournalEntries';
import { FirebaseProvider } from '../context/FirebaseContext';

export default function App() {
  return (
    <HelmetProvider>
      <FirebaseProvider>
        <JournalProvider>
          <Router />
        </JournalProvider>
      </FirebaseProvider>
    </HelmetProvider>
  );
}
