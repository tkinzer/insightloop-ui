import { useNavigate } from 'react-router-dom';
import useJournalEntries from './useJournalEntries';

export const NewEntry = () => {
  const { createEntry } = useJournalEntries();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entry = formData.get('entry') ?? '';
    const title = formData.get('title') ?? '';
    createEntry(entry.toString(), title.toString()).then((res) => {
      console.log('created', res);
      navigate('/journal');
    });
  };

  // TODO - add a button to save the entry and title as a draft

  return (
    <div className="form w-full flex flex-col h-full justify-center align-center gap-5">
      <h1 className="text-2xl">New Journal Entry</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Entry Title (optional)</label>
        <input type="text" id="title" name="title" placeholder="want to call it something?" />
        <label htmlFor="entry-text">Entry</label>
        <textarea id="entry-text" name="entry" placeholder="Start journaling here" />
        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="submit"
        >
          Create Journal Entry
        </button>
      </form>
    </div>
  );
};
