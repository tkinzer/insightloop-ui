import { Tab } from '@headlessui/react';
import { Link } from 'react-router-dom';
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
function TabBar(props: { tabs: TabProps[] }) {
  const { tabs } = props ?? { tabs: defaultTabs };
  const appTabs = tabs ?? defaultTabs;

  return (
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
  );
}

export default TabBar;
