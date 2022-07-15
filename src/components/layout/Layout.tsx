import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../shared/Footer';
import TabBar from '../shared/navigation/TabBar';

export default function Layout() {
  return (
    <div className="h-full">
      <MainContainer>
        <Outlet />
      </MainContainer>
      <Footer />
      <TabBar />
    </div>
  );
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0;
  margin: 0;
  height: 90vh;
`;
