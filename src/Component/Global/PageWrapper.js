import React from 'react';
import styled from 'styled-components';

const PageWrapper = ({ children }) => {
  return <StMainWrapper>{children}</StMainWrapper>;
};

const StMainWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export default PageWrapper;
