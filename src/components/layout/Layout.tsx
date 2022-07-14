import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer';
import TabBar from '../shared/navigation/TabBar';
import TopNavBar from '../shared/navigation/TopNavBar';

export default function Layout() {
  return (
    <>
      <div>
        <TopNavBar />
        <main>
          <Outlet />
        </main>
        <Footer />
        <TabBar />
      </div>
    </>
  );
}
