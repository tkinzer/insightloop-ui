import React from 'react';
import styled from 'styled-components';
import JournalEntries from './JournalEntries';
import { JournalProvider } from './useJournalEntries';
import SearchBar from './../components/shared/search/SearchBar';
import firestore from './../firebase';

export default function Journal() {
  const [journals, setJournals] = React.useState([]);

  // TODO get journal entries from firestore collection

  return (
    <main>
      <JournalTitle>Daily Journal</JournalTitle>
      <JournalProvider journalEntries={[]}>
        <SearchBar />
        <JournalEntries />
        <FloatingButton onClick={() => console.log(`Add Journal Entry`)} />
      </JournalProvider>
    </main>
  );
}

const JournalTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
  padding: 0.5rem;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  font-size: 1.2rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 1;

  &:hover {
    background-color: var(--color-primary-dark);
  }

  &:active {
    background-color: var(--color-primary-dark);
  }

  @media (min-width: 768px) {
    bottom: 2rem;
    right: 2rem;
  }
`;
