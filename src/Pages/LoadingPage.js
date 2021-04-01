import React from 'react';
import styled from 'styled-components';
import { Instagram } from '@styled-icons/bootstrap/Instagram';

const LoadingPage = () => {
  return (
    <StLoadingPage>
      <StIcons />
    </StLoadingPage>
  );
};

const StLoadingPage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  background-color: #fafafa;
`;

const StIcons = styled(Instagram)`
  color: rgba(219, 219, 219, 1);
  width: 5rem;
  height: 5rem;
`;

export default LoadingPage;
