import { lazy, Suspense } from 'react';
import { RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
import { NewEntry } from '~/journal/NewEntry';
import Layout from '../layout/Layout';
import AboutScreen from '../screens/About';
import Splash from '../screens/Splash';

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
      element: <Layout />,
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
          element: <JournalScreen />,
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
          element: <InsightsScreen />,
          index: true,
        },
      ],
    },
    {
      path: '/stats',
      element: <Layout />,
      children: [
        {
          element: <StatsScreen />,
          index: true,
        },
      ],
    },
    {
      path: '/profile',
      element: <Layout />,
      children: [
        {
          element: <ProfileScreen />,
          index: true,
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
