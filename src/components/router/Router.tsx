// import { Dialog } from '@headlessui/react';
import React from 'react';
import { lazy, Suspense, useState } from 'react';
import { Outlet, RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import Insights from '~/insights/Insights';
import Journal from '~/journal/Journal';
import Stats from '~/stats/Stats';
import Splash from '../screens/Splash';
import TabBar from '../shared/navigation/TabBar';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));
const ProfileScreen = lazy(() => import('~/components/screens/Profile'));
const JournalScreen = lazy(() => import('~/components/screens/Journal'));
const InsightsScreen = lazy(() => import('~/components/screens/Insights'));
const StatsScreen = lazy(() => import('~/components/screens/Stats'));

function Layout() {
  return (
    <div>
      <nav className="p-4 flex items-center justify-between"></nav>
      <Outlet />
    </div>
  );
}

export const Router = () => {
  return (
    <BrowserRouter>
      <InnerRouter />
    </BrowserRouter>
  );
};

const InnerRouter = () => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <IndexScreen />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
        {
          path: '/journal',
          element: <JournalScreen />,
        },
        {
          path: '/insights',
          element: <InsightsScreen />,
        },
        {
          path: '/stats',
          element: <StatsScreen />,
        },
        {
          path: '/profile',
          element: <ProfileScreen />,
        },
      ],
    },
    {
      path: '/journal',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Journal />,
        },
      ],
    },
    {
      path: '/insights',
      element: <Layout />,
      children: [
        {
          element: <Insights />,
        },
      ],
    },
    {
      path: '/stats',
      element: <Layout />,
      children: [
        {
          element: <Stats />,
        },
      ],
    },
    {
      path: '/profile',
      element: <Layout />,
      children: [
        {
          element: <p>Profile</p>,
        },
      ],
    },
  ];
  const element = useRoutes(routes);
  return (
    <div>
      <Suspense fallback={<Loading />}>{element}</Suspense>
    </div>
  );
};
