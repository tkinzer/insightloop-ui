import React from 'react';
import styled from 'styled-components';
import JournalEntries from './JournalEntries';
import useJournalEntries from './useJournalEntries';
import SearchBar from './../components/shared/search/SearchBar';
import { useNavigate } from 'react-router-dom';
import FloatingButton from '~/components/shared/ui/FloatingButton';

export default function Journal(): JSX.Element {
  const { entries } = useJournalEntries();
  const navigate = useNavigate();

  const goToCreateJournal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/journal/new');
  };

  return (
    <main>
      <JournalTitle>Daily Journal</JournalTitle>
      <SearchBar />
      <JournalEntries entries={entries} />
      <FloatingButton onClick={goToCreateJournal} />
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
