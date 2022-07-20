import React from 'react';
import statsImage from '../assets/images/stats.png';
import styled from 'styled-components';

/**
 * TODO:
 * - Add a way to set the FPS
 * - Use screenshot of figma tab to display for testing
 * @returns {JSX.Element}
 */
export default function Stats() {
  return (
    <ImageContainer>
      <img src={statsImage} alt="stats" className="w-full h-full" />
    </ImageContainer>
  );
}

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
`;
