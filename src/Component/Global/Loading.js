import React from 'react';
import styled, { css, keyframes } from 'styled-components';
// import { Spinner3 } from '@styled-icons/icomoon/Spinner3';
import { Spinner8 } from '@styled-icons/icomoon/Spinner8';

const Loading = ({ isLoading, isProfile, isSubmit, isHeartCount }) => {
  return (
    <StLoading
      isProfile={isProfile}
      isSubmit={isSubmit}
      isHeartCount={isHeartCount}
    >
      <StSpinner
        isLoading={isLoading}
        isProfile={isProfile}
        isSubmit={isSubmit}
      />
    </StLoading>
  );
};

const StLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ isProfile }) =>
    isProfile
      ? css`
          background: ${({ theme }) => theme.rgbWhite};
          width: 5.5rem;
          height: 5.5rem;
          border-radius: 50%;
          position: absolute;
          top: 0;
        `
      : css`
          width: 100%;
          height: 10rem;
        `}
  ${({ isSubmit }) =>
    isSubmit &&
    css`
      width: 100%;
      height: 2.2rem;
    `}
  ${({ isHeartCount }) =>
    isHeartCount &&
    css`
      width: 100%;
      height: 5.5rem;
    `}
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StSpinner = styled(Spinner8)`
  width: ${({ isProfile }) => (isProfile ? '2.5rem' : '2.5rem')};
  color: ${({ theme, isSubmit }) => (isSubmit ? theme.white : theme.darkGray)};
  animation: ${({ isLoading }) =>
    isLoading &&
    css`
      ${rotate} 1s linear infinite;
    `};
`;

export default Loading;
