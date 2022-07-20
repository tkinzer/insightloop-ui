import styled from 'styled-components';
import StackedList from '~/components/domain/StackedList';

export default function JournalEntries(props: { entries: any[] }) {
  const { entries } = props;

  if (!entries) {
    return <div>Loading...</div>;
  }

  if (entries.length === 0) {
    return <div>No entries found</div>;
  }

  return (
    <section>
      <JournalContainer>{entries && entries.length > 0 && <StackedList items={entries} />}</JournalContainer>
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
