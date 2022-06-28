import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Profile() {
  return (
    <div>
      <Title>Profile</Title>
      <h2>{'User info'}</h2>
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
