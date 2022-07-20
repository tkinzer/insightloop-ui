import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '~/components/context/FirebaseContext';
import { collection, getDocs, Firestore } from 'firebase/firestore/lite';

type JournalContext = {
  entries: any[];
  loading: boolean;
  createEntry: (title: string, entry: string) => Promise<void>;
};

const defaultValue: JournalContext = {
  entries: [],
  loading: false,
  createEntry: () => Promise.resolve(),
};

const journalContext = React.createContext(defaultValue);

export function JournalProvider(props: { children: ReactNode }) {
  const { children } = props;
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  const { firestore } = useFirebaseContext();

  // Get journal entries from firestore
  useEffect(() => {
    console.log('JournalProvider: useEffect', entries);
    setLoading(true);

    if (!firestore) {
      console.error('No firestore');
      return;
    }
    // const journalCollection = collection(firestore, 'journal');
    fetchEntries();
  }, [firestore]);

  const fetchEntries = async () => {
    console.log('fetching entries from firestore');
    if (!firestore) {
      console.error('No firestore');
      setLoading(false);
      return;
    }

    const path = 'users/1/journal';
    // const snapshot = collection(firestore, path);

    try {
      await fetch(path)
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
      setLoading(false);
    }
  };

  function createEntry(entry: string, title?: string): Promise<void> {
    console.log('saving entry', entry);
    if (!firestore) {
      console.error('No firestore');
      return Promise.reject('No firestore');
    }

    try {
      // const path = 'users/1/journal';
      // const doc = collection(firestore, path).doc();
      // const id = doc.id;
      // const data = {
      //   id,
      //   title,
      //   entry,
      // };
      // return doc.set(data);
      const journalCollection = collection(firestore, 'users/1/journal');
      const newEntry = {
        title: title ?? '',
        entry: entry,
      };
      console.log('newEntry', newEntry);
    } catch (error: any) {
      console.error(error);
    }

    // TODO add entry to firestore
    // return collection(firestore, path).add(newEntry);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('saved entry to api');
        resolve();
      }, 1000);
    });
  }

  return (
    <journalContext.Provider
      value={{
        entries,
        loading,
        createEntry,
      }}
    >
      {children}
    </journalContext.Provider>
  );
}

/**
 * Data hook for journal entries
 * @returns
 */
export default function useJournalEntries() {
  const navigate = useNavigate();
  const { entries, loading, createEntry } = React.useContext<JournalContext>(journalContext);
  const { firestore } = useFirebaseContext();

  return {
    entries,
    loading,
    createEntry,
  };
}
