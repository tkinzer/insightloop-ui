import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '~/components/context/FirebaseContext';
import { getFirestore, collection, getDocs, Firestore } from 'firebase/firestore/lite';

type JournalContext = {
  entries: any[];
  setEntries: Dispatch<SetStateAction<never[]>>; // Dispatch<SetStateAction<never[]>>
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: any;
  setError: (error: any) => void;
};

const defaultValue: JournalContext = {
  entries: [],
  setEntries: () => {},
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
};

const journalContext = React.createContext(defaultValue);

const JournalProvider = (
  props: React.PropsWithChildren<{
    entries?: any[];
  }>
) => {
  const { children } = props;
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { firestore } = useFirebaseContext();

  // Get journal entries from firestore
  useEffect(() => {
    console.log('JournalProvider: useEffect', entries);
    setLoading(true);

    if (!firestore) {
      console.error('No firestore');
      return;
    }

    const path = 'users/1/journal';
    const snapshot = collection(firestore, path);
    console.log('JournalProvider: useEffect get collection', snapshot);

    const fetchEntries = async () => {
      console.log('fetching entries from firestore');

      try {
        // FIX: use firestore instead of firebase
        // URL is not correct
        await fetch('/api/journal')
          .then((response) => response.json())
          .then((response) => {
            console.log('fetchEntries', response);
            setEntries(response);
            setLoading(false);
          })
          .catch((error) => {
            console.error('fetchEntries', error);
          });
      } catch (error: any) {
        console.error(error);
        setError(error);
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  return (
    <journalContext.Provider
      value={{
        entries,
        setEntries,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </journalContext.Provider>
  );
};

/**
 * Data hook for journal entries
 * @returns
 */
export default function useJournalEntries() {
  const navigate = useNavigate();
  const context = React.useContext<JournalContext>(journalContext);
  const { firebaseApp } = useFirebaseContext();
  if (context === undefined) {
    throw new Error('useEntries must be used within a JournalProvider');
  }
  const [entries, setEntries] = React.useState(context.entries ?? []);

  useEffect(() => {
    console.log('useJournalEntries', entries);
    const getJournalEntries = async () => {
      console.log('getJournalEntries');
      try {
        // FIX: use firestore instead of firebase
        if (!firebaseApp) {
          return;
        }
        const db = getFirestore(firebaseApp);

        // Get a list of cities from your database
        async function getCities(db: Firestore) {
          const citiesCol = collection(db, 'cities');
          const citySnapshot = await getDocs(citiesCol);
          const cityList = citySnapshot.docs.map((doc) => doc.data());
          return cityList;
        }
        // URL is not correct
        // await fetch('/api/journal')
        //   .then((response) => response.json())
        //   .then((response) => {
        //     console.log('getJournalEntries', response);
        //     setEntries(response);
        //   })
        //   .catch((error) => {
        //     console.error('getJournalEntries', error);
        //   });
      } catch (error: any) {
        console.error(error);
      }
    };
    getJournalEntries();
  }, [context.entries]);

  function addEntry() {
    navigate('/journal/new');
  }

  function createEntry() {
    console.log('saving entry to api');
    // TODO submit the entry
    navigate('/journal');
  }

  return {
    context,
    entries,
    addEntry,
    createEntry,
  };
}

export { JournalProvider, useJournalEntries };
