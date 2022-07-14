import { Outlet } from 'react-router-dom';
import TopNavBar from '../shared/navigation/TopNavBar';

export default function EmptyLayout() {
  return (
    <>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
