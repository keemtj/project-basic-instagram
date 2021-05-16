import React from 'react';
import styled from 'styled-components';

const ProgressBar = ({ progress }) => {
  return <StProgressbar value={progress} max={100} />;
};

const StProgressbar = styled.progress`
  position: fixed;
  top: 5.5rem;
  left: 0;
  z-index: 2;

  border: none;
  width: 100%;
  height: 0.3rem;
  &::-webkit-progress-bar {
    background-color: ${({ theme }) => theme.background};
  }
  &::-webkit-progress-value {
    background-image: -webkit-linear-gradient(
      left,
      #f09433 0%,
      #e6683c 25%,
      #dc2743 50%,
      #cc2366 75%,
      #bc1888 100%
    );
  }
`;

export default ProgressBar;
