// import { Dialog } from '@headlessui/react';
import React from 'react';
import { lazy, Suspense, useState } from 'react';
import { RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import Insights from '~/insights/Insights';
import Journal from '~/journal/Journal';
import { NewEntry } from '~/journal/NewEntry';
import Stats from '~/stats/Stats';
import EmptyLayout from '../layout/EmptyLayout';
import Layout from '../layout/Layout';
import AboutScreen from '../screens/About';
import Splash from '../screens/Splash';
import TabBar from '../shared/navigation/TabBar';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));
const ProfileScreen = lazy(() => import('~/components/screens/Profile'));
const JournalScreen = lazy(() => import('~/components/screens/Journal'));
const InsightsScreen = lazy(() => import('~/components/screens/Insights'));
const StatsScreen = lazy(() => import('~/components/screens/Stats'));

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
      element: <EmptyLayout />,
      children: [
        {
          index: true,
          element: <Splash />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
        {
          path: 'welcome',
          element: <IndexScreen />,
        },
        {
          path: 'about',
          element: <AboutScreen />,
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
        {
          path: 'journal/new',
          element: <NewEntry />,
        },
      ],
    },
    {
      path: '/insights',
      element: <Layout />,
      children: [
        {
          element: <Insights />,
          index: true,
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
          element: <ProfileScreen />,
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
