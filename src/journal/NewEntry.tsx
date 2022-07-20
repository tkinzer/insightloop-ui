import { useState, useRef } from 'react';
import useJournalEntries from './useJournalEntries';

export const NewEntry = () => {
  const { createEntry } = useJournalEntries();
  const [entry, setEntry] = useState('');
  const [title, setTitle] = useState('');
  const entryRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createEntry(title, entry);
    setEntry('');
    setTitle('');
  };

  const handleEntryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntry(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // TODO - add a button to save the entry and title as a draft

  return (
    <div>
      <h1>New Journal Entry</h1>
      <p className="">This is only a demo and is not currently saving to the database</p>
      <div className="form">
        <label htmlFor="title">Entry Title (optional)</label>
        <input type="text" id="title" ref={titleRef} />
        <label htmlFor="entry-text">Entry</label>
        <textarea id="entry-text" ref={entryRef} />
        <button onClick={(e) => handleSubmit}>Save</button>
      </div>
    </div>
  );
};
