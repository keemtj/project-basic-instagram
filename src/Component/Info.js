import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const Info = () => {
  return (
    <StProfileWrapper>
      <Header />
      <Main />
      <Footer />
    </StProfileWrapper>
  );
};

const StProfileWrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export default Info;
