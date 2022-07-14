import { useNavigate } from 'react-router-dom';
import useJournalEntries from './useJournalEntries';

export const NewEntry = () => {
  const { createEntry } = useJournalEntries();
  return (
    <div>
      <h1>New Journal Entry</h1>
      <p className="">This is only a demo and is not currently saving to the database</p>
      <div className="form">
        <label htmlFor="title">Entry Title (optional)</label>
        <input type="text" id="title" />
        <label htmlFor="entry-text">Entry</label>
        <textarea></textarea>
        <button onClick={createEntry}>Save</button>
      </div>
    </div>
  );
};
