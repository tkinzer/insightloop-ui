import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useFirebaseContext } from '~/components/context/FirebaseContext';
import { addDoc, collection, getDocs, Unsubscribe } from 'firebase/firestore';

interface JournalEntryProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

type JournalContext = {
  entries: JournalEntryProps[];
  loading: boolean;
  refresh: () => void;
  createEntry: (title: string, entry: string) => void;
  deleteEntry?: (id: string) => Promise<void>;
  updateEntry?: (id: string, title: string, entry: string) => Promise<void>;
};

const defaultValue: JournalContext = {
  entries: [],
  loading: false,
  refresh: () => {},
  createEntry: () => {},
};
const journalContext = React.createContext<JournalContext>(defaultValue);

export function JournalProvider(props: { children: ReactNode }) {
  const { children } = props;
  // FIX: remove any
  const [entries, setEntries] = useState<JournalEntryProps | any | null>(null);
  const [loading, setLoading] = useState(false);
  // FIX: change default query to use uid and collection
  const [defaultQuery, setDefaultQuery] = useState<string>('users/PTvz4bNu9VuFeKE0DkYV/journal-entries');
  const { firestore } = useFirebaseContext();

  function createEntry(title: string, entry: string) {
    console.log('create entry pipe', title, entry);
    if (!firestore) {
      console.debug('firestore is not ready');
      return;
    }
    const newEntry = {
      title: title ?? '',
      entry: entry,
      content: entry,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLoading(true);
    addDoc(collection(firestore, defaultQuery), newEntry)
      .then((docRef) => {
        console.log('createEntry', docRef);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }

  function refresh() {
    setLoading(true);
    if (!firestore) {
      console.error('No firestore');
      return;
    }
    try {
      // FIX: add user.uid to path
      const journalCollection = collection(firestore, defaultQuery);
      getDocs(journalCollection).then((querySnapshot) => {
        console.log('querySnapshot', querySnapshot);
        const data = querySnapshot.docs.map((doc) => {
          console.log('doc', doc);
          return doc.data();
        });
        console.log('data', data);
        setEntries(data);
        setLoading(false);
      });
    } catch (error: any) {
      console.debug('error refreshing the journal', error);
      setLoading(false);
    }
  }

  const value: JournalContext = {
    entries,
    loading,
    createEntry,
    refresh,
  };

  return <journalContext.Provider value={value}>{children}</journalContext.Provider>;
}

/**
 * Data hook for journal entries
 * @returns
 */
export default function useJournalEntries(): JournalContext {
  const { entries, loading, createEntry, refresh } = React.useContext<JournalContext>(journalContext);

  // Update the entries when the user changes
  useEffect(() => {
    console.log('updating entries', entries);
    if (!entries) {
      refresh();
    }
  }, [entries]);

  return { entries, loading, createEntry, refresh };
}
