import React, { useState } from 'react';
import styled from 'styled-components';

export default function Tabs(props: { tabItems: any }) {
  const { tabItems } = props;
  const [activeTab, setActiveTab] = useState(tabItems[0] ?? '');

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <TabsContainer>
      <TabList>
        {tabItems.map((tab: any) => (
          <Tab onClick={() => handleTabClick('week')}>Week</Tab>
        ))}
      </TabList>
    </TabsContainer>
  );
}

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const TabList = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style-type: none;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--color-primary);
`;

const Tab = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  &:active {
    background-color: var(--color-primary);
    color: var(--color-white);
  }
`;
