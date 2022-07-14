import styled from 'styled-components';
import { useFirestore } from '~/lib/firebase';

export default function Profile() {
  const firestore = useFirestore();

  return (
    <div>
      <Title>Profile</Title>
      <h2>{firestore.app.name}</h2>
    </div>
  );
}

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 0;
  padding: 0;
`;
