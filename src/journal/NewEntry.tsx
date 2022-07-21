import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useJournalEntries from './useJournalEntries';

export const NewEntry = () => {
  const { createEntry } = useJournalEntries();
  const navigate = useNavigate();
  const [entry, setEntry] = useState('');
  const [title, setTitle] = useState('');
  const entryRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('handleSubmit', entry, title);
    createEntry(title, entry)
      .then(() => {
        console.log('saved entry to api');
        setEntry('');
        setTitle('');
        navigate('/journal');
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  const handleEntryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    console.log('handleEntryChange', value);
    setEntry(value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    console.log('handleTitleChange', value);

    // TODO: debounce and clean up
    setTitle(value);
    // () => {
    //   setTimeout(() => {
    //     console.log('handleTitleChange', value);
    //     setTitle(value);
    //   }, 5000);
    // };
  };

  // TODO - add a button to save the entry and title as a draft

  return (
    <div className="form w-full flex flex-col h-full justify-center align-center gap-5">
      <h1 className="text-2xl">New Journal Entry</h1>
      <p className="text-xs">This is only a demo and is not currently saving to the database</p>
      <label htmlFor="title">Entry Title (optional)</label>
      <input type="text" id="title" ref={titleRef} onChange={handleTitleChange} />
      <label htmlFor="entry-text">Entry</label>
      <textarea id="entry-text" ref={entryRef} onChange={handleEntryChange} />
      <button
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleSubmit}
      >
        Save
      </button>
    </div>
  );
};
