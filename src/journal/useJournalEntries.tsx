import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

type JournalContext = {
  journalEntries: any[];
  setJournalEntries: Dispatch<SetStateAction<never[]>>; // Dispatch<SetStateAction<never[]>>
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: any;
  setError: (error: any) => void;
  showResults: boolean;
  setShowResults: (showResults: boolean) => void;
  showError: boolean;
  setShowError: (showError: boolean) => void;
  showLoading: boolean;
  setShowLoading: (showLoading: boolean) => void;
  showNoResults: boolean;
  setShowNoResults: (showNoResults: boolean) => void;
};

const defaultValue: JournalContext = {
  journalEntries: [],
  setJournalEntries: () => {},
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
  showResults: false,
  setShowResults: () => {},
  showError: false,
  setShowError: () => {},
  showLoading: false,
  setShowLoading: () => {},
  showNoResults: false,
  setShowNoResults: () => {},
};

const journalContext = React.createContext(defaultValue);
// tslint:disable-next-line
const JournalProvider = (
  props: React.PropsWithChildren<{
    journalEntries?: any[];
  }>
) => {
  const { children } = props;
  const [journalEntries, setJournalEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [showNoLoading, setShowNoLoading] = useState(false);
  const [showNoSearch, setShowNoSearch] = useState(false);
  const [showNoSearchResults, setShowNoSearchResults] = useState(false);

  const loadUserJournal = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowResults(false);
    setShowError(false);
    setShowLoading(false);
    setShowNoResults(false);

    setShowNoLoading(false);
    setShowNoSearch(false);

    setShowNoSearchResults(false);
    setLoading(true);
    setError(null);
    // FIXME: Get the journal entries from the database in firebase and set them to the state.
    const journalEntriesUrl = 'https://insightloop-journal.firebaseio.com/journalEntries.json';
    fetch(journalEntriesUrl)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        setJournalEntries(data.items);
        setShowResults(true);
        setShowNoResults(false);
        setShowNoLoading(false);
        setShowNoSearch(false);
        setShowNoSearchResults(false);
        if (data.items.length === 0) {
          setShowNoResults(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        setShowError(true);
        setShowNoResults(false);
        setShowNoLoading(false);
        setShowNoSearch(false);
        setShowNoSearchResults(false);
        if (error.toString().includes('404')) {
          setShowNoResults(true);
        }
      });
  };

  // TODO: search for journal entries

  return (
    <journalContext.Provider
      value={{
        journalEntries,
        setJournalEntries,
        loading,
        setLoading,
        error,
        setError,
        showResults,
        setShowResults,
        showError,
        setShowError,
        showLoading,
        setShowLoading,
        showNoResults,
        setShowNoResults,
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
  const context = React.useContext<JournalContext>(journalContext);
  if (context === undefined) {
    throw new Error('useJournalEntries must be used within a JournalProvider');
  }
  return context;
}

export { JournalProvider, journalContext, useJournalEntries };
