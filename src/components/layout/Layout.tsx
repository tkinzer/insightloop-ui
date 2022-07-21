import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

export default function Layout() {
  return (
    <div className="h-full">
      <MainContainer>
        <Outlet />
      </MainContainer>
      <TabsContainer>
        <TabBar>
          <Link to="/journal" className="w-full">
            Journal
          </Link>
          <Link to="/insights" className="w-full">
            Insights
          </Link>
          <Link to="/stats" className="w-full">
            Stats
          </Link>
          <Link to="/profile" className="w-full">
            Profile
          </Link>
        </TabBar>
      </TabsContainer>
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

const TabsContainer = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  right: 0;
  height: 9vh;
  background: white;
  width: 100vw;
  color: var(--color-white);
  border: none;
  border-top: 1px solid gray;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 1.2rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 1;

  @media (min-width: 768px) {
    bottom: 2rem;
    right: 2rem;
  }
`;

const TabBar = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 0.5rem;
  font-size: 1.2rem;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  z-index: 1;
`;
