import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebaseContext } from '~/components/context/FirebaseContext';
import { collection, getDocs } from 'firebase/firestore/lite';

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
  createEntry: (title: string, entry: string) => Promise<void>;
  deleteEntry?: (id: string) => Promise<void>;
  updateEntry?: (id: string, title: string, entry: string) => Promise<void>;
};

const defaultValue: JournalContext = {
  entries: [],
  loading: false,
  refresh: () => {},
  createEntry: () => Promise.resolve(),
};
const journalContext = React.createContext<JournalContext>(defaultValue);

export function JournalProvider(props: { children: ReactNode }) {
  const { children } = props;
  // FIX: remove any
  const [entries, setEntries] = useState<JournalEntryProps | any | null>(null);
  const [loading, setLoading] = useState(false);

  const { firestore } = useFirebaseContext();

  function createEntry(entry: string, title?: string): Promise<void> {
    console.log('saving entry', entry);
    if (!firestore) {
      console.error('No firestore');
      return Promise.reject('No firestore');
    }

    try {
      // const journalCollection = collection(firestore, 'users/1/journal');
      const newEntry = {
        title: title ?? '',
        entry: entry,
      };
      console.log('creating newEntry', newEntry);
    } catch (error: any) {
      console.error(error);
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('saved entry to api');
        resolve();
      }, 1000);
    });
  }

  function refresh() {
    setLoading(true);
    // Get the journal entries
    if (!firestore) {
      console.error('No firestore');
      return;
    }
    const journalCollection = collection(firestore, 'users');
    console.log('journalCollection', journalCollection);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
  }, [entries]);
  return { entries, loading, createEntry, refresh };
}
