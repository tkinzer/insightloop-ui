import React from 'react';
import styled from 'styled-components';
import JournalEntries from './JournalEntries';
import useJournalEntries from './useJournalEntries';
import SearchBar from './../components/shared/search/SearchBar';
import { PlusIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

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
      <FloatingButton className="bg-indigo-600" onClick={(e) => goToCreateJournal(e)}>
        <PlusIcon className="text-white" />
      </FloatingButton>
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
  display: flex;
  justifycontent: center;
  alignitems: center;
  bottom: 10vh;
  right: 1rem;
  height: 30px;
  width: 30px;
  color: var(--color-white);
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  font-size: 1.2rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 1;

  @media (min-width: 768px) {
    bottom: 2rem;
    right: 2rem;
  }
`;
