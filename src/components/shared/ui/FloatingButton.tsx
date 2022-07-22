import { PlusIcon } from '@heroicons/react/outline';
import React from 'react';
import styled from 'styled-components';

const FloatingButton = (props: {
  children?: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  const { children, onClick } = props;
  return (
    <>
      <FloatingButtonEl onClick={onClick} className="bg-indigo-600">
        {children ? children : <PlusIcon className="text-white" />}
      </FloatingButtonEl>
    </>
  );
};

export default FloatingButton;

export const FloatingButtonEl = styled.button`
  position: fixed;
  display: flex;
  justifycontent: center;
  alignitems: center;
  bottom: 10vh;
  right: 1rem;
  height: 30px;
  width: 30px;
  color: var(--color-white);
  border: none;
  border-radius: 50%;
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
