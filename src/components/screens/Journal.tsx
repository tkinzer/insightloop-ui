import Journal from '~/journal/Journal';
import { JournalProvider } from '~/journal/useJournalEntries';

/**
 * Routing page for the Journal entries
 * @returns {JSX.Element}
 */
function JournalPage() {
  const journalPageClasses = `flex flex-col items-center justify-center h-screen`;
  return (
    <JournalProvider>
      <div className={journalPageClasses}>
        <Journal />
      </div>
    </JournalProvider>
  );
}

export default JournalPage;
