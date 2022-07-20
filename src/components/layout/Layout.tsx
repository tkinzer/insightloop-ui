import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useUserState } from '../context/UserContext';
import TabBar from '../shared/TabBar';

export default function Layout() {
  const user = useUserState();
  return (
    <div className="h-full">
      <MainContainer>
        <Outlet />
      </MainContainer>
      <TabBar />
    </div>
  );
}

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0;
  margin: 0;
  min-height: 90vh;
  height: 100%;
`;
