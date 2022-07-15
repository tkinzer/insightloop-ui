import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Tab } from '@headlessui/react';

/**
 *
 * Highlight current Link using aria-current="page"
 *
 * @returns
 */
function TabBar() {
  return (
    <div className="">
      <MyTabs />
      <nav className="" aria-label="Tabs">
        <Link
          to="/journal"
          className="text-gray-900 rounded-l-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
        >
          <span>Journal</span>
        </Link>

        <Link
          to="/insights"
          className="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
        >
          <span>Insights</span>
        </Link>

        <Link
          to="/stats"
          className="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
        >
          <span>Stats</span>
          <span aria-hidden="true" className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
        </Link>

        <Link
          to="/profile"
          className="text-gray-500 hover:text-gray-700 rounded-r-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
        >
          <span>Profile</span>
        </Link>
      </nav>
    </div>
  );
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
