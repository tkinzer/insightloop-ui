import styled from 'styled-components';
import StackedList from '~/components/layout/StackedList';

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
