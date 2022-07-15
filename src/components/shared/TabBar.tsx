import { Tab } from '@headlessui/react';

/**
 *
 * Highlight current Link using aria-current="page"
 *
 * @returns
 */
function TabBar(props: any) {
  return <MyTabs />;
}

type TabProps = {
  to: string;
  children: React.ReactNode;
};

function MyTabs() {
  return (
    <Tab.Group>
      <Tab.List>
        <Tab>Journal</Tab>
        <Tab>Insights</Tab>
        <Tab>Stats</Tab>
        <Tab>Profile</Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>Content 0</Tab.Panel>
        <Tab.Panel>Content 1</Tab.Panel>
        <Tab.Panel>Content 2</Tab.Panel>
        <Tab.Panel>Content 3</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default TabBar;
