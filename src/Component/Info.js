import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import MainRouter from '../Router/mainRouter';

const Info = () => {
  return (
    <StProfileWrapper>
      <Header />
      <MainRouter />
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
