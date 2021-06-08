import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Spinner3 } from '@styled-icons/icomoon/Spinner3';

const Loading = ({ isLoading }) => {
  return (
    <StLoading>
      <StSpinner isLoading={isLoading} />
    </StLoading>
  );
};

const StLoading = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StSpinner = styled(Spinner3)`
  width: 2.5rem;
  color: ${({ theme }) => theme.darkGray};
  animation: ${({ isLoading }) =>
    isLoading &&
    css`
      ${rotate} 2s linear infinite;
    `};
`;

export default Loading;
