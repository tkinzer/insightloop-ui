import useJournalEntries from '~/journal/useJournalEntries';

/**
 * Routing page for the Journal entries
 * @returns {JSX.Element}
 */
function HomePage() {
  const pageClasses = `flex flex-col items-center justify-center h-screen`;
  // Get the current user from firebase and set it to the user variable
  // const user = useUser();
  // Get the current user's journal entries from firebase and set it to the journalEntries variable
  const { entries } = useJournalEntries();

  // Get the user from the store
  // const user = useSelector((state) => state.user);
  // const { name, email } = user;
  // const { robohash } = `https://robohash.org/${user.uid}`;

  return (
    <div className={pageClasses}>
      {/* <h1>Home, home on the range....</h1>
      <h1>{name}</h1>
      <h1>{email}</h1>
      <img src={robohash} alt="robohash" /> */}
      {entries.map((entry) => (
        <div key={entry.id}>
          <h1>{entry.title}</h1>
          <p>{entry.content}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
