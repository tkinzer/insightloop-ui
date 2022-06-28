import React from 'react';
import { Link } from 'react-router-dom';

import Styles from './TabBar.module.css';

export default function TabBar() {
  const tabClasses = [Styles['tab-bar'], 'relative z-0 rounded-lg shadow flex divide-x divide-gray-200'].join(' ');

  return (
    <div className={Styles['tab-bar']}>
      <nav className={tabClasses} aria-label="Tabs">
        <Link
          to="/journal"
          className="text-gray-900 rounded-l-lg group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
          aria-current="page"
        >
          <span>Journal</span>
          <span aria-hidden="false" className="bg-indigo-500 absolute inset-x-0 bottom-0 h-0.5">
            <span className="bg-indigo-500 h-full" />
            Are we there yet?
          </span>
        </Link>

        <Link
          to="/insights"
          className="text-gray-500 hover:text-gray-700 group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
        >
          <span>Insights</span>
          <span aria-hidden="true" className="bg-transparent absolute inset-x-0 bottom-0 h-0.5">
            What does this button do?
          </span>
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
          <span aria-hidden="false" className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"></span>
        </Link>
      </nav>
    </div>
  );
}
