import { lazy, Suspense } from 'react';
import { RouteObject, useRoutes, BrowserRouter } from 'react-router-dom';
// TODO: use lazy() to lazy load components for nested routes
// TODO: use Suspense() to lazy load components for nested routes
// TODO: use Route Object to define nested routes from the top level parent route
import { NewEntry } from '~/journal/NewEntry';
import Layout from '../layout/Layout';
import PublicLayout from '../layout/PublicLayout';

const Loading = () => <p className="p-4 w-full h-full text-center">Loading...</p>;

const AboutScreen = lazy(() => import('~/components/screens/About'));
const SplashScreen = lazy(() => import('~/components/screens/Splash'));
const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));
const ProfileScreen = lazy(() => import('~/components/screens/Profile'));
const JournalScreen = lazy(() => import('~/components/screens/Journal'));
const InsightsScreen = lazy(() => import('~/components/screens/Insights'));
const StatsScreen = lazy(() => import('~/components/screens/Stats'));
const AuthScreen = lazy(() => import('~/components/screens/Auth'));
const BlogScreen = lazy(() => import('~/components/screens/Blog'));
const JobsScreen = lazy(() => import('~/components/screens/Jobs'));
const PressScreen = lazy(() => import('~/components/screens/Press'));
const ContactScreen = lazy(() => import('~/components/screens/Contact'));
const PartnersScreen = lazy(() => import('~/components/screens/Partners'));
const SupportScreen = lazy(() => import('~/components/screens/Support'));
const HomeScreen = lazy(() => import('~/components/screens/Home'));

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
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <SplashScreen />,
        },
        {
          path: '*',
          element: <Page404Screen />,
        },
        {
          path: 'auth',
          element: <AuthScreen />,
        },
        {
          path: 'about',
          element: <AboutScreen />,
        },
      ],
    },
    {
      path: '/public',
      element: <PublicLayout />,
      children: [
        {
          path: 'welcome',
          element: <IndexScreen />,
        },
        {
          index: true,
          path: 'blog',
          element: <BlogScreen />,
        },
        {
          path: 'jobs',
          element: <JobsScreen />,
        },
        {
          path: 'press',
          element: <PressScreen />,
        },
        {
          path: 'contact',
          element: <ContactScreen />,
        },
        {
          path: 'partners',
          element: <PartnersScreen />,
        },
        {
          path: 'support',
          element: <SupportScreen />,
        },
      ],
    },
    {
      path: '/home',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomeScreen />,
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
          path: '/journal/new',
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
