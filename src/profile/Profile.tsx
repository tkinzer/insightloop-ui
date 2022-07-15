import { Firestore } from 'firebase/firestore';
import React from 'react';
import styled from 'styled-components';
import useFirebase from '~/components/context/FirebaseContext';

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
  // const { firestore } = useFirebase();
  // const [profile, setProfile] = React.useState<ProfileProps>(defaultProfileProps);

  // React.useEffect(() => {
  //   console.debug('firestore', firestore);
  //   if (firestore) {
  //     firestore?.toJSON();
  //     // .collection('auth').doc(auth.uid).get().then(doc => {
  //     //   if (doc.exists) {
  //     //     setProfile(doc.data() as Profile);
  //     //   }
  //     // });
  //   }
  // }, [firestore]);

  return (
    <div className="flex gap-30 bg-emerald-400 min-h-16 h-full">
      <Title>Profile</Title>
      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500">
        <span className="text-xs font-medium leading-none text-white">TW</span>
      </span>
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
  background-color: purple;
`;

export default Profile;
