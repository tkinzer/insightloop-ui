import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useJournalEntries from './useJournalEntries';

export default function JournalEntries() {
  const journal = useJournalEntries();
  const { journalEntries } = journal;

  useEffect(() => {
    if (journalEntries && journalEntries.length > 0) {
      console.log(`Journal entries: ${journalEntries.length}`);
    }
  }, [journalEntries]);

  // TODO - add loading state

  return (
    <section>
      <JournalContainer>
        {journalEntries &&
          journalEntries.length > 0 &&
          journalEntries.map((entry, idx) => {
            return (
              <JournalEntry key={`entry${idx}-${entry.id}`}>
                {entry.title && (
                  <JournalEntryTitle>
                    <p>{entry.title}</p>
                    <p>{entry.date}</p>
                  </JournalEntryTitle>
                )}
                <JournalEntryBody>{entry.body}</JournalEntryBody>
              </JournalEntry>
            );
          })}
      </JournalContainer>
    </section>
  );
}

const JournalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
`;

const JournalEntry = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  border: 1px solid var(--color-primary);
  padding: 1rem;
  overflow: hidden;
  max-width: 100%;
`;

const JournalEntryTitle = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0.25rem 0;
  font-size: 1rem;
  text-align: left;
  color: var(--color-primary);
`;

const JournalEntryBody = styled.p`
  font-size: 0.75rem;
  text-align: center;
  margin: 0;
  padding: 0 0.5rem;
  margin-bottom: 1rem;
  border-left: 1px solid var(--color-primary);
  max-height: var(--sp-10);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
`;
