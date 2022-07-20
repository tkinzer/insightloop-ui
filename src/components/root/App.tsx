import { HelmetProvider } from 'react-helmet-async';
import { Router } from '~/components/router/Router';
import { FirebaseProvider } from '../context/FirebaseContext';

export default function App() {
  return (
    <HelmetProvider>
      <FirebaseProvider>
        <Router />
      </FirebaseProvider>
    </HelmetProvider>
  );
}
