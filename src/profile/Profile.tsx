import { Firestore } from 'firebase/firestore';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useFirebase from '~/components/context/FirebaseContext';
import { useUserState } from '~/components/context/UserContext';

interface ProfileProps {
  name: string;
  email: string;
  photoURL: string;
  uid: string;
}

const defaultProfileProps = {
  name: '',
  email: '',
  photoURL: '',
  uid: '',
};

function Profile() {
  const { firestore } = useFirebase();
  // const user = firestore.doc('users/user1');
  const navigate = useNavigate();

  const userContext = useUserState();
  const user = userContext.state.state === 'SIGNED_IN' ? userContext.state.currentUser.displayName : 'Guest';

  if (user?.toLowerCase() === 'guest') {
    navigate('/auth');
  }

  return (
    <div className="flex flex-col gap-10 bg-emerald-400 min-h-16 h-full w-full">
      <Title>Profile</Title>
      <p>{user}</p>
      <ProfileContainer />
    </div>
  );
}

function ProfileContainer() {
  return (
    <>
      <ProfileHeader />
      <ProfileBody />
    </>
  );
}

function ProfileHeader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500">
        <span className="text-xs font-medium leading-none text-white">TK</span>
      </span>
    </div>
  );
}

function ProfileBody() {
  return (
    <div className="flex flex-col items-center justify-center">
      <FlatCards />
    </div>
  );
}

// TODO: <Item: React.PropsWithChildren<{}>>[]
const items = [
  { id: 1, title: 'Profile', icon: 'user', to: '/profile' },
  { id: 2, title: 'Settings', icon: 'user', to: '/settings' },
  { id: 3, title: 'logout', icon: 'user', to: '/logout' },
];

function FlatCards() {
  return (
    <div className="bg-white border border-gray-300 overflow-hidden rounded-md">
      <ul role="list" className="divide-y divide-gray-300">
        {items.map((item) => (
          <li key={item.id} className="px-6 py-4">
            {/* Your content */}
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
  height: 80;
`;

export default Profile;
