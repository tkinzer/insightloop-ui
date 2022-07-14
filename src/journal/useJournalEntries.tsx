import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  if (context === undefined) {
    throw new Error('useEntries must be used within a JournalProvider');
  }
  const entries = context.entries;

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
