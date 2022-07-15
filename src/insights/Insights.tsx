// import List from '@material-ui/core/List';
import React from 'react';
import styled from 'styled-components';
import SearchBar from '~/components/shared/search/SearchBar';
import { FloatingButton } from '~/journal/Journal';
import useInsights from './useInsights';

export default function Insights() {
  // const { entries } = useInsights();
  return (
    <main>
      <PageTitle>Insights</PageTitle>
      <SearchBar />
      <List items={[]} />
      <FloatingButton onClick={() => console.log(`Add Insights Entry`)} />
    </main>
  );
}

type ListProps = {
  items: any[];
};

function List(props: ListProps) {
  const { items } = props;
  return (
    <ListContainer>
      <List items={items} />
    </ListContainer>
  );
}

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  margin: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-primary);
`;

const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
`;

const InsightsProvider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
