import { Tab } from '@headlessui/react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Insights from '../screens/Insights';
import Journal from '../screens/Journal';

type TabProps = {
  to: string;
  tabTitle: string;
  children: React.ReactNode;
};

const defaultTabs: TabProps[] = [
  {
    to: '/home',
    tabTitle: 'Home',
    children: <Journal />,
  },
  {
    to: '/journal',
    tabTitle: 'Journal',
    children: <Journal />,
  },
  {
    to: '/insights',
    tabTitle: 'Insights',
    children: <Insights />,
  },
];

/**
 *
 * Highlight current Link using aria-current="page"
 *
 * @returns
 */
function TabBar(props: { tabs?: TabProps[] }) {
  const { tabs } = props ?? { tabs: defaultTabs };
  const appTabs = tabs ?? defaultTabs;

  return (
    <TabsContainer className="bg-indigo-400 flex w-full">
      <Tab.Group>
        <Tab.List>
          {appTabs.map((tab) => (
            <Tab key={tab.tabTitle}>
              <Link to={tab.to}>{tab.tabTitle}</Link>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {appTabs.map((tab) => (
            <Tab.Panel key={tab.tabTitle}>
              <Link to={tab.to}>{tab.children}</Link>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </TabsContainer>
  );
}

export default TabBar;

export const TabsContainer = styled.div`
  position: fixed;
  display: flex;
  justifycontent: center;
  alignitems: center;
  bottom: 0;
  right: 0;
  height: 9vh;
  width: 100vw;
  color: var(--color-white);
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  font-size: 1.2rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 1;

  > * {
    margin: 0;
    width: 100%;
  }
`;
