import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFirebaseContext } from '~/components/context/FirebaseContext';
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
  const { firestore, user } = useFirebaseContext();
  const navigate = useNavigate();
  const userName = user?.isAnonymous ? 'Anonymous' : user?.displayName;

  return (
    <div className="flex flex-col gap-10  h-full w-full">
      <ProfileHeader userName={userName ?? ''} />
      <ProfileBody />
    </div>
  );
}

function ProfileHeader(props: { userName: string; userPhotoUrl?: string; children?: React.ReactNode }): JSX.Element {
  const { userName, userPhotoUrl, children } = props;
  const roboHashUrl = 'https://robohash.org/' + userName;

  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-emerald-400">
      <img src={userPhotoUrl ?? roboHashUrl} alt="profile" className="w-30 h-30" />
      <span className="inline-flex items-center justify-center w-1/4 rounded-full bg-gray-500">
        <span className="text-lg font-medium leading-none text-white">{userName}</span>
      </span>
      {children}
    </div>
  );
}

function ProfileBody() {
  return (
    <div className="bg-white border border-gray-300 overflow-hidden rounded-md h-full">
      <ul role="list" className="divide-y divide-gray-300">
        {items.map((item) => (
          <li key={item.id} className="px-6 py-4">
            {/* Your content */}
            <Link to={item.to} className="flex gap-10">
              <Icon title={item.icon} />
              <span>{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// TODO: <Item: React.PropsWithChildren<{}>>[]
const items = [
  { id: 2, title: 'Settings', icon: 'user', to: '/settings' },
  { id: 3, title: 'logout', icon: 'user', to: '/logout' },
];

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
  height: 80;
`;

/**
 * Global Icon component
 * Generates an icon based on the title using the set of existing icons
 * TODO: Add a way to set the icon size
 * TODO: Move this to a separate file
 * @param props {title: string}
 * @returns
 */
function Icon(props: { title: string }) {
  return (
    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500">
      <span className="text-xs font-medium leading-none text-white">{props.title}</span>
    </span>
  );
}

export default Profile;
